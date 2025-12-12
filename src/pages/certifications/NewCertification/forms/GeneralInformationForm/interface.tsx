import { FormikProps } from "formik";
import { useEffect, useMemo } from "react";
import { ObjectSchema, AnyObject } from "yup";
import {
  Stack,
  Button,
  Select,
  Textarea,
  Input,
  useMediaQuery,
} from "@inubekit/inubekit";

import { labels } from "@i18n/labels";
import { getFieldState } from "@utils/forms/forms";
import { spacing } from "@design/tokens/spacing";
import { useAppContext } from "@context/AppContext/useAppContext";
import { certificationOptions } from "@pages/certifications/NewCertification/config/assisted.config";
import { contractTypeLabels } from "@mocks/contracts/enums";
import { IUnifiedHumanResourceRequestData } from "@ptypes/humanResourcesRequest.types";

import { generalInformationRequiredFields } from "./config/formConfig";
import { StyledContainer } from "./styles";

interface GeneralInformationFormUIProps {
  formik: FormikProps<IUnifiedHumanResourceRequestData>;
  loading?: boolean;
  withNextButton?: boolean;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  validationSchema?: ObjectSchema<AnyObject>;
  isFormValid?: boolean;
}

const GeneralInformationFormUI = ({
  formik,
  loading,
  withNextButton,
  handleNextStep,
  handlePreviousStep,
  isFormValid,
}: GeneralInformationFormUIProps) => {
  const { employees } = useAppContext();

  const contractOptions = useMemo(
    () =>
      (employees.employmentContracts ?? []).map((c) => ({
        id: c.contractId,
        value: c.contractId,
        label: `${c.businessName} - ${contractTypeLabels[c.contractType]}`,
      })),
    [employees.employmentContracts],
  );

  const handleContractChange = (name: string, value: string) => {
    formik.setFieldValue(name, value);

    const contrato = employees.employmentContracts?.find(
      (c) => c.contractId === value,
    );

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

  const isMobile = useMediaQuery("(max-width: 700px)");

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack direction="column" gap={spacing.s300}>
        <StyledContainer $isMobile={isMobile}>
          <Stack
            direction={isMobile ? "column" : "row"}
            gap={isMobile ? spacing.s200 : spacing.s300}
          >
            <Select
              name="certificationType"
              size="compact"
              label={labels.certifications.assisted.certificationType}
              fullwidth
              options={certificationOptions}
              placeholder={labels.certifications.assisted.contractPlaceholder}
              value={formik.values.certificationType ?? ""}
              onChange={(name, value) => {
                void formik.setFieldValue(name, value);
              }}
            />
            <Input
              size="compact"
              fullwidth
              id="addressee"
              required
              label={labels.certifications.assisted.addressee}
              maxLength={60}
              name="addressee"
              placeholder={labels.certifications.assisted.addresseePlaceholder}
              value={formik.values.addressee}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Stack>

          {contractOptions.length > 1 && (
            <Select
              label={labels.certifications.assisted.contract}
              name="contractId"
              id="contractId"
              options={contractOptions}
              placeholder={labels.certifications.assisted.contractPlaceholder}
              value={formik.values.contractId ?? ""}
              message={
                typeof formik.errors.contractId === "string"
                  ? formik.errors.contractId
                  : undefined
              }
              disabled={
                loading ??
                (contractOptions.length !== 1 && !formik.values.contractId)
              }
              size="compact"
              fullwidth
              onBlur={formik.handleBlur}
              onChange={handleContractChange}
            />
          )}

          <Textarea
            label={labels.certifications.assisted.observations}
            placeholder={labels.certifications.assisted.observationsPlaceholder}
            name="observationEmployee"
            id="observationEmployee"
            value={formik.values.observationEmployee}
            maxLength={1000}
            disabled={loading}
            status={getFieldState(formik, "observationEmployee")}
            message={
              typeof formik.errors.observationEmployee === "string"
                ? formik.errors.observationEmployee
                : undefined
            }
            required={generalInformationRequiredFields.observations}
            fullwidth
            onBlur={formik.handleBlur}
            onChange={(e) => {
              const value = e.target.value;
              if (value.length <= 1000) {
                formik.setFieldValue("observationEmployee", value);
              }
            }}
          />
        </StyledContainer>

        {withNextButton && (
          <Stack justifyContent="flex-end" gap={spacing.s200}>
            <Button
              appearance="gray"
              variant="outlined"
              onClick={handlePreviousStep}
            >
              {labels.certifications.assisted.previous}
            </Button>
            <Button
              type="submit"
              disabled={loading ?? !isFormValid}
              onClick={() => {
                handleNextStep();
              }}
            >
              {labels.certifications.assisted.next}
            </Button>
          </Stack>
        )}
      </Stack>
    </form>
  );
};

export { GeneralInformationFormUI };
