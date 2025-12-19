import { FormikProps, useFormik } from "formik";
import { object, string } from "yup";
import { forwardRef, useEffect, useImperativeHandle, useMemo } from "react";
import { IOption } from "@inubekit/inubekit";

import { labels } from "@i18n/labels";
import { validationMessages } from "@validations/validationMessages";
import { validationRules } from "@validations/validationRules";
import { useAppContext } from "@context/AppContext/useAppContext";
import { useAbsenceReasons } from "@hooks/useAbsenceReasons";
import { useEnumeratorsIhurem } from "@hooks/useEnumeratorsIhurem";
import { EnumItem, AbsenceReasonRelation } from "@utils/absenceMotiveUtils";

import { IAbsenceMotiveEntry } from "./types";
import { absenceMotiveFormRequiredFields } from "./config/formConfig";
import { AbsenceMotiveFormUI } from "./interface";

const createValidationSchema = () =>
  object().shape({
    motive: absenceMotiveFormRequiredFields.motive
      ? string().required(validationMessages.required)
      : string(),
    subMotive: absenceMotiveFormRequiredFields.subMotive
      ? string().required(validationMessages.required)
      : string(),
    motiveDetails: absenceMotiveFormRequiredFields.observations
      ? validationRules.observations.required(validationMessages.required)
      : validationRules.observations,
  });

const validationSchema = createValidationSchema();

const getDescriptionForCode = (code: string, enums: EnumItem[]): string => {
  const found = enums.find((item) => item.code === code);
  return found?.description ?? code;
};

const transformAbsenceReasonsToOptions = (
  relations: AbsenceReasonRelation[],
  enums: EnumItem[],
): IOption[] => {
  return relations.map((relation, index) => ({
    id: String(index + 1),
    label: getDescriptionForCode(relation.absenceReason, enums),
    value: relation.absenceReason,
  }));
};

const getSubMotivesForMotive = (
  motiveValue: string,
  relations: AbsenceReasonRelation[],
  enums: EnumItem[],
): IOption[] => {
  const relation = relations.find((r) => r.absenceReason === motiveValue);

  if (!relation?.subReason) {
    return [];
  }

  return relation.subReason.map((subReasonCode, index) => ({
    id: String(index + 1),
    label: getDescriptionForCode(subReasonCode, enums),
    value: subReasonCode,
  }));
};

interface AbsenceMotiveFormProps {
  initialValues: IAbsenceMotiveEntry;
  loading?: boolean;
  withNextButton?: boolean;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IAbsenceMotiveEntry) => void;
}

const AbsenceMotiveForm = forwardRef<
  FormikProps<IAbsenceMotiveEntry>,
  AbsenceMotiveFormProps
>(
  (
    {
      initialValues,
      onFormValid,
      onSubmit,
      handleNextStep,
      handlePreviousStep,
      loading,
      withNextButton = false,
    },
    ref,
  ) => {
    const { contracts } = useAppContext();

    const formik = useFormik<IAbsenceMotiveEntry>({
      initialValues,
      validationSchema,
      validateOnBlur: false,
      onSubmit: onSubmit ?? (() => true),
    });

    useImperativeHandle(ref, () => formik);

    const { data: absenceRelations, isLoading: isLoadingAbsenceReasons } =
      useAbsenceReasons({
        regulatoryFramework:
          labels.absences.reportAbsence.motive.regulatoryFramework,
        company: labels.absences.reportAbsence.motive.companyName,
      });

    const { data: absenceReasonEnums, isLoading: isLoadingAbsenceReasonEnums } =
      useEnumeratorsIhurem("absencereason");

    const { data: subReasonEnums, isLoading: isLoadingSubReasonEnums } =
      useEnumeratorsIhurem("subreason");

    const motiveOptions = useMemo(() => {
      if (
        !absenceRelations ||
        !absenceReasonEnums ||
        isLoadingAbsenceReasons ||
        isLoadingAbsenceReasonEnums
      ) {
        return [];
      }
      return transformAbsenceReasonsToOptions(
        absenceRelations as AbsenceReasonRelation[],
        absenceReasonEnums as EnumItem[],
      );
    }, [
      absenceRelations,
      absenceReasonEnums,
      isLoadingAbsenceReasons,
      isLoadingAbsenceReasonEnums,
    ]);

    const subMotiveOptions = useMemo(() => {
      if (
        !formik.values.motive ||
        !absenceRelations ||
        !subReasonEnums ||
        isLoadingSubReasonEnums
      ) {
        return [];
      }
      return getSubMotivesForMotive(
        formik.values.motive,
        absenceRelations as AbsenceReasonRelation[],
        subReasonEnums as EnumItem[],
      );
    }, [
      formik.values.motive,
      absenceRelations,
      subReasonEnums,
      isLoadingSubReasonEnums,
    ]);

    useEffect(() => {
      if (contracts.length === 1 && !formik.values.contractId) {
        const contract = contracts[0];

        formik.setFieldValue("contractId", contract.contractId);
        formik.setFieldValue("businessName", contract.businessName);
        formik.setFieldValue("contractType", contract.contractType);
        formik.setFieldValue("contractNumber", contract.contractNumber);
      }
    }, [contracts, formik.values.contractId]);

    useEffect(() => {
      if (onFormValid) {
        formik.validateForm().then((errors) => {
          const isFormValid = Object.keys(errors).length === 0;
          onFormValid(isFormValid);
        });
      }
    }, [formik.values, onFormValid]);

    const isLoading =
      isLoadingAbsenceReasons ??
      isLoadingSubReasonEnums ??
      isLoadingAbsenceReasonEnums ??
      loading;

    return (
      <AbsenceMotiveFormUI
        loading={isLoading}
        formik={formik}
        withNextButton={withNextButton}
        validationSchema={validationSchema}
        motiveOptions={motiveOptions}
        subMotiveOptions={subMotiveOptions}
        handleNextStep={handleNextStep}
        handlePreviousStep={handlePreviousStep}
      />
    );
  },
);

AbsenceMotiveForm.displayName = "AbsenceMotiveForm";

export { AbsenceMotiveForm };
export type { AbsenceMotiveFormProps };
