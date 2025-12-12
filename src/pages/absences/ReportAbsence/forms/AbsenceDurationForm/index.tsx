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
import { AbsenceDurationFormUI } from "./interface";
import { fullDayMotives } from "./config/formConfig";

const createValidationSchema = (
  restrictFutureDates: boolean,
  showDaysField: boolean,
  showHoursFields: boolean,
) =>
  object().shape({
    startDate: string().test(
      "startDate-validation",
      labels.absences.futureDateError.fieldValidation,
      (value) => {
        if (!value) return false;
        if (!restrictFutureDates) return true;
        const selected = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selected > today;
      },
    ),
    daysDuration: showDaysField
      ? string()
          .required(validationMessages.required)
          .test(
            "is-valid-number-days",
            labels.absences.reportAbsence.validation.positiveDays,
            (value) => {
              if (!value) return false;
              if (value === "-" || value === "+" || isNaN(Number(value))) {
                return false;
              }
              const numValue = Number(value);
              return numValue > 0;
            },
          )
      : string().test(
          "is-valid-number-days-optional",
          labels.absences.reportAbsence.validation.positiveDays,
          (value) => {
            if (!value) return true;
            if (value === "-" || value === "+" || isNaN(Number(value))) {
              return false;
            }
            const numValue = Number(value);
            return numValue >= 0;
          },
        ),
    hoursDuration: showHoursFields
      ? string()
          .required(validationMessages.required)
          .test(
            "is-valid-number-hours",
            labels.absences.reportAbsence.validation.positiveHours,
            (value) => {
              if (!value) return false;
              if (value === "-" || value === "+" || isNaN(Number(value))) {
                return false;
              }
              const numValue = Number(value);
              return numValue > 0;
            },
          )
      : string().test(
          "is-valid-number-hours-optional",
          labels.absences.reportAbsence.validation.positiveDays,
          (value) => {
            if (!value) return true;
            if (value === "-" || value === "+" || isNaN(Number(value))) {
              return false;
            }
            const numValue = Number(value);
            return numValue >= 0;
          },
        ),
    startTime: showHoursFields
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

    const isFullDayMotive = fullDayMotives.includes(motive);
    const showDaysField = isFullDayMotive;
    const showHoursFields = !isFullDayMotive;
    const restrictFutureDates = motive === "unpaid_leave";

    const validationSchema = useMemo(
      () =>
        createValidationSchema(
          restrictFutureDates,
          showDaysField,
          showHoursFields,
        ),
      [restrictFutureDates, showDaysField, showHoursFields],
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
      if (!value) {
        setShowDateErrorModal(false);
        if (
          formik.errors.startDate ===
          labels.absences.reportAbsence.unpaidLeave.short
        ) {
          formik.setFieldError("startDate", "");
        }
        return;
      }

      const selected = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (restrictFutureDates) {
        if (selected <= today) {
          formik.setFieldError(
            "startDate",
            labels.absences.reportAbsence.unpaidLeave.short,
          );
          setShowDateErrorModal(true);
        } else {
          if (
            formik.errors.startDate ===
            labels.absences.reportAbsence.unpaidLeave.short
          ) {
            formik.setFieldError("startDate", "");
          }
          setShowDateErrorModal(false);
        }
      } else {
        if (
          formik.errors.startDate ===
          labels.absences.reportAbsence.unpaidLeave.short
        ) {
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
          showDaysField={showDaysField}
          showHoursFields={showHoursFields}
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
