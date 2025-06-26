import {
  Date,
  Stack,
  Button,
  Select,
  Textarea,
  Textfield,
  useMediaQuery,
} from "@inubekit/inubekit";
import { useEffect, useMemo } from "react";
import { FormikProps } from "formik";
import * as Yup from "yup";

import { isRequired, getFieldState } from "@utils/forms/forms";
import { spacing } from "@design/tokens/spacing";
import { useAppContext } from "@context/AppContext";
import { contractTypeLabels } from "@mocks/contracts/enums";
import { showRequirements } from "@pages/holidays/config/requirements";

import { IGeneralInformationEntry } from "./types";
import { StyledContainer } from "./styles";

interface GeneralInformationFormUIProps {
  formik: FormikProps<IGeneralInformationEntry>;
  validationSchema: Yup.ObjectSchema<Yup.AnyObject>;
  loading?: boolean;
  withNextButton?: boolean;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}

function GeneralInformationFormUI(props: GeneralInformationFormUIProps) {
  const {
    formik,
    validationSchema,
    loading,
    withNextButton,
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

  useEffect(() => {
    if (contractOptions.length === 1 && !formik.values.contract) {
      const opt = contractOptions[0];
      formik.setFieldValue("contract", opt.value);
      formik.setFieldValue("contractDesc", opt.label);
    }
  }, [contractOptions]);

  return (
    <form>
      <Stack direction="column" gap={isMobile ? spacing.s300 : spacing.s400}>
        <StyledContainer $isMobile={isMobile}>
          <Stack direction="column" width="100%" gap={spacing.s200}>
            <Stack direction={isMobile ? "column" : "row"} gap={spacing.s200}>
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
                required={isRequired(props.validationSchema, "daysOff")}
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
            {contractOptions.length > 1 && (
              <Select
                label="Contrato"
                name="contract"
                options={contractOptions}
                placeholder="Selecciona de la lista"
                value={formik.values.contract}
                message={formik.errors.contract}
                disabled={loading}
                size="compact"
                fullwidth
                onChange={(_, v) => {
                  formik.setFieldValue("contract", v);
                  const lbl =
                    contractOptions.find((o) => o.value === v)?.label ?? "";
                  formik.setFieldValue("contractDesc", lbl);
                }}
                required={isRequired(props.validationSchema, "contract")}
              />
            )}
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
              required={isRequired(props.validationSchema, "observations")}
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
