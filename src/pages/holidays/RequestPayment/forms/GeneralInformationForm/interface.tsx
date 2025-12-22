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

import { isRequired, getFieldState } from "@utils/forms/forms";
import { spacing } from "@design/tokens/spacing";
import { useAppContext } from "@context/AppContext/useAppContext";
import { contractTypeLabels } from "@mocks/contracts/enums";
import { labels } from "@i18n/labels";

import { IUnifiedHumanResourceRequestData } from "@ptypes/humanResourcesRequest.types";
import { StyledContainer } from "./styles";

function getDisabledState(loading: boolean | undefined, isValid: boolean) {
  return loading ? true : !isValid;
}

interface GeneralInformationFormUIProps {
  formik: FormikProps<IUnifiedHumanResourceRequestData>;
  validationSchema: ObjectSchema<AnyObject>;
  loading?: boolean;
  withNextButton?: boolean;
  handleNextStep: () => void;
}

function GeneralInformationFormUI(props: GeneralInformationFormUIProps) {
  const { formik, loading, withNextButton, validationSchema, handleNextStep } =
    props;

  const isMobile = useMediaQuery("(max-width: 700px)");
  const { contracts } = useAppContext();

  const contractOptions = useMemo(
    () =>
      (contracts ?? []).map((c) => ({
        id: c.contractId,
        value: c.contractId,
        label: `${c.businessName} - ${contractTypeLabels[c.contractType]}`,
      })),
    [contracts],
  );

  const handleContractChange = (name: string, value: string) => {
    formik.setFieldValue(name, value);

    const contrato = contracts?.find((c) => c.contractId === value);

    if (contrato) {
      formik.setFieldValue("businessName", contrato.businessName);
      formik.setFieldValue("contractType", contrato.contractType);
      formik.setFieldValue("contractNumber", contrato.contractNumber);
    }
  };

  useEffect(() => {
    if (contractOptions.length === 1 && !formik.values.contractId) {
      const onlyOption = contractOptions[0];
      handleContractChange("contractId", onlyOption.value);
    }
  }, [contractOptions, formik.values.contractId]);

  useEffect(() => {
    if (formik.values.contractId && contracts?.length) {
      const contrato = contracts.find(
        (c) => c.contractId === formik.values.contractId,
      );

      if (contrato) {
        formik.setFieldValue("businessName", contrato.businessName);
        formik.setFieldValue("contractType", contrato.contractType);
        formik.setFieldValue("contractNumber", contrato.contractNumber);
      }
    }
  }, [formik.values.contractId, contracts]);

  return (
    <form>
      <Stack direction="column" gap={isMobile ? spacing.s300 : spacing.s400}>
        <StyledContainer $isMobile={isMobile}>
          <Stack direction="column" width="100%" gap={spacing.s200}>
            <Stack direction={isMobile ? "column" : "row"} gap={spacing.s200}>
              <Textfield
                label={labels.holidays.generalInformationForm.daysToPayLabel}
                placeholder={
                  labels.holidays.generalInformationForm.daysToPayPlaceholder
                }
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
                  label={labels.holidays.generalInformationForm.contractLabel}
                  name="contractId"
                  options={contractOptions}
                  placeholder={
                    labels.holidays.generalInformationForm.contractPlaceholder
                  }
                  value={formik.values.contractId ?? ""}
                  message={formik.errors.contractId}
                  disabled={loading}
                  size="compact"
                  fullwidth
                  onChange={(_, v) => handleContractChange("contractId", v)}
                  required={isRequired(props.validationSchema, "contractId")}
                />
              )}
            </Stack>

            <Textarea
              label={labels.holidays.generalInformationForm.observationsLabel}
              placeholder={
                labels.holidays.generalInformationForm.observationsPlaceholder
              }
              name="observationEmployee"
              id="observationEmployee"
              value={formik.values.observationEmployee}
              maxLength={1000}
              disabled={loading}
              status={getFieldState(formik, "observationEmployee")}
              message={formik.errors.observationEmployee}
              fullwidth
              required={isRequired(validationSchema, "observationEmployee")}
              onBlur={formik.handleBlur}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 1000) {
                  formik.setFieldValue("observationEmployee", value);
                }
              }}
            />
          </Stack>
        </StyledContainer>

        {withNextButton && (
          <Stack justifyContent="flex-end">
            <Button
              onClick={handleNextStep}
              disabled={getDisabledState(loading, formik.isValid)}
            >
              {labels.holidays.generalInformationForm.nextButton}
            </Button>
          </Stack>
        )}
      </Stack>
    </form>
  );
}

export { GeneralInformationFormUI };
export type { GeneralInformationFormUIProps };
