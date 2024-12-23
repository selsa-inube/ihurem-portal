import { Grid } from "@inubekit/grid";
import { Stack } from "@inubekit/stack";

import { BoxAttribute } from "@components/cards/BoxAttribute";
import { spacing } from "@design/tokens/spacing/spacing";
import { formatDate } from "@utils/date";

import { IGeneralInformationEntry } from "../../GeneralInformationForm/types";
import { IFormsUpdateData } from "../../../types";

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
      <BoxAttribute label="Días de disfrute:" value={values.daysOff} />
      <BoxAttribute
        label="Fecha de inicio:"
        value={formatDate(values.startDate)}
      />
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
  return (
    <>
      {stepKey === 1 &&
        renderPersonalInfoVerification(
          updatedData.personalInformation.values,
          isTablet,
        )}
    </>
  );
}

export { VerificationBoxes };