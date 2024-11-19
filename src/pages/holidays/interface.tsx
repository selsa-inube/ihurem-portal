import { Button } from "@inubekit/button";
import { Stack } from "@inubekit/stack";
import { MdOutlineAirplanemodeActive, MdOutlinePayments } from "react-icons/md";
import { useMediaQuery } from "@inubekit/hooks";

import { AppMenu } from "@components/layout/AppMenu";
import { IRoute } from "@components/layout/AppMenu/types";
import { spacing } from "@design/tokens/spacing/spacing";

import { StyledHolidaysContainer } from "./styles";
import { HolidaysTable } from "./components/HolidaysTable";
import { generateData } from "./components/HolidaysTable/tableConfig";

interface HolidaysOptionsUIProps {
  appName: string;
  appDescription?: string;
  appRoute: IRoute[];
}

function HolidaysOptionsUI(props: HolidaysOptionsUIProps) {
  const { appName, appDescription, appRoute } = props;

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <AppMenu
      appName={appName}
      appDescription={appDescription}
      appRoute={appRoute}
    >
      <StyledHolidaysContainer $isMobile={isMobile}>
        <Stack
          gap={spacing.s150}
          justifyContent="end"
          width="100%"
          direction={isMobile ? "column" : "row"}
        >
          <Button spacing="wide" variant="outlined" fullwidth={isMobile}>
            Días por disfrutar
          </Button>
          <Button
            spacing="wide"
            variant="filled"
            iconBefore={<MdOutlineAirplanemodeActive />}
            fullwidth={isMobile}
          >
            Solicitar disfrute
          </Button>
          <Button
            spacing="wide"
            variant="filled"
            iconBefore={<MdOutlinePayments />}
            fullwidth={isMobile}
          >
            Solicitar pago
          </Button>
        </Stack>
        <HolidaysTable data={generateData()} />
      </StyledHolidaysContainer>
    </AppMenu>
  );
}

export { HolidaysOptionsUI };
