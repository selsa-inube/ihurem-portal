import {
  Stack,
  Button,
  Select,
  Textarea,
  Spinner,
  useMediaQuery,
} from "@inubekit/inubekit";
import { FormikProps } from "formik";
import * as Yup from "yup";
import { IOption } from "@inubekit/inubekit";

import { isRequired, getFieldState } from "@utils/forms/forms";
import { spacing } from "@design/tokens/spacing";

import { IAbsenceMotiveEntry } from "./types";
import { StyledContainer } from "./styles";

interface AbsenceMotiveFormUIProps {
  formik: FormikProps<IAbsenceMotiveEntry>;
  validationSchema: Yup.ObjectSchema<Yup.AnyObject>;
  loading?: boolean;
  withNextButton?: boolean;
  motiveOptions: IOption[];
  subMotiveOptions: IOption[];
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}

function AbsenceMotiveFormUI(props: AbsenceMotiveFormUIProps) {
  const {
    formik,
    validationSchema,
    loading,
    withNextButton,
    motiveOptions,
    subMotiveOptions,
    handleNextStep,
    handlePreviousStep,
  } = props;

  const isMobile = useMediaQuery("(max-width: 700px)");

  const handleChange = (name: string, value: string) => {
    formik.setFieldValue(name, value);

    if (name === "motive") {
      formik.setFieldValue("subMotive", "");
    }
  };

  const motiveHasOptions =
    Array.isArray(motiveOptions) && motiveOptions.length > 0;
  const subMotiveHasOptions =
    Array.isArray(subMotiveOptions) && subMotiveOptions.length > 0;

  const isSubMotiveDisabled =
    Boolean(loading) ||
    !motiveHasOptions ||
    !formik.values.motive ||
    !subMotiveHasOptions;

  if (loading) {
    return (
      <Stack alignItems="center" direction="column">
        <Spinner size="large" />
      </Stack>
    );
  }

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
            <Stack direction={isMobile ? "column" : "row"} gap={spacing.s200}>
              <Select
                label="Motivo"
                name="motive"
                options={motiveOptions}
                placeholder="Selecciona de la lista"
                value={formik.values.motive}
                message={formik.errors.motive}
                disabled={loading}
                size="compact"
                fullwidth
                onChange={(_, v) => handleChange("motive", v)}
              />
              <Select
                label="Submotivo"
                name="subMotive"
                options={subMotiveOptions}
                placeholder="Selecciona de la lista"
                value={formik.values.subMotive}
                message={formik.errors.subMotive}
                disabled={isSubMotiveDisabled}
                size="compact"
                fullwidth
                onChange={(_, v) => handleChange("subMotive", v)}
              />
            </Stack>

            <Textarea
              label="Detalles del motivo"
              placeholder="Más detalles acerca de la ausencia."
              name="motiveDetails"
              id="motiveDetails"
              value={formik.values.motiveDetails}
              maxLength={250}
              disabled={loading}
              status={getFieldState(formik, "motiveDetails")}
              message={formik.errors.motiveDetails}
              fullwidth
              required={isRequired(validationSchema, "motiveDetails")}
              onBlur={formik.handleBlur}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 250) {
                  formik.setFieldValue("motiveDetails", value);
                }
              }}
            />
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
              disabled={loading ?? !formik.isValid}
            >
              Siguiente
            </Button>
          </Stack>
        )}
      </Stack>
    </form>
  );
}

export { AbsenceMotiveFormUI };
