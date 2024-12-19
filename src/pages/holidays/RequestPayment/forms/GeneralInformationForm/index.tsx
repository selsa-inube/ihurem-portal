import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { FormikProps, useFormik } from "formik";
import { object, string } from "yup";
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
    daysToPay: generalInformationRequiredFields.daysToPay
      ? validationRules.daysOff.required(validationMessages.required)
      : validationRules.daysOff,
    contract: generalInformationRequiredFields.contract
      ? string().required(validationMessages.required)
      : string(),
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
