import { FormikProps, useFormik } from "formik";
import { object } from "yup";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { IOption } from "@inubekit/inubekit";

import { useAppContext } from "@context/AppContext";
import { IEmploymentContract } from "@src/types/employeePortalBusiness.types";

import { validationMessages } from "@src/validations/validationMessages";
import { validationRules } from "@src/validations/validationRules";
import { generalInformationRequiredFields } from "./config/formConfig";

import { GeneralInformationFormUI } from "./interface";
import { IGeneralInformationEntry } from "./types";
import { ContractActionTypes } from "@src/types/contract.types";

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
      onSubmit = () => {},
      handleNextStep,
      loading = false,
      withNextButton = false,
    },
    ref,
  ) => {
    const { employees } = useAppContext();
    const [contractOptions, setContractOptions] = useState<IOption[]>([]);

    useEffect(() => {
      if (!employees.employmentContract) return;
      const options: IOption[] = employees.employmentContract.map(
        (contract: IEmploymentContract) => {
          const contractTypeLabel =
            ContractActionTypes[
              contract.contractType as unknown as keyof typeof ContractActionTypes
            ] || contract.contractType;
          return {
            id: contract.contractNumber,
            label: `${contractTypeLabel} - ${contract.contractNumber}`,
            value: contract.contractNumber,
          };
        },
      );
      setContractOptions(options);
      if (options.length === 1) {
        formik.setFieldValue("contractDesc", options[0].label);
        formik.setFieldValue("contract", options[0].value);
      }
    }, [employees]);

    const formik = useFormik({
      initialValues,
      validationSchema,
      validateOnBlur: false,
      onSubmit,
    });

    useImperativeHandle(ref, () => formik);

    useEffect(() => {
      if (onFormValid) {
        formik.validateForm().then((errors) => {
          onFormValid(Object.keys(errors).length === 0);
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
