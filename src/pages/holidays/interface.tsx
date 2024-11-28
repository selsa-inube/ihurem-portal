import { useState } from "react";
import { MdOutlineAirplanemodeActive, MdOutlinePayments } from "react-icons/md";
import { Button } from "@inubekit/button";
import { Stack } from "@inubekit/stack";
import { useMediaQuery } from "@inubekit/hooks";

import { AppMenu } from "@components/layout/AppMenu";
import { IRoute } from "@components/layout/AppMenu/types";
import { spacing } from "@design/tokens/spacing/spacing";

import { StyledHolidaysContainer } from "./styles";
import { HolidaysTable } from "./components/HolidaysTable";
import { PendingHolidaysModal } from "./modals/PendingHolidaysModal";
import { generateData as pendingHolidaysData } from "./components/PendingVacationDaysTable/tableConfig";
import { IHolidaysTable } from "./components/HolidaysTable/types";

interface HolidaysOptionsUIProps {
  appName: string;
  appRoute: IRoute[];
  tableData: IHolidaysTable[];
  isLoading: boolean;
  appDescription?: string;
  navigatePage: string;
}

function HolidaysOptionsUI(props: HolidaysOptionsUIProps) {
  const {
    appName,
    appRoute,
    tableData,
    isLoading,
    appDescription,
    navigatePage,
  } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <AppMenu
        appName={appName}
        appDescription={appDescription}
        appRoute={appRoute}
        navigatePage={navigatePage}
      >
        <StyledHolidaysContainer $isMobile={isMobile}>
          <Stack
            gap={spacing.s150}
            justifyContent="end"
            width="100%"
            direction={isMobile ? "column" : "row"}
          >
            <Button
              spacing="wide"
              variant="outlined"
              fullwidth={isMobile}
              onClick={handleOpenModal}
            >
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
          <HolidaysTable data={tableData} loading={isLoading} />
        </StyledHolidaysContainer>
      </AppMenu>
      {isModalOpen && (
        <PendingHolidaysModal
          portalId="portal"
          totalDays={23}
          tableData={pendingHolidaysData()}
          loading={false}
          handleClose={handleCloseModal}
        />
      )}
    </>
  );
}

export { HolidaysOptionsUI };
