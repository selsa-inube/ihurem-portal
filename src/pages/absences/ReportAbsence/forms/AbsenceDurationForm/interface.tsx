import { useState } from "react";
import {
  Stack,
  Button,
  useMediaQuery,
  Date,
  Textfield,
  Select,
  Text,
  Grid,
  Icon,
} from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { MdOutlineInfo } from "react-icons/md";

import { labels } from "@i18n/labels";
import { getFieldState } from "@utils/forms/forms";
import { spacing } from "@design/tokens/spacing";
import { InfoDescModal } from "@components/modals/InfoDescModal";

import { startTimeSelectMock } from "./config/formConfig";
import { IAbsenceDurationEntry } from "./types";
import { StyledContainer } from "./styles";

interface AbsenceDurationFormUIProps {
  formik: FormikProps<IAbsenceDurationEntry>;
  loading?: boolean;
  withNextButton?: boolean;
  showDaysField: boolean;
  showHoursFields: boolean;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}

function AbsenceDurationFormUI(props: AbsenceDurationFormUIProps) {
  const {
    formik,
    loading,
    withNextButton,
    showDaysField,
    showHoursFields,
    handleNextStep,
    handlePreviousStep,
  } = props;
  const isMobile = useMediaQuery("(max-width: 700px)");
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const handleChange = (name: string, value: string) => {
    if ((name === "daysDuration" || name === "hoursDuration") && value) {
      const numValue = Number(value);
      if (numValue < 0) {
        return;
      }
    }
    formik.setFieldValue(name, value);
  };

  const hasHoursDuration =
    showHoursFields &&
    formik.values.hoursDuration &&
    Number(formik.values.hoursDuration) > 0;

  return (
    <form>
      <Stack
        direction="column"
        gap={isMobile ? spacing.s300 : spacing.s400}
        justifyContent="space-between"
        height={isMobile ? "auto" : "55vh"}
      >
        <StyledContainer $isMobile={isMobile}>
          <Stack direction="column" width="100%" gap={spacing.s200}>
            {!showDaysField && (
              <Text>
                {labels.absences.reportAbsence.ui.durationForm.motiveInfoText}
              </Text>
            )}
            <Date
              label={
                labels.absences.reportAbsence.ui.durationForm.labels.startDate
              }
              name="startDate"
              id="startDate"
              value={formik.values.startDate}
              disabled={loading}
              status={getFieldState(formik, "startDate")}
              message={formik.errors.startDate}
              size="compact"
              fullwidth
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <Grid
              templateColumns={`repeat(${isMobile ? 1 : showDaysField && showHoursFields ? 2 : 1}, 1fr)`}
              autoRows="auto"
              gap={spacing.s200}
              width="100%"
            >
              {showDaysField && (
                <Textfield
                  label={
                    labels.absences.reportAbsence.ui.durationForm.labels
                      .daysDuration
                  }
                  placeholder={
                    labels.absences.reportAbsence.ui.durationForm.placeholders
                      .days
                  }
                  name="daysDuration"
                  id="daysDuration"
                  type="number"
                  value={formik.values.daysDuration}
                  status={getFieldState(formik, "daysDuration")}
                  message={formik.errors.daysDuration}
                  disabled={loading}
                  size="compact"
                  fullwidth
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              )}
              {showHoursFields && (
                <>
                  <Stack direction="column" gap={spacing.s050}>
                    <Stack gap={spacing.s050} alignItems="center">
                      <Text
                        type="label"
                        weight="bold"
                        size="medium"
                        padding={`${spacing.s0}  ${spacing.s0} ${spacing.s0} ${spacing.s200}`}
                      >
                        {
                          labels.absences.reportAbsence.ui.durationForm.labels
                            .hoursDuration
                        }
                      </Text>
                      <Icon
                        appearance="primary"
                        icon={<MdOutlineInfo />}
                        size="12px"
                        cursorHover
                        onClick={() => setIsInfoOpen(true)}
                      />
                    </Stack>
                    <Textfield
                      placeholder={
                        labels.absences.reportAbsence.ui.durationForm
                          .placeholders.hours
                      }
                      name="hoursDuration"
                      id="hoursDuration"
                      type="number"
                      value={formik.values.hoursDuration}
                      status={getFieldState(formik, "hoursDuration")}
                      message={formik.errors.hoursDuration}
                      disabled={loading}
                      size="compact"
                      fullwidth
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                  </Stack>
                  <Select
                    label={
                      labels.absences.reportAbsence.ui.durationForm.labels
                        .startTime
                    }
                    name="startTime"
                    options={startTimeSelectMock}
                    placeholder={
                      labels.absences.reportAbsence.ui.durationForm.placeholders
                        .startTime
                    }
                    value={formik.values.startTime}
                    message={formik.errors.startTime}
                    disabled={!hasHoursDuration || loading}
                    size="compact"
                    fullwidth
                    onChange={(_, v) => handleChange("startTime", v)}
                  />
                </>
              )}
            </Grid>
          </Stack>
        </StyledContainer>
        {withNextButton && (
          <Stack justifyContent="flex-end" gap={spacing.s250}>
            <Button
              onClick={handlePreviousStep}
              variant="outlined"
              appearance="gray"
            >
              {labels.absences.reportAbsence.ui.durationForm.buttons.previous}
            </Button>
            <Button
              onClick={handleNextStep}
              disabled={loading ? true : !formik.isValid}
            >
              {labels.absences.reportAbsence.ui.durationForm.buttons.next}
            </Button>
          </Stack>
        )}
      </Stack>

      {isInfoOpen && (
        <InfoDescModal
          title={labels.absences.reportAbsence.ui.durationForm.infoModal.title}
          description={
            labels.absences.reportAbsence.ui.durationForm.infoModal.description
          }
          onCloseModal={() => setIsInfoOpen(false)}
        >
          <Stack direction="column" gap={spacing.s200}>
            <Text size="medium" appearance="gray">
              {
                labels.absences.reportAbsence.ui.durationForm.infoModal
                  .decimalsAdvice
              }
            </Text>
            <Stack direction="column">
              <Text size="medium" appearance="gray">
                {
                  labels.absences.reportAbsence.ui.durationForm.infoModal
                    .examplesTitle
                }
              </Text>
              <Text size="medium" appearance="gray">
                {
                  labels.absences.reportAbsence.ui.durationForm.infoModal
                    .example1
                }
              </Text>
              <Text size="medium" appearance="gray">
                {
                  labels.absences.reportAbsence.ui.durationForm.infoModal
                    .example2
                }
              </Text>
            </Stack>
          </Stack>
        </InfoDescModal>
      )}
    </form>
  );
}

export { AbsenceDurationFormUI };
