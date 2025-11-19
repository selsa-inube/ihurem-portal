import { useState } from "react";
import { Button, Stack, useMediaQuery, Text, Icon } from "@inubekit/inubekit";
import { MdAdd, MdOutlineInfo } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { InfoModal } from "@components/modals/InfoModal";
import { AppMenu } from "@components/layout/AppMenu";
import { IRoute } from "@components/layout/AppMenu/types";
import { spacing } from "@design/tokens/spacing";
import { StyledHolidaysContainer } from "./styles";
import { AbsencesTable } from "./components/AbsenscesTable";
import { IAbsencesTable } from "./components/AbsenscesTable/types";

interface AbsencesOptionsUIProps {
  appName: string;
  appDescription?: string;
  navigatePage: string;
  appRoute: IRoute[];
  hasActiveContract?: boolean;
  hasPrivilege?: boolean;
  actionDescriptions?: Record<string, string>;
  handleDeleteRequest: (requestId: string, justification: string) => void;
  data: IAbsencesTable[];
  loading: boolean;
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
    data,
    loading,
  } = props;

  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [infoModal, setInfoModal] = useState({
    open: false,
    title: "",
    description: "",
  });

  const handleRestrictedAction = () => {
    onOpenInfoModal("No tienes permisos para realizar esta acción.");
  };

  const addRequest = () => navigate("/absences/report-absence");

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
        <Button
          spacing="wide"
          variant="filled"
          iconBefore={<MdAdd />}
          fullwidth
        >
          Reportar ausencia
        </Button>
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
            onClick={() => {
              if (hasActiveContract && hasPrivilege) {
                void addRequest();
              }
            }}
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
            data={data}
            loading={loading}
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
