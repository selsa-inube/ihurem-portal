import { FormikProps, useFormik } from "formik";
import { object, string } from "yup";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import * as Yup from "yup";

import { validationMessages } from "@validations/validationMessages";
import { validationRules } from "@validations/validationRules";

import { generalInformationRequiredFields } from "./config/formConfig";
import { GeneralInformationFormUI } from "./interface";
import { IUnifiedHumanResourceRequestData } from "@ptypes/humanResourcesRequest.types";

const createValidationSchema = () =>
  object().shape({
    daysOff: generalInformationRequiredFields.daysOff
      ? validationRules.daysOff.required(validationMessages.required)
      : validationRules.daysOff,
    startDateEnyoment: generalInformationRequiredFields.startDate
      ? Yup.string().required(validationMessages.required)
      : Yup.string(),
    contractId: generalInformationRequiredFields.contract
      ? string().required(validationMessages.required)
      : string(),
    observationEmployee: generalInformationRequiredFields.observations
      ? validationRules.observations.required(validationMessages.required)
      : validationRules.observations,
  });

const validationSchema = createValidationSchema();

interface GeneralInformationFormProps {
  initialValues: IUnifiedHumanResourceRequestData;
  loading?: boolean;
  withNextButton?: boolean;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IUnifiedHumanResourceRequestData) => void;
}

const GeneralInformationForm = forwardRef<
  FormikProps<IUnifiedHumanResourceRequestData>,
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
    const formik = useFormik<IUnifiedHumanResourceRequestData>({
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
      />
    );
  },
);

GeneralInformationForm.displayName = "GeneralInformationForm";

export { GeneralInformationForm };
export type { GeneralInformationFormProps };
