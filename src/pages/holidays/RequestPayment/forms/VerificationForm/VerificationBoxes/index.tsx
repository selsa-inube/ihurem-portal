import { Stack } from "@inubekit/stack";
import { Grid } from "@inubekit/grid";

import { BoxAttribute } from "@components/cards/BoxAttribute";
import { spacing } from "@design/tokens/spacing/spacing";

const renderPersonalInfoVerification = () => (
  <Stack width="100%" direction="column" gap={spacing.s200}>
    <BoxAttribute label="Fecha de inicio:" value="2" />
    <BoxAttribute
      label="Observaciones:"
      value="Me gustaría que uno de los asesores se contactaran vía telefónica, si es posible, ya que me quedan ciertas dudas que no se solucionan mediante la pagina. Agradecería una llamada al numero celular 312 3202874."
      direction="column"
    />
  </Stack>
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
  stepKey: number;
  isTablet: boolean;
}

function VerificationBoxes({ isTablet, stepKey }: VerificationBoxesProps) {
  return (
    <>
      {stepKey === 1 && renderPersonalInfoVerification()}
      {stepKey === 2 && renderRequerimentsVerification(isTablet)}
    </>
  );
}

export { VerificationBoxes };
