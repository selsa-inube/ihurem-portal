import { Stack, Grid } from "@inubekit/inubekit";

import { BoxAttribute } from "@components/cards/BoxAttribute";
import { spacing } from "@design/tokens/spacing";

import { alerts } from "../../RequirementsForm/config/alertConfig";
import { IGeneralInformationEntry } from "../../GeneralInformationForm/types";
import { IFormsUpdateData } from "../../../types";

const renderPersonalInfoVerification = (
  values: IGeneralInformationEntry,
  isTablet: boolean,
  contractOptions: { id: string; value: string; label: string }[],
) => (
  <>
    <Grid
      templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
      autoRows="auto"
      gap={spacing.s100}
      width="100%"
    >
      <BoxAttribute
        label="Tipo de solicitud:"
        value={values.certification}
        direction="column"
      />
      <BoxAttribute
        label="Destinatario:"
        value={values.addressee}
        direction="column"
      />
      {contractOptions.length > 1 && (
        <BoxAttribute
          label="Contrato:"
          value={values.contract}
          direction="column"
        />
      )}
    </Grid>
    <Stack width="100%" direction="column">
      <BoxAttribute
        label="Observaciones:"
        value={values.observations}
        direction="column"
      />
    </Stack>
  </>
);

const renderAlerts = (isTablet: boolean) => (
  <Grid
    templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
    autoRows="auto"
    gap={spacing.s100}
    width="100%"
  >
    {alerts.map((alert, index) => (
      <Stack key={index} direction="column" gap={spacing.s050}>
        <BoxAttribute
          label={alert.requirement}
          value={alert.cause}
          direction="column"
        />
      </Stack>
    ))}
  </Grid>
);

interface VerificationBoxesProps {
  updatedData: IFormsUpdateData;
  stepKey: number;
  isTablet: boolean;
  contractOptions: { id: string; value: string; label: string }[];
}

function VerificationBoxes({
  updatedData,
  stepKey,
  isTablet,
  contractOptions,
}: VerificationBoxesProps) {
  return (
    <>
      {stepKey === 1 && renderAlerts(isTablet)}
      {stepKey === 2 &&
        renderPersonalInfoVerification(
          updatedData.personalInformation.values,
          isTablet,
          contractOptions,
        )}
    </>
  );
}

export { VerificationBoxes };
