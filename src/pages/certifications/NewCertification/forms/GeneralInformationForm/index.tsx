import { FormikProps, useFormik } from "formik";
import { object } from "yup";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { IOption } from "@inubekit/select";

import { useAppContext } from "@context/AppContext";
import { IEmploymentContract } from "@src/types/employeePortalBusiness.types";
import { formatDate } from "@src/utils/date";
import { validationMessages } from "@src/validations/validationMessages";
import { validationRules } from "@src/validations/validationRules";
import { generalInformationRequiredFields } from "./config/formConfig";

import { GeneralInformationFormUI } from "./interface";
import { IGeneralInformationEntry } from "./types";

const createValidationSchema = () =>
  object().shape({
    certification: validationRules.certification.required(
      validationMessages.required,
    ),
    addressee: validationRules.addressee.required(validationMessages.required),
    contract: validationRules.contract.required(validationMessages.required),
    observations: generalInformationRequiredFields.observations
      ? validationRules.observations.required(validationMessages.required)
      : validationRules.observations,
  });

const validationSchema = createValidationSchema();

interface GeneralInformationFormProps {
  initialValues: IGeneralInformationEntry;
  loading?: boolean;
  withNextButton?: boolean;
  handleNextStep: () => void;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IGeneralInformationEntry) => void;
}

const GeneralInformationForm = forwardRef<
  FormikProps<IGeneralInformationEntry>,
  GeneralInformationFormProps
>(
  (
    {
      initialValues,
      onFormValid,
      onSubmit,
      handleNextStep,
      loading,
      withNextButton = false,
    },
    ref,
  ) => {
    const { employees } = useAppContext();
    const [contractOptions, setContractOptions] = useState<IOption[]>([]);

    useEffect(() => {
      const options: IOption[] = employees[0].employmentContract.map(
        (contract: IEmploymentContract) => ({
          id: contract.contractId,
          label: `${contract.contractType} - ${formatDate(contract.startDate)}`,
          value: `${contract.contractType} - ${formatDate(contract.startDate)}`,
        }),
      );
      setContractOptions(options);

      if (options.length === 1) {
        formik.setFieldValue("contract", options[0].value);
      }
    }, [employees]);

    const formik = useFormik({
      initialValues,
      validationSchema,
      validateOnBlur: false,
      onSubmit: onSubmit ?? (() => true),
    });

    useImperativeHandle(ref, () => formik);

    useEffect(() => {
      if (onFormValid) {
        formik.validateForm().then((errors) => {
          const isFormValid = Object.keys(errors).length === 0;
          onFormValid(isFormValid);
        });
      }
    }, [formik.values, onFormValid]);

    return (
      <GeneralInformationFormUI
        loading={loading}
        formik={formik}
        withNextButton={withNextButton}
        validationSchema={validationSchema}
        handleNextStep={handleNextStep}
        contractOptions={contractOptions}
      />
    );
  },
);

export { GeneralInformationForm };
export type { GeneralInformationFormProps };
