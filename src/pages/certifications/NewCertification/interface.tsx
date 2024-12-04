import { useMediaQuery } from "@inubekit/hooks";
import { Text } from "@inubekit/text";
import { Stack } from "@inubekit/stack";
import { Button } from "@inubekit/button";
import { Select } from "@inubekit/select";
import { Input } from "@inubekit/input";
import { Assisted, IAssistedStep } from "@inubekit/assisted";
import { useFormik } from "formik";
import * as Yup from "yup";

import { AppMenu } from "@components/layout/AppMenu";
import { IRoute } from "@components/layout/AppMenu/types";
import { spacing } from "@design/tokens/spacing/spacing";
import {
  certificationOptions,
  contractOptions,
} from "./config/assisted.config";

import { StyledCertificationsContainer } from "../styles";

interface NewCertificationUIProps {
  appName: string;
  appRoute: IRoute[];
  navigatePage: string;
  steps: IAssistedStep[];
  currentStep: number;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  handleFinishAssisted: () => void;
  appDescription?: string;
}

function NewCertificationUI(props: NewCertificationUIProps) {
  const {
    appName,
    appRoute,
    navigatePage,
    steps,
    currentStep,
    handleNextStep,
    handlePreviousStep,
    handleFinishAssisted,
    appDescription,
  } = props;

  const isTablet = useMediaQuery("(max-width: 1100px)");
  const isMobile = useMediaQuery("(max-width: 768px)");

  const validationSchema = Yup.object({
    certification: Yup.string().required("Este campo es obligatorio"),
    addressee: Yup.string()
      .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/, "Solo se permiten letras")
      .min(3, "Debe tener al menos 3 caracteres")
      .required("Este campo es obligatorio"),
    contract: Yup.string().required("Este campo es obligatorio"),
  });

  const formik = useFormik({
    initialValues: {
      certification: "",
      addressee: "",
      contract: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Formulario enviado:", values);
    },
  });

  return (
    <AppMenu
      appName={appName}
      appDescription={appDescription}
      appRoute={appRoute}
      navigatePage={navigatePage}
    >
      <Stack direction="column" gap={spacing.s500}>
        <Assisted
          step={steps[currentStep - 1]}
          totalSteps={steps.length}
          onNextClick={handleNextStep}
          onBackClick={handlePreviousStep}
          onSubmitClick={handleFinishAssisted}
          disableNext={false}
          size={isTablet ? "small" : "large"}
          controls={{
            goBackText: "Anterior",
            goNextText: "Siguiente",
            submitText: "Enviar",
          }}
        />
        <Stack direction="column" gap={spacing.s500}>
          {currentStep === 1 && (
            <StyledCertificationsContainer $isMobile={isMobile}>
              <form onSubmit={formik.handleSubmit}>
                <Stack direction="column" gap={spacing.s300}>
                  <Stack
                    direction={isMobile ? "column" : "row"}
                    gap={spacing.s300}
                  >
                    <Select
                      name="certification"
                      size="compact"
                      label="Tipo de certificación"
                      fullwidth={true}
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
                      label="Contrato"
                      options={contractOptions}
                      value={formik.values.contract}
                      placeholder="Selecciona una opción"
                      onChange={(name, value) => {
                        formik.setFieldValue(name, value);
                      }}
                    />
                  </Stack>
                </Stack>
              </form>
            </StyledCertificationsContainer>
          )}

          {currentStep === 1 && (
            <Stack justifyContent="end">
              <Button
                children="Siguiente"
                appearance={formik.isValid && formik.dirty ? "primary" : "gray"}
                path="/privilege"
                type="button"
                spacing="wide"
                fullwidth={false}
                onClick={handleNextStep}
                cursorHover={formik.isValid && formik.dirty}
                disabled={!formik.isValid || !formik.dirty}
              />
            </Stack>
          )}
        </Stack>

        {currentStep === 2 && <></>}
        {currentStep === 3 && (
          <StyledCertificationsContainer $isMobile={isMobile}>
            <form onSubmit={formik.handleSubmit}>
              <Stack direction="column" gap={spacing.s300}>
                <Stack
                  direction={isMobile ? "column" : "row"}
                  gap={spacing.s300}
                >
                  <Text></Text>
                </Stack>
              </Stack>
            </form>
          </StyledCertificationsContainer>
        )}
      </Stack>
    </AppMenu>
  );
}

export { NewCertificationUI };
