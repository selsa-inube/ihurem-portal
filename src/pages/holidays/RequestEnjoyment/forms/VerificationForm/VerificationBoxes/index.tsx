import { Grid, Stack } from "@inubekit/inubekit";

import { BoxAttribute } from "@components/cards/BoxAttribute";
import { spacing } from "@design/tokens/spacing";
import { useAppContext } from "@context/AppContext";

import { IGeneralInformationEntry } from "../../GeneralInformationForm/types";
import { IFormsUpdateData } from "../../../types";

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
        label="Días de disfrute:"
        value={values.daysOff}
        direction="column"
      />
      <BoxAttribute
        label="Fecha de inicio:"
        value={values.startDate}
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

interface VerificationBoxesProps {
  updatedData: IFormsUpdateData;
  stepKey: number;
  isTablet: boolean;
}

function VerificationBoxes({
  updatedData,
  stepKey,
  isTablet,
}: VerificationBoxesProps) {
  const { employees } = useAppContext();

  const hasMultipleContracts = (employees.employmentContracts?.length ?? 0) > 1;

  return (
    <>
      {stepKey === 1 &&
        renderPersonalInfoVerification(
          updatedData.personalInformation.values,
          isTablet,
          hasMultipleContracts,
        )}
    </>
  );
}

export { VerificationBoxes };
