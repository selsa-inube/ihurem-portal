import { FormikProps, useFormik } from "formik";
import { object, string } from "yup";
import { forwardRef, useEffect, useImperativeHandle } from "react";

import { validationMessages } from "@validations/validationMessages";
import { validationRules } from "@validations/validationRules";
import { useAppContext } from "@context/AppContext/useAppContext";

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
    const { employees } = useAppContext();

    const formik = useFormik<IAbsenceMotiveEntry>({
      initialValues,
      validationSchema,
      validateOnBlur: false,
      onSubmit: onSubmit ?? (() => true),
    });

    useImperativeHandle(ref, () => formik);

    useEffect(() => {
      const contracts = employees.employmentContracts ?? [];

      if (contracts.length === 1 && !formik.values.contractId) {
        const contract = contracts[0];

        formik.setFieldValue("contractId", contract.contractId);
        formik.setFieldValue("businessName", contract.businessName);
        formik.setFieldValue("contractType", contract.contractType);
        formik.setFieldValue("contractNumber", contract.contractNumber);
      }
    }, [employees.employmentContracts, formik.values.contractId]);

    useEffect(() => {
      if (onFormValid) {
        formik.validateForm().then((errors) => {
          const isFormValid = Object.keys(errors).length === 0;
          onFormValid(isFormValid);
        });
      }
    }, [formik.values, onFormValid]);

    return (
      <AbsenceMotiveFormUI
        loading={loading}
        formik={formik}
        withNextButton={withNextButton}
        validationSchema={validationSchema}
        handleNextStep={handleNextStep}
        handlePreviousStep={handlePreviousStep}
      />
    );
  },
);

AbsenceMotiveForm.displayName = "AbsenceMotiveForm";

export { AbsenceMotiveForm };
export type { AbsenceMotiveFormProps };
