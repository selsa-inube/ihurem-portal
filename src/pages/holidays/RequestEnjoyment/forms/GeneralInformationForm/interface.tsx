import { FormikProps } from "formik";
import * as Yup from "yup";
import {
  Date,
  Stack,
  Button,
  Textarea,
  Textfield,
  useMediaQuery,
} from "@inubekit/inubekit";

import { isRequired } from "@utils/forms/forms";
import { spacing } from "@design/tokens/spacing/spacing";
import { getFieldState } from "@utils/forms/forms";

import { IGeneralInformationEntry } from "./types";
import { StyledContainer } from "./styles";

interface GeneralInformationFormUIProps {
  formik: FormikProps<IGeneralInformationEntry>;
  validationSchema: Yup.ObjectSchema<Yup.AnyObject>;
  loading?: boolean;
  withNextButton?: boolean;
  handleNextStep: () => void;
}

function GeneralInformationFormUI(props: GeneralInformationFormUIProps) {
  const { formik, loading, withNextButton, validationSchema, handleNextStep } =
    props;

  const isMobile = useMediaQuery("(max-width: 700px)");

  return (
    <form>
      <Stack direction="column" gap={isMobile ? spacing.s300 : spacing.s400}>
        <StyledContainer $isMobile={isMobile}>
          <Stack direction="column" width="100%" gap={spacing.s250}>
            <Stack direction={isMobile ? "column" : "row"} gap={spacing.s250}>
              <Textfield
                label="Días de disfrute"
                placeholder="Ej: 2"
                name="daysOff"
                id="daysOff"
                type="number"
                value={formik.values.daysOff}
                status={getFieldState(formik, "daysOff")}
                message={formik.errors.daysOff}
                disabled={loading}
                size="compact"
                fullwidth
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required={isRequired(validationSchema, "daysOff")}
              />

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
                required={isRequired(validationSchema, "startDate")}
              />
            </Stack>

            <Textarea
              label="Observaciones"
              placeholder="Detalles a tener en cuenta."
              name="observations"
              id="observations"
              value={formik.values.observations}
              maxLength={120}
              disabled={loading}
              status={getFieldState(formik, "observations")}
              message={formik.errors.observations}
              fullwidth
              required={isRequired(validationSchema, "observations")}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
          </Stack>
        </StyledContainer>

        {withNextButton && (
          <Stack justifyContent="flex-end">
            <Button
              fullwidth={isMobile}
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

export { GeneralInformationFormUI };
