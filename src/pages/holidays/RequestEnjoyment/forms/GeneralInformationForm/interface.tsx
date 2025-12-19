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

import { labels } from "@i18n/labels";
import { isRequired, getFieldState } from "@utils/forms/forms";
import { spacing } from "@design/tokens/spacing";
import { useAppContext } from "@context/AppContext/useAppContext";
import { contractTypeLabels } from "@mocks/contracts/enums";
import { IUnifiedHumanResourceRequestData } from "@ptypes/humanResourcesRequest.types";

import { StyledContainer } from "./styles";

interface GeneralInformationFormUIProps {
  formik: FormikProps<IUnifiedHumanResourceRequestData>;
  validationSchema: Yup.ObjectSchema<Yup.AnyObject>;
  loading?: boolean;
  withNextButton?: boolean;
  handleNextStep: () => void;
}

function GeneralInformationFormUI(props: GeneralInformationFormUIProps) {
  const { formik, validationSchema, loading, withNextButton, handleNextStep } =
    props;
  const isMobile = useMediaQuery("(max-width: 700px)");
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

  useEffect(() => {
    if (contractOptions.length === 1 && !formik.values.contractId) {
      const opt = contractOptions[0];
      formik.setFieldValue("contractId", opt.value);

      const contrato = employees.employmentContracts?.find(
        (c) => c.contractId === opt.value,
      );

      if (contrato) {
        formik.setFieldValue("businessName", contrato.businessName);
        formik.setFieldValue("contractType", contrato.contractType);
        formik.setFieldValue("contractNumber", contrato.contractNumber);
      }
    }
  }, [contractOptions]);

  return (
    <form>
      <Stack direction="column" gap={isMobile ? spacing.s300 : spacing.s400}>
        <StyledContainer $isMobile={isMobile}>
          <Stack direction="column" width="100%" gap={spacing.s200}>
            <Stack direction={isMobile ? "column" : "row"} gap={spacing.s200}>
              <Textfield
                label={
                  labels.holidays.generalInformationForm.enjoymentDaysLabel
                }
                placeholder={
                  labels.holidays.generalInformationForm.daysToPayPlaceholder
                }
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
                label={labels.holidays.generalInformationForm.startDateLabel}
                name="startDateEnyoment"
                id="startDateEnyoment"
                value={formik.values.startDateEnyoment}
                disabled={loading}
                status={getFieldState(formik, "startDateEnyoment")}
                message={formik.errors.startDateEnyoment}
                size="compact"
                fullwidth
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required={isRequired(validationSchema, "startDateEnyoment")}
              />
            </Stack>

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
                onChange={(_, v) => {
                  formik.setFieldValue("contractId", v);
                  const contrato = employees.employmentContracts?.find(
                    (c) => c.contractId === v,
                  );

                  if (contrato) {
                    formik.setFieldValue("businessName", contrato.businessName);
                    formik.setFieldValue("contractType", contrato.contractType);
                    formik.setFieldValue(
                      "contractNumber",
                      contrato.contractNumber,
                    );
                  }
                }}
                required={isRequired(props.validationSchema, "contractId")}
              />
            )}

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
              disabled={loading ?? !formik.isValid}
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
