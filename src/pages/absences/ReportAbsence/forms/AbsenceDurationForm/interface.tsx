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
                • La duración de ausencia puede darse solo en días, solo en
                horas o incluir tanto días como horas. (Ej: 2 días, 3 horas)
              </Text>
            )}
            <Date
              label="Fecha de inicio"
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
                  label="Duración en días"
                  placeholder="Ej: 2"
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
                        Duración en horas
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
                      placeholder="Ej: 5"
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
                    label="Hora de inicio aproximada"
                    name="startTime"
                    options={startTimeSelectMock}
                    placeholder="Selecciona de la lista"
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
              Anterior
            </Button>
            <Button
              onClick={handleNextStep}
              disabled={loading ? true : !formik.isValid}
            >
              Siguiente
            </Button>
          </Stack>
        )}
      </Stack>

      {isInfoOpen && (
        <InfoDescModal
          title="Información"
          description="Si escribes una duración en horas se te solicitará una “Hora de inicio aproximada”."
          onCloseModal={() => setIsInfoOpen(false)}
        >
          <Stack direction="column" gap={spacing.s200}>
            <Text size="medium" appearance="gray">
              Puedes incluir decimales en la “Duración en horas”.
            </Text>
            <Stack direction="column">
              <Text size="medium" appearance="gray">
                Por ejemplo:
              </Text>
              <Text size="medium" appearance="gray">
                • 0.2 horas representan 12 minutos.
              </Text>
              <Text size="medium" appearance="gray">
                • 1.5 horas representa 1 hora y 30 minutos.
              </Text>
            </Stack>
          </Stack>
        </InfoDescModal>
      )}
    </form>
  );
}

export { AbsenceDurationFormUI };
