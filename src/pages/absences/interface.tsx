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
import { labels } from "@i18n/labels";

import { StyledAbsencesContainer } from "./styles";
import { AbsencesTable } from "./components/AbsenscesTable";
import { AbsencesProcedureTable } from "./components/AbsencesProcedureTable";
import { AbsenceDetail } from "./components/Detail";
import { IAbsencesTable } from "./components/AbsenscesTable/types";
import { IAbsencesProcedureTable } from "./components/AbsencesProcedureTable/types";

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

  requestsData: IAbsencesProcedureTable[];
  requestsLoading: boolean;
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
      absence: labels.absences.ui.restrictions.noPrivilegeOrContract,
    },
    handleDeleteRequest,
    data,
    loading,
    requestsData,
    requestsLoading,
  } = props;

  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [selectedTab, setSelectedTab] = useState("reportadas");

  const [infoModal, setInfoModal] = useState({
    open: false,
    title: "",
    description: "",
  });

  const onOpenInfoModal = (description: string) => {
    setInfoModal({
      open: true,
      title: labels.absences.ui.actions.restrictedActionTitle,
      description,
    });
  };

  const handleRestrictedAction = () => {
    onOpenInfoModal(labels.absences.ui.actions.restrictedAction);
  };

  const addRequest = () => navigate("/absences/report-absence");

  const tabs: ITab[] = [
    {
      id: "reportadas",
      label: isMobile
        ? labels.absences.ui.tabs.reportedMobile
        : labels.absences.ui.tabs.reportedDesktop,
    },
    {
      id: "solicitudes",
      label: isMobile
        ? labels.absences.ui.tabs.requestsMobile
        : labels.absences.ui.tabs.requestsDesktop,
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
            {labels.absences.ui.actions.reportAbsenceButton}
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
    <StyledAbsencesContainer $isMobile={isMobile}>
      <Stack
        alignItems="center"
        justifyContent="space-between"
        padding={spacing.s200}
      >
        <Text type="title" size="medium">
          {labels.absences.ui.sections.reportedAbsencesTitle}
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
    </StyledAbsencesContainer>
  );

  const renderAbsenceRequests = () => (
    <StyledAbsencesContainer $isMobile={isMobile}>
      <Stack
        alignItems="center"
        justifyContent="space-between"
        padding={spacing.s200}
      >
        <Text type="title" size="medium">
          {labels.absences.ui.sections.requestsTitle}
        </Text>

        {isMobile && (
          <Stack direction="column" gap={spacing.s150}>
            <AbsenceDetail
              disableAbsence={!hasPrivilege || !hasActiveContract}
              actionDescriptions={actionDescriptions}
              hasTableData={requestsData.length > 0}
              onRequestAbsence={() => {
                void addRequest();
              }}
              onInfoIconClick={(desc) => onOpenInfoModal(desc)}
            />
          </Stack>
        )}
      </Stack>

      <AbsencesProcedureTable
        data={requestsData}
        loading={requestsLoading}
        hasViewDetailsPrivilege={hasPrivilege}
        hasUploadPrivilege={hasPrivilege}
        handleDeleteRequest={handleDeleteRequest}
      />
    </StyledAbsencesContainer>
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
          titleDescription={labels.absences.ui.actions.infoTitleDescription}
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
