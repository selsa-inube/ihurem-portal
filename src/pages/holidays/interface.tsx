import { useState } from "react";
import { MdAdd, MdOutlineInfo } from "react-icons/md";
import { Button, Stack, Tabs, ITab, Text, Icon } from "@inubekit/inubekit";
import { useNavigate } from "react-router-dom";
import { MdOutlineBeachAccess } from "react-icons/md";

import { AppMenu } from "@components/layout/AppMenu";
import { IRoute } from "@components/layout/AppMenu/types";
import { spacing } from "@design/tokens/spacing/spacing";
import { InfoModal } from "@components/modals/InfoModal";
import { Widget } from "@components/cards/Widget";

import { StyledHolidaysContainer } from "./styles";
import { HolidaysTable } from "./components/HolidaysTable";
import { DaysUsedTable } from "./components/DaysUsedTable";
import { IHolidaysTable } from "./components/HolidaysTable/types";
import { daysUsedMock } from "./config/table.config";
import { Detail } from "./components/Detail";

interface HolidaysOptionsUIProps {
  appName: string;
  appRoute: IRoute[];
  navigatePage: string;
  tableData: IHolidaysTable[];
  isLoading: boolean;
  isMobile: boolean;
  appDescription?: string;
  hasActiveContract?: boolean;
  hasEnjoymentPrivilege?: boolean;
  hasPaymentPrivilege?: boolean;
  actionDescriptions?: Record<string, string>;
  handleDeleteRequest: (requestId: string, justification: string) => void;
}

function HolidaysOptionsUI(props: HolidaysOptionsUIProps) {
  const {
    appName,
    appRoute,
    navigatePage,
    tableData,
    isLoading,
    isMobile,
    appDescription,
    hasActiveContract = true,
    hasEnjoymentPrivilege = true,
    hasPaymentPrivilege = true,
    actionDescriptions = {
      enjoyment:
        "No se puede solicitar disfrute de vacaciones, ya que no tiene un contrato activo o no cuenta con los privilegios necesarios.",
      payment:
        "No se puede solicitar pago de vacaciones, ya que no tiene un contrato activo o no cuenta con los privilegios necesarios.",
    },
    handleDeleteRequest,
  } = props;

  const [selectedTab, setSelectedTab] = useState("dias");
  const navigate = useNavigate();
  const [infoModal, setInfoModal] = useState<{
    open: boolean;
    title: string;
    description: string;
  }>({
    open: false,
    title: "",
    description: "",
  });

  const tabs: ITab[] = [
    { id: "dias", label: "Días utilizados" },
    {
      id: "solicitudes",
      label: isMobile
        ? "Solicitudes en trámite"
        : "Solicitudes de vacaciones en trámite",
    },
  ];

  const handleRequestEnjoyment = () => navigate("/holidays/request-enjoyment");
  const handleRequestPayment = () => navigate("/holidays/request-payment");

  const onOpenInfoModal = (description: string) => {
    setInfoModal({
      open: true,
      title: "Acción inhabilitada",
      description,
    });
  };

  const pendingDaysWidget = (
    <Widget
      icon={<MdOutlineBeachAccess />}
      value={22}
      label="Días pendientes"
    />
  );

  const renderActionButtons = () => (
    <>
      <Stack gap={spacing.s025} alignItems="center">
        <Button
          spacing="wide"
          variant="filled"
          iconBefore={<MdAdd />}
          fullwidth={isMobile}
          disabled={!hasActiveContract || !hasEnjoymentPrivilege}
          onClick={
            hasActiveContract && hasEnjoymentPrivilege
              ? handleRequestEnjoyment
              : undefined
          }
        >
          Solicitar disfrute
        </Button>
        {(!hasActiveContract || !hasEnjoymentPrivilege) && (
          <Icon
            icon={<MdOutlineInfo />}
            appearance="primary"
            size="16px"
            cursorHover
            onClick={() => onOpenInfoModal(actionDescriptions.enjoyment)}
          />
        )}
      </Stack>
      <Stack gap={spacing.s025} alignItems="center">
        <Button
          spacing="wide"
          variant="filled"
          iconBefore={<MdAdd />}
          fullwidth={isMobile}
          disabled={!hasActiveContract || !hasPaymentPrivilege}
          onClick={
            hasActiveContract && hasPaymentPrivilege
              ? handleRequestPayment
              : undefined
          }
        >
          Solicitar pago
        </Button>
        {(!hasActiveContract || !hasPaymentPrivilege) && (
          <Icon
            icon={<MdOutlineInfo />}
            appearance="primary"
            size="16px"
            cursorHover
            onClick={() => onOpenInfoModal(actionDescriptions.payment)}
          />
        )}
      </Stack>
    </>
  );

  const renderDaysUsedActions = () =>
    isMobile ? (
      <Stack direction="column" gap={spacing.s150}>
        {pendingDaysWidget}
        <Detail
          disableEnjoyment={!hasEnjoymentPrivilege || !hasActiveContract}
          disablePayment={!hasPaymentPrivilege || !hasActiveContract}
          actionDescriptions={actionDescriptions}
          showTabs={tableData && tableData.length > 0}
          isUsedDaysTab={true}
          onRequestEnjoyment={handleRequestEnjoyment}
          onRequestPayment={handleRequestPayment}
          onInfoIconClick={onOpenInfoModal}
        />
      </Stack>
    ) : (
      <Stack gap={spacing.s150} justifyContent="end" direction="row">
        {pendingDaysWidget}
        {renderActionButtons()}
      </Stack>
    );

  const renderHolidaysTableActions = () =>
    isMobile ? (
      <Stack direction="column" gap={spacing.s150}>
        <Detail
          disableEnjoyment={!hasEnjoymentPrivilege || !hasActiveContract}
          disablePayment={!hasPaymentPrivilege || !hasActiveContract}
          actionDescriptions={actionDescriptions}
          showTabs={tableData && tableData.length > 0}
          isUsedDaysTab={false}
          onRequestEnjoyment={handleRequestEnjoyment}
          onRequestPayment={handleRequestPayment}
          onInfoIconClick={onOpenInfoModal}
        />
      </Stack>
    ) : (
      <Stack gap={spacing.s150} justifyContent="end" direction="row">
        {renderActionButtons()}
      </Stack>
    );

  const renderDaysUsedContent = () => (
    <StyledHolidaysContainer $isMobile={isMobile}>
      <Stack alignItems="center" justifyContent="space-between">
        <Text type="title" size="medium">
          Consulta de días utilizados
        </Text>
        {renderDaysUsedActions()}
      </Stack>
      <DaysUsedTable data={daysUsedMock} />
    </StyledHolidaysContainer>
  );

  const renderHolidaysTableContent = () => (
    <StyledHolidaysContainer $isMobile={isMobile}>
      <Stack alignItems="center" justifyContent="space-between">
        <Text type="title" size="medium">
          Solicitudes en trámite
        </Text>
        {renderHolidaysTableActions()}
      </Stack>
      <HolidaysTable
        data={tableData}
        loading={isLoading}
        hasViewDetailsPrivilege
        hasDeletePrivilege
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
        {!tableData || tableData.length === 0 ? (
          renderDaysUsedContent()
        ) : (
          <>
            <Tabs
              tabs={tabs}
              selectedTab={selectedTab}
              onChange={(tabId) => setSelectedTab(tabId)}
              scroll={false}
            />
            {selectedTab === "solicitudes"
              ? renderHolidaysTableContent()
              : renderDaysUsedContent()}
          </>
        )}
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

export { HolidaysOptionsUI };
