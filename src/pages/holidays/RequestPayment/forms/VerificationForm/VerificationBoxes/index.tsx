import { Grid, Stack } from "@inubekit/inubekit";

import { BoxAttribute } from "@components/cards/BoxAttribute";
import { spacing } from "@design/tokens/spacing";
import { useAppContext } from "@context/AppContext";

import { alerts } from "../../RequirementsForm/config/alertConfig";
import { IFormsUpdateData } from "../../../types";
import { IGeneralInformationEntry } from "../../GeneralInformationForm/types";

const renderPersonalInfoVerification = (
  values: IGeneralInformationEntry,
  isTablet: boolean,
  hasMultipleContracts: boolean,
) => (
  <>
    <Grid
      templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
      autoRows="auto"
      gap={spacing.s100}
      width="100%"
    >
      <BoxAttribute
        label="Días hábiles a pagar:"
        value={values.daysToPay}
        direction="column"
      />
      {hasMultipleContracts && (
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
}

function VerificationBoxes({
  updatedData,
  isTablet,
  stepKey,
}: VerificationBoxesProps) {
  const { employees } = useAppContext();

  const hasMultipleContracts = (employees.employmentContracts?.length ?? 0) > 1;
  return (
    <>
      {stepKey === 1 && renderAlerts(isTablet)}
      {stepKey === 2 &&
        renderPersonalInfoVerification(
          updatedData.personalInformation.values,
          isTablet,
          hasMultipleContracts,
        )}
    </>
  );
}

export { VerificationBoxes };
