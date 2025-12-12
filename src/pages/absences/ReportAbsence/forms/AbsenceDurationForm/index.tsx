import { FormikProps, useFormik } from "formik";
import { object, string } from "yup";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  useMemo,
} from "react";

import { labels } from "@i18n/labels";
import { validationMessages } from "@validations/validationMessages";
import { ErrorModal } from "@components/modals/ErrorModal";

import { IAbsenceDurationEntry } from "./types";
import { absenceDurationFormRequiredFields } from "./config/formConfig";
import { AbsenceDurationFormUI } from "./interface";

const createValidationSchema = (restrictFutureDates: boolean) =>
  object().shape({
    startDate: absenceDurationFormRequiredFields.startDate
      ? string()
          .required(validationMessages.required)
          .test(
            "is-after-today",
            labels.absences.futureDateError.fieldValidation,
            (value) => {
              if (!value) return false;
              if (!restrictFutureDates) return true;

              const selected = new Date(value);
              const today = new Date();
              today.setHours(0, 0, 0, 0);

              return selected > today;
            },
          )
      : string(),

    daysDuration: absenceDurationFormRequiredFields.daysDuration
      ? string()
          .required(validationMessages.required)
          .test(
            "is-valid-number",
            labels.absences.reportAbsence.validation.positiveDays,
            (value) => {
              if (!value) return false;
              if (["-", "+"].includes(value) || isNaN(Number(value)))
                return false;
              return Number(value) >= 0;
            },
          )
      : string().test(
          "is-valid-number",
          labels.absences.reportAbsence.validation.positiveDays,
          (value) => {
            if (!value) return true;
            if (["-", "+"].includes(value) || isNaN(Number(value)))
              return false;
            return Number(value) >= 0;
          },
        ),

    hoursDuration: absenceDurationFormRequiredFields.hoursDuration
      ? string()
          .required(validationMessages.required)
          .test(
            "is-valid-number",
            labels.absences.reportAbsence.validation.positiveHours,
            (value) => {
              if (!value) return false;
              if (["-", "+"].includes(value) || isNaN(Number(value)))
                return false;
              return Number(value) >= 0;
            },
          )
      : string().test(
          "is-valid-number",
          labels.absences.reportAbsence.validation.positiveHours,
          (value) => {
            if (!value) return true;
            if (["-", "+"].includes(value) || isNaN(Number(value)))
              return false;
            return Number(value) >= 0;
          },
        ),

    startTime: absenceDurationFormRequiredFields.hoursDuration
      ? string().required(validationMessages.required)
      : string(),
  });

interface AbsenceDurationFormProps {
  initialValues: IAbsenceDurationEntry;
  loading?: boolean;
  withNextButton?: boolean;
  motive: string;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IAbsenceDurationEntry) => void;
}

const AbsenceDurationForm = forwardRef<
  FormikProps<IAbsenceDurationEntry>,
  AbsenceDurationFormProps
>(
  (
    {
      initialValues,
      loading,
      withNextButton = false,
      motive,
      onFormValid,
      onSubmit,
      handleNextStep,
      handlePreviousStep,
    },
    ref,
  ) => {
    const [showDateErrorModal, setShowDateErrorModal] = useState(false);

    const shouldShowMotiveText = motive !== "unpaid_leave";
    const restrictFutureDates = motive === "unpaid_leave";

    const validationSchema = useMemo(
      () => createValidationSchema(restrictFutureDates),
      [restrictFutureDates],
    );

    const formik = useFormik<IAbsenceDurationEntry>({
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

    useEffect(() => {
      const value = formik.values.startDate;

      const futureDateMessage = labels.absences.futureDateError.fieldValidation;

      if (!value) {
        setShowDateErrorModal(false);

        if (formik.errors.startDate === futureDateMessage) {
          formik.setFieldError("startDate", "");
        }
        return;
      }

      const selected = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (restrictFutureDates) {
        if (selected <= today) {
          formik.setFieldError("startDate", futureDateMessage);
          setShowDateErrorModal(true);
        } else {
          if (formik.errors.startDate === futureDateMessage) {
            formik.setFieldError("startDate", "");
          }
          setShowDateErrorModal(false);
        }
      } else {
        if (formik.errors.startDate === futureDateMessage) {
          formik.setFieldError("startDate", "");
        }
        setShowDateErrorModal(false);
      }
    }, [formik.values.startDate, restrictFutureDates]);

    return (
      <>
        <AbsenceDurationFormUI
          loading={loading}
          formik={formik}
          withNextButton={withNextButton}
          shouldShowMotiveText={shouldShowMotiveText}
          handleNextStep={handleNextStep}
          handlePreviousStep={handlePreviousStep}
        />

        {showDateErrorModal && (
          <ErrorModal
            title={labels.absences.futureDateError.title}
            descriptionText={labels.absences.futureDateError.description}
            solutionText={labels.absences.futureDateError.solution}
            onCloseModal={() => setShowDateErrorModal(false)}
            onSubmitButtonClick={() => setShowDateErrorModal(false)}
          />
        )}
      </>
    );
  },
);

AbsenceDurationForm.displayName = "AbsenceDurationForm";

export { AbsenceDurationForm };
export type { AbsenceDurationFormProps };
