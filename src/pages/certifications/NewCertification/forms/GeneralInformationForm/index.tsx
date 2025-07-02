import { FormikProps, useFormik } from "formik";
import { object } from "yup";
import { forwardRef, useEffect, useImperativeHandle } from "react";

import { validationMessages } from "@validations/validationMessages";
import { validationRules } from "@validations/validationRules";
import { generalInformationRequiredFields } from "./config/formConfig";

import { GeneralInformationFormUI } from "./interface";
import { IUnifiedHumanResourceRequestData } from "@ptypes/humanResourcesRequest.types";

const createValidationSchema = () =>
  object().shape({
    certificationType: validationRules.certification.required(
      validationMessages.required,
    ),
    addressee: validationRules.addressee.required(validationMessages.required),
    contractId: validationRules.contract.required(validationMessages.required),
    observationEmployee: generalInformationRequiredFields.observations
      ? validationRules.observations.required(validationMessages.required)
      : validationRules.observations,
  });

const validationSchema = createValidationSchema();

export interface GeneralInformationFormProps {
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
      handlePreviousStep,
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
        handlePreviousStep={handlePreviousStep}
        isFormValid={Object.keys(formik.errors).length === 0}
      />
    );
  },
);

GeneralInformationForm.displayName = "GeneralInformationForm";
export { GeneralInformationForm };
