import { Stack, Grid } from "@inubekit/inubekit";

import { BoxAttribute } from "@components/cards/BoxAttribute";
import { contractTypeLabels } from "@mocks/contracts/enums";
import { useAppContext } from "@context/AppContext/useAppContext";
import { spacing } from "@design/tokens/spacing";
import { labels } from "@i18n/labels";

import { alerts } from "../../RequirementsForm/config/alertConfig";
import { IGeneralInformationEntry } from "../../GeneralInformationForm/types";

interface IContractOption {
  id: string;
  value: string;
  label: string;
}

interface IContract {
  contractId: string;
  businessName: string;
  contractType: keyof typeof contractTypeLabels;
}

const renderPersonalInfoVerification = (
  values: IGeneralInformationEntry,
  isTablet: boolean,
  hasMultipleContracts: boolean,
  contractOptions: IContractOption[],
  contracts: IContract[] = [],
) => {
  const selectedContract = contractOptions.find(
    (contract) => contract.value === values.contract,
  );

  const contractLabel = selectedContract?.label ?? values.contract;

  const contractInfo = contracts.find((c) => c.contractId === values.contract);

  const contractDisplay =
    contractInfo?.contractId &&
    contractInfo?.businessName &&
    contractInfo?.contractType
      ? `${contractInfo.contractId} - ${contractInfo.businessName} - ${contractTypeLabels[contractInfo.contractType]}`
      : contractLabel;

  return (
    <>
      <Grid
        templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
        autoRows="auto"
        gap={spacing.s100}
        width="100%"
      >
        <BoxAttribute
          label={`${labels.certifications.assisted.requestType}:`}
          value={values.certification}
          direction="column"
        />
        <BoxAttribute
          label={`${labels.certifications.assisted.addressee}:`}
          value={values.addressee}
          direction="column"
        />
        {hasMultipleContracts && (
          <BoxAttribute
            label={`${labels.certifications.assisted.contract}:`}
            value={contractDisplay}
            direction="column"
          />
        )}
      </Grid>

      <Stack width="100%" direction="column">
        <BoxAttribute
          label={`${labels.certifications.assisted.observations}:`}
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

interface VerificationBoxesProps<
  T extends IGeneralInformationEntry = IGeneralInformationEntry,
> {
  updatedData: {
    personalInformation: { isValid: boolean; values: T };
  };
  stepKey: number;
  isTablet: boolean;
  contractOptions: IContractOption[];
}

function VerificationBoxes({
  updatedData,
  stepKey,
  isTablet,
  contractOptions,
}: VerificationBoxesProps) {
  const { employees } = useAppContext();

  const contracts = employees.employmentContracts as IContract[];
  const hasMultipleContracts = (contracts?.length ?? 0) > 1;

  return (
    <>
      {stepKey === 1 && renderAlerts(isTablet)}
      {stepKey === 2 &&
        renderPersonalInfoVerification(
          updatedData.personalInformation.values,
          isTablet,
          hasMultipleContracts,
          contractOptions,
          contracts,
        )}
    </>
  );
}

export { VerificationBoxes };
