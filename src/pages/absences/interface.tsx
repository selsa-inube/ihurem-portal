import { useState } from "react";
import { Button, Stack, useMediaQuery, Text, Icon } from "@inubekit/inubekit";
import { MdAdd, MdOutlineInfo } from "react-icons/md";

import { InfoModal } from "@components/modals/InfoModal";
import { AppMenu } from "@components/layout/AppMenu";
import { IRoute } from "@components/layout/AppMenu/types";
import { spacing } from "@design/tokens/spacing";

import { StyledHolidaysContainer } from "./styles";
import { AbsencesTable } from "./components/AbsenscesTable";
import { mockAbsencesData } from "./components/tableMock/tableMock";
import { AbsenceDetail } from "./components/Detail";

interface AbsencesOptionsUIProps {
  appName: string;
  appDescription?: string;
  navigatePage: string;
  appRoute: IRoute[];
  hasActiveContract?: boolean;
  hasPrivilege?: boolean;
  actionDescriptions?: Record<string, string>;
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
    actionDescriptions = {
      absence:
        "No se puede reportar ausencia, ya que no tiene un contrato activo o no cuenta con los privilegios necesarios.",
    },
  } = props;

  const isMobile = useMediaQuery("(max-width: 768px)");
  const [infoModal, setInfoModal] = useState({
    open: false,
    title: "",
    description: "",
  });

  const handleReportAbsence = () => {
    if (!hasActiveContract || !hasPrivilege) {
      onOpenInfoModal(actionDescriptions.absence);
      return;
    }
  };

  const handleRestrictedAction = () => {
    onOpenInfoModal("No tienes permisos para realizar esta acción.");
  };

  const onOpenInfoModal = (description: string) => {
    setInfoModal({
      open: true,
      title: "Acción inhabilitada",
      description,
    });
  };

  const renderActions = () =>
    isMobile ? (
      <Stack direction="column" gap={spacing.s150}>
        <AbsenceDetail
          disableAbsence={!hasPrivilege || !hasActiveContract}
          actionDescriptions={actionDescriptions}
          hasTableData={mockAbsencesData.length > 0}
          onRequestAbsence={handleReportAbsence}
          onInfoIconClick={(desc) => onOpenInfoModal(desc)}
        />
      </Stack>
    ) : (
      <Stack gap={spacing.s150} justifyContent="end" direction="row">
        <Stack gap={spacing.s025} alignItems="center">
          <Button
            spacing="wide"
            variant="filled"
            iconBefore={<MdAdd />}
            fullwidth={isMobile}
            disabled={!hasActiveContract || !hasPrivilege}
            onClick={handleReportAbsence}
          >
            Reportar ausencia
          </Button>
          {(!hasActiveContract || !hasPrivilege) && (
            <Icon
              icon={<MdOutlineInfo />}
              appearance="primary"
              size="16px"
              cursorHover
              onClick={() => onOpenInfoModal(actionDescriptions.absence)}
            />
          )}
        </Stack>
      </Stack>
    );

  return (
    <>
      <AppMenu
        appName={appName}
        appDescription={appDescription}
        appRoute={appRoute}
        navigatePage={navigatePage}
      >
        <StyledHolidaysContainer $isMobile={isMobile}>
          <Stack alignItems="center" justifyContent="space-between">
            <Text type="title" size="medium">
              Consulta de ausencias del empleado
            </Text>
            {renderActions()}
          </Stack>

          <AbsencesTable
            data={mockAbsencesData}
            hasViewDetailsPrivilege={hasPrivilege}
            hasUploadPrivilege={hasPrivilege}
            handleRestrictedClick={handleRestrictedAction}
          />
        </StyledHolidaysContainer>
      </AppMenu>

      {infoModal.open && (
        <InfoModal
          title={infoModal.title}
          titleDescription="¿Por qué está inhabilitado?"
          description={infoModal.description}
          onCloseModal={() =>
            setInfoModal({ open: false, title: "", description: "" })
          }
        />
      )}
    </>
  );
}

export { AbsencesOptionsUI };
