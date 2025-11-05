import { useState } from "react";
import { Button, Stack, useMediaQuery } from "@inubekit/inubekit";
import { MdAdd } from "react-icons/md";

import { AppMenu } from "@components/layout/AppMenu";
import { IRoute } from "@components/layout/AppMenu/types";
import { spacing } from "@design/tokens/spacing";

import { StyledHolidaysContainer } from "./styles";
import { AbsencesTable } from "./components/AbsenscesTable";
import { generateData } from "./components/AbsenscesTable/tableConfig";
import { usePrivileges } from "@hooks/usePrivileges";
import { InfoModal } from "@components/modals/InfoModal";

interface AbsencesOptionsUIProps {
  appName: string;
  appDescription?: string;
  navigatePage: string;
  appRoute: IRoute[];
}

function AbsencesOptionsUI(props: AbsencesOptionsUIProps) {
  const { appName, appDescription, navigatePage, appRoute } = props;
  const { hasPrivilege } = usePrivileges();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [showModal, setShowModal] = useState(false);

  const handleNoPrivilege = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const canReport = hasPrivilege("reportAbsencesHR");

  return (
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
            variant="filled"
            iconBefore={<MdAdd />}
            fullwidth={isMobile}
            disabled={!canReport}
            onClick={
              canReport
                ? () => console.log("Reportar ausencia")
                : handleNoPrivilege
            }
          >
            Reportar ausencia
          </Button>
        </Stack>

        <AbsencesTable
          data={generateData()}
          onNoPrivilege={handleNoPrivilege} // ✅ pasamos callback
        />

        {showModal && (
          <InfoModal
            title="Sin privilegios"
            titleDescription="Acción no permitida"
            description="No tienes permisos para realizar esta acción."
            buttonText="Entendido"
            onCloseModal={handleCloseModal}
          />
        )}
      </StyledHolidaysContainer>
    </AppMenu>
  );
}

export { AbsencesOptionsUI };
