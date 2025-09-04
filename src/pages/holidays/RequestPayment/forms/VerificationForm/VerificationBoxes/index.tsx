import { Grid, Stack } from "@inubekit/inubekit";

import { BoxAttribute } from "@components/cards/BoxAttribute";
import { spacing } from "@design/tokens/spacing";
import { useAppContext } from "@context/AppContext/useAppContext";
import { showRequirements } from "@pages/holidays/config/requirements";

import { IFormsUpdateData } from "../../../types";
import { IGeneralInformationEntry } from "../../GeneralInformationForm/types";
import { alerts } from "../../RequirementsForm/config/alertConfig";
import { contractTypeLabels } from "@mocks/contracts/enums";
interface IContract {
  contractId: string;
  businessName: string;
  contractType: keyof typeof contractTypeLabels;
}

const renderPersonalInfoVerification = (
  values: IGeneralInformationEntry,
  isTablet: boolean,
  hasMultipleContracts: boolean,
  contracts: IContract[] = [],
) => {
  const contractInfo = contracts.find((c) => c.contractId === values.contract);

  const contractDisplay =
    contractInfo?.contractId &&
    contractInfo?.businessName &&
    contractInfo?.contractType
      ? `${contractInfo.contractId} - ${contractInfo.businessName} - ${contractTypeLabels[contractInfo.contractType]}`
      : values.contract;

  return (
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
            value={contractDisplay}
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
};

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

  const contracts = employees.employmentContracts as IContract[];
  const hasMultipleContracts = (contracts?.length ?? 0) > 1;

  const adjustedStepKey = showRequirements ? stepKey : stepKey + 1;

  return (
    <>
      {showRequirements && adjustedStepKey === 1 && renderAlerts(isTablet)}
      {adjustedStepKey === 2 &&
        renderPersonalInfoVerification(
          updatedData.personalInformation.values,
          isTablet,
          hasMultipleContracts,
          contracts,
        )}
    </>
  );
}

export { VerificationBoxes };
