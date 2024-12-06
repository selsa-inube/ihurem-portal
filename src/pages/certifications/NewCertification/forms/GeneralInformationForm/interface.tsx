import { FormikProps } from "formik";
import { useMediaQuery } from "@inubekit/hooks";
import { Stack } from "@inubekit/stack";
import { Button } from "@inubekit/button";
import { Select } from "@inubekit/select";
import { Input } from "@inubekit/input";
import { spacing } from "@design/tokens/spacing/spacing";
import { StyledContainer } from "./styles";
import { IGeneralInformationEntry } from "./types";

import {
  certificationOptions,
  contractOptions,
} from "@pages/certifications/NewCertification/config/assisted.config";

interface GeneralInformationFormUIProps {
  formik: FormikProps<IGeneralInformationEntry>;
  loading?: boolean;
  withNextButton?: boolean;
  handleNextStep: () => void;
  validationSchema?: any;
}

const GeneralInformationFormUI = (props: GeneralInformationFormUIProps) => {
  const { formik, loading, withNextButton, handleNextStep } = props;

  const isMobile = useMediaQuery("(max-width: 700px)");

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack direction="column" gap={spacing.s300}>
        <StyledContainer $isMobile={isMobile}>
          <Stack direction={isMobile ? "column" : "row"} gap={spacing.s300}>
            <Select
              name="certification"
              size="compact"
              label="Tipo de certificación"
              fullwidth={true}
              required
              options={certificationOptions}
              placeholder="Selecciona una opción"
              value={formik.values.certification}
              onChange={(name, value) => {
                formik.setFieldValue(name, value);
              }}
            />
            <Input
              size="compact"
              fullwidth={true}
              id="addressee"
              required
              label="Destinatario"
              name="addressee"
              placeholder="Ej: A quien interese"
              value={formik.values.addressee}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Stack>
          <Stack width={isMobile ? "100%" : "49%"}>
            <Select
              size="compact"
              fullwidth={true}
              name="contract"
              required
              label="Contrato"
              options={contractOptions}
              value={formik.values.contract}
              placeholder="Selecciona una opción"
              onChange={(name, value) => {
                formik.setFieldValue(name, value);
              }}
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
};

export { GeneralInformationFormUI };