import { useEffect, useMemo } from "react";
import { FormikProps } from "formik";
import { ObjectSchema, AnyObject } from "yup";
import {
  Stack,
  Button,
  Select,
  Textarea,
  Textfield,
  useMediaQuery,
} from "@inubekit/inubekit";

import { isRequired } from "@utils/forms/forms";
import { spacing } from "@design/tokens/spacing";
import { getFieldState } from "@utils/forms/forms";
import { useAppContext } from "@context/AppContext";
import { contractTypeLabels } from "@mocks/contracts/enums";
import { showRequirements } from "@pages/holidays/config/requirements";

import { IGeneralInformationEntry } from "./types";
import { StyledContainer } from "./styles";

function getDisabledState(loading: boolean | undefined, isValid: boolean) {
  return loading ? true : !isValid;
}

interface GeneralInformationFormUIProps {
  formik: FormikProps<IGeneralInformationEntry>;
  validationSchema: ObjectSchema<AnyObject>;
  loading?: boolean;
  withNextButton?: boolean;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}

function GeneralInformationFormUI(props: GeneralInformationFormUIProps) {
  const {
    formik,
    loading,
    withNextButton,
    validationSchema,
    handleNextStep,
    handlePreviousStep,
  } = props;

  const isMobile = useMediaQuery("(max-width: 700px)");
  const { employees } = useAppContext();

  const contractOptions = useMemo(
    () =>
      (employees.employmentContracts ?? []).map((c) => ({
        id: c.contractId,
        value: `${c.businessName} - ${contractTypeLabels[c.contractType]}`,
        label: `${c.businessName} - ${contractTypeLabels[c.contractType]}`,
      })),
    [employees.employmentContracts],
  );

  const handleContractChange = (name: string, value: string) => {
    formik.setFieldValue(name, value);
    const found = contractOptions.find((option) => option.value === value);
    formik.setFieldValue("contractDesc", found?.label ?? "");
  };

  useEffect(() => {
    if (contractOptions.length === 1 && !formik.values.contract) {
      const onlyOption = contractOptions[0];
      handleContractChange("contract", onlyOption.value);
    }
  }, [contractOptions, formik.values.contract]);

  return (
    <form>
      <Stack direction="column" gap={isMobile ? spacing.s300 : spacing.s400}>
        <StyledContainer $isMobile={isMobile}>
          <Stack direction="column" width="100%" gap={spacing.s200}>
            <Stack direction={isMobile ? "column" : "row"} gap={spacing.s200}>
              <Textfield
                label="Días hábiles a pagar"
                placeholder="Ej: 2"
                name="daysToPay"
                id="daysToPay"
                type="number"
                value={formik.values.daysToPay}
                status={getFieldState(formik, "daysToPay")}
                message={formik.errors.daysToPay}
                disabled={loading}
                size="compact"
                fullwidth
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required={isRequired(validationSchema, "daysToPay")}
              />
              {contractOptions.length > 1 && (
                <Select
                  label="Contrato"
                  name="contract"
                  id="contract"
                  options={contractOptions}
                  placeholder="Selecciona de la lista"
                  value={formik.values.contract}
                  message={formik.errors.contract}
                  disabled={getDisabledState(
                    loading,
                    contractOptions.length !== 1 || !formik.values.contract,
                  )}
                  size="compact"
                  fullwidth
                  onBlur={formik.handleBlur}
                  onChange={(name, value) => {
                    formik.setFieldValue(name, value);
                  }}
                  required={isRequired(validationSchema, "contract")}
                />
              )}
            </Stack>

            <Textarea
              label="Observaciones"
              placeholder="Detalles a tener en cuenta."
              name="observations"
              id="observations"
              value={formik.values.observations}
              maxLength={1000}
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
          <Stack justifyContent="flex-end" gap={spacing.s250}>
            {showRequirements && (
              <Button
                appearance="gray"
                variant="outlined"
                onClick={handlePreviousStep}
              >
                Anterior
              </Button>
            )}
            <Button
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
}

export { GeneralInformationFormUI };
