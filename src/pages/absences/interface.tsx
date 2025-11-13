import { useState } from "react";
import {
  Button,
  Stack,
  useMediaQuery,
  Text,
  Icon,
  Tabs,
  ITab,
} from "@inubekit/inubekit";
import { MdAdd, MdOutlineInfo, MdOutlineWarningAmber } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { InfoModal } from "@components/modals/InfoModal";
import { AppMenu } from "@components/layout/AppMenu";
import { IRoute } from "@components/layout/AppMenu/types";
import { spacing } from "@design/tokens/spacing";
import { ERequestType } from "@ptypes/humanResourcesRequest.types";
import { useHumanResourceRequests } from "@hooks/useHumanResourceRequests";

import { StyledHolidaysContainer } from "./styles";
import { AbsencesTable } from "./components/AbsenscesTable";
import { AbsencesProcedureTable } from "./components/AbsencesProcedureTable";
import { mockAbsencesData } from "./components/tableMock/tableMock";
import { AbsenceDetail } from "./components/Detail";
import { formatAbsenceRequests } from "./config/table.config";

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
    handleDeleteRequest,
  } = props;

  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [selectedTab, setSelectedTab] = useState("reportadas");

  const [infoModal, setInfoModal] = useState({
    open: false,
    title: "",
    description: "",
  });

  const { data: absencesRequests, isLoading: isLoadingRequests } =
    useHumanResourceRequests(formatAbsenceRequests, ERequestType.absence);

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

  const tabs: ITab[] = [
    { id: "reportadas", label: "Ausencias reportadas" },
    {
      id: "solicitudes",
      label: isMobile
        ? "Solicitudes en trámite"
        : "Solicitudes de ausencias en trámite",
      icon: {
        appearance: "warning",
        icon: <MdOutlineWarningAmber />,
        size: "14px",
      },
    },
  ];

  const renderActions = () =>
    isMobile ? (
      <Stack direction="column" gap={spacing.s150}>
        <AbsenceDetail
          disableAbsence={!hasPrivilege || !hasActiveContract}
          actionDescriptions={actionDescriptions}
          hasTableData={mockAbsencesData.length > 0}
          onRequestAbsence={() => {
            void addRequest();
          }}
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

  const renderReportedAbsences = () => (
    <StyledHolidaysContainer $isMobile={isMobile}>
      <Stack alignItems="center" justifyContent="space-between">
        <Text type="title" size="medium">
          Ausencias reportadas
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
  );

  const renderAbsenceRequests = () => (
    <StyledHolidaysContainer $isMobile={isMobile}>
      <Stack alignItems="center" justifyContent="space-between">
        <Text type="title" size="medium">
          Solicitudes de ausencias en trámite
        </Text>
      </Stack>

      <AbsencesProcedureTable
        data={absencesRequests}
        loading={isLoadingRequests}
        hasViewDetailsPrivilege={hasPrivilege}
        hasUploadPrivilege={hasPrivilege}
        handleDeleteRequest={handleDeleteRequest}
      />
    </StyledHolidaysContainer>
  );

  return (
    <>
      <AppMenu
        appName={appName}
        appDescription={appDescription}
        appRoute={appRoute}
        navigatePage={navigatePage}
      >
        <Tabs
          tabs={tabs}
          selectedTab={selectedTab}
          onChange={(tabId) => setSelectedTab(tabId)}
          scroll={false}
        />

        {selectedTab === "reportadas"
          ? renderReportedAbsences()
          : renderAbsenceRequests()}
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
