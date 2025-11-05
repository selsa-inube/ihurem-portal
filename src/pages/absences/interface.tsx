import { useState } from "react";
import { Button, Stack, useMediaQuery, Text } from "@inubekit/inubekit";
import { MdAdd } from "react-icons/md";

import { AppMenu } from "@components/layout/AppMenu";
import { IRoute } from "@components/layout/AppMenu/types";
import { spacing } from "@design/tokens/spacing";

import { StyledHolidaysContainer } from "./styles";
import { AbsencesTable } from "./components/AbsenscesTable";
import { mockAbsencesData } from "./components/tableMock/tableMock";
import { InfoModal } from "@components/modals/InfoModal";

interface AbsencesOptionsUIProps {
  appName: string;
  appDescription?: string;
  navigatePage: string;
  appRoute: IRoute[];
  hasActiveContract?: boolean;
  hasPrivilege?: boolean;
  hasPaymentPrivilege?: boolean;
  handleDeleteRequest: (requestId: string, justification: string) => void;
}

function AbsencesOptionsUI(props: AbsencesOptionsUIProps) {
  const {
    appName,
    appDescription,
    navigatePage,
    appRoute,
    hasActiveContract = true,
    hasPrivilege = true,
  } = props;

  const isMobile = useMediaQuery("(max-width: 768px)");
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);

  const handleReportAbsence = () => {
    if (!hasActiveContract || !hasPrivilege) {
      setShowModal(true);
      return;
    }
  };

  const handleRestrictedAction = () => {
    setShowModal(true);
  };

  return (
    <AppMenu
      appName={appName}
      appDescription={appDescription}
      appRoute={appRoute}
      navigatePage={navigatePage}
    >
      <StyledHolidaysContainer $isMobile={isMobile}>
        <Stack
          direction={isMobile ? "column" : "row"}
          justifyContent={isMobile ? "start" : "space-between"}
          alignItems="center"
          width="100%"
          gap={spacing.s150}
        >
          <Text type="title" size="medium">
            Consulta de ausencias del empleado
          </Text>

          <Button
            spacing="wide"
            variant="filled"
            iconBefore={<MdAdd />}
            fullwidth={isMobile}
            onClick={handleReportAbsence}
          >
            Reportar ausencia
          </Button>
        </Stack>

        <AbsencesTable
          data={mockAbsencesData}
          hasViewDetailsPrivilege={hasPrivilege}
          hasUploadPrivilege={hasPrivilege}
          handleRestrictedClick={handleRestrictedAction}
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
