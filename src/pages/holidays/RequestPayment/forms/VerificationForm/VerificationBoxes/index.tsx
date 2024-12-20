import { Stack } from "@inubekit/stack";
import { Grid } from "@inubekit/grid";

import { BoxAttribute } from "@components/cards/BoxAttribute";
import { spacing } from "@design/tokens/spacing/spacing";

import { IFormsUpdateData } from "../../../types";
import { IGeneralInformationEntry } from "../../GeneralInformationForm/types";

const renderPersonalInfoVerification = (
  values: IGeneralInformationEntry,
  isTablet: boolean,
) => (
  <>
    <Grid
      templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
      autoRows="auto"
      gap={spacing.s100}
      width="100%"
    >
      <BoxAttribute label="Días hábiles a pagar:" value={values.daysToPay} />
      <BoxAttribute label="Contrato:" value={values.contract} />
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

const renderRequerimentsVerification = (isTablet: boolean) => (
  <Grid
    templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
    autoRows="auto"
    gap={spacing.s100}
    width="100%"
  >
    <BoxAttribute label="Supera los días completos:" value="Cumple" />
    <BoxAttribute label="Periodos completos:" value="No cumple" />
    <BoxAttribute label="Requisito adicional de ejemplo:" value="Cumple" />
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
  return (
    <>
      {stepKey === 1 &&
        renderPersonalInfoVerification(
          updatedData.personalInformation.values,
          isTablet,
        )}
      {stepKey === 2 && renderRequerimentsVerification(isTablet)}
    </>
  );
}

export { VerificationBoxes };
