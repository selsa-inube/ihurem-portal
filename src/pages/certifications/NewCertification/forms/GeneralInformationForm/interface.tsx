import { FormikProps } from "formik";
import { useMediaQuery } from "@inubekit/hooks";
import { Stack } from "@inubekit/stack";
import { Button } from "@inubekit/button";
import { Select } from "@inubekit/select";
import { Textarea } from "@inubekit/textarea";
import { Input } from "@inubekit/input";

import { isRequired } from "@utils/forms/forms";
import { getFieldState } from "@utils/forms/forms";
import { spacing } from "@design/tokens/spacing/spacing";
import { certificationOptions } from "@pages/certifications/NewCertification/config/assisted.config";

import { StyledContainer } from "./styles";
import { IGeneralInformationEntry } from "./types";
import { useAppContext } from "@src/context/AppContext";

interface GeneralInformationFormUIProps {
  formik: FormikProps<IGeneralInformationEntry>;
  loading?: boolean;
  withNextButton?: boolean;
  handleNextStep: () => void;
  validationSchema?: any;
}

const GeneralInformationFormUI = (props: GeneralInformationFormUIProps) => {
  const { formik, loading, withNextButton, validationSchema, handleNextStep } =
    props;

  const isMobile = useMediaQuery("(max-width: 700px)");
  const { employees } = useAppContext();

  const employmentContracts = employees?.employmentContract || [];
  const hasMultipleContracts = employmentContracts.length > 1;
  const hasAnyContract = employmentContracts.length > 0;

  console.log("empleado contracts:", employmentContracts);

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
              disabled={hasAnyContract && !hasMultipleContracts}
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
              disabled={hasAnyContract && !hasMultipleContracts}
            />
          </Stack>
          <Stack width={isMobile ? "100%" : "49%"}>
            <Select
              size="compact"
              fullwidth={true}
              name="contract"
              required
              label="Contrato"
              options={
                employmentContracts.length > 0
                  ? employmentContracts.map((contract: any) => ({
                      id: contract.id,
                      value: contract.id,
                      label: contract.name,
                    }))
                  : [
                      {
                        id: "",
                        value: "",
                        label: "No hay contratos disponibles",
                      },
                    ]
              }
              value={formik.values.contract}
              placeholder="Selecciona una opción"
              onChange={(name, value) => {
                console.log("Contrato seleccionado:", name, value);
                formik.setFieldValue(name, value);
              }}
              disabled={hasAnyContract && !hasMultipleContracts}
            />
          </Stack>
          <Stack>
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
};

export { GeneralInformationFormUI };
