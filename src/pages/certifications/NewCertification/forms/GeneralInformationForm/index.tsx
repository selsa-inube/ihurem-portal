import { FormikProps, useFormik } from "formik";
import { object } from "yup";
import { forwardRef, useEffect, useImperativeHandle } from "react";

import { validationMessages } from "@src/validations/validationMessages";
import { validationRules } from "@src/validations/validationRules";

import { GeneralInformationFormUI } from "./interface";
import { IGeneralInformationEntry } from "./types";

const createValidationSchema = () =>
  object().shape({
    certification: validationRules.certification.required(
      validationMessages.required,
    ),
    addressee: validationRules.addressee.required(validationMessages.required),
    contract: validationRules.contract.required(validationMessages.required),
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
      />
    );
  },
);

export { GeneralInformationForm };
export type { GeneralInformationFormProps };