import { FormikProps } from "formik";
import {
  Input,
  Textarea,
  Select,
  IOption,
  Button,
  Stack,
  useMediaQuery,
} from "@inubekit/inubekit";

import { isRequired } from "@utils/forms/forms";
import { getFieldState } from "@utils/forms/forms";
import { spacing } from "@design/tokens/spacing/spacing";
import { certificationOptions } from "@pages/certifications/NewCertification/config/assisted.config";

import { StyledContainer } from "./styles";
import { IGeneralInformationEntry } from "./types";

function getDisabledState(loading: boolean | undefined, isValid: boolean) {
  return loading ? true : !isValid;
}

interface GeneralInformationFormUIProps {
  formik: FormikProps<IGeneralInformationEntry>;
  contractOptions: IOption[];
  loading?: boolean;
  withNextButton?: boolean;
  handleNextStep: () => void;
  validationSchema?: any;
}

const GeneralInformationFormUI = (props: GeneralInformationFormUIProps) => {
  const {
    formik,
    loading,
    withNextButton,
    validationSchema,
    handleNextStep,
    contractOptions,
  } = props;

  const isMobile = useMediaQuery("(max-width: 700px)");

  const handleContractChange = (name: string, value: string) => {
    formik.setFieldValue(name, value);
    formik.setFieldValue(
      "contractDesc",
      contractOptions.find((option) => option.value === value)?.label,
    );
  };

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
              disabled={loading}
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
              disabled={loading}
            />
          </Stack>
          <Stack>
            <Select
              label="Contrato"
              name="contract"
              id="contract"
              options={contractOptions}
              placeholder="Selecciona un contrato"
              value={formik.values.contract}
              message={formik.errors.contract}
              disabled={getDisabledState(
                loading,
                contractOptions.length !== 1 || !formik.values.contract,
              )}
              size="compact"
              fullwidth
              onBlur={formik.handleBlur}
              onChange={handleContractChange}
              required={isRequired(validationSchema, "contract")}
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
              disabled={getDisabledState(loading, formik.isValid)}
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
