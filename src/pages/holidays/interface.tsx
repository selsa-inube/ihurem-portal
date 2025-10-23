import { useState } from "react";
import {
  MdAdd,
  MdOutlineInfo,
  MdOutlineWarningAmber,
  MdOutlineBeachAccess,
} from "react-icons/md";
import { Button, Stack, Tabs, ITab, Text, Icon } from "@inubekit/inubekit";
import { useNavigate } from "react-router-dom";

import { useAppContext } from "@context/AppContext/useAppContext";
import { AppMenu } from "@components/layout/AppMenu";
import { IRoute } from "@components/layout/AppMenu/types";
import { spacing } from "@design/tokens/spacing";
import { InfoModal } from "@components/modals/InfoModal";
import { capitalizeWords } from "@utils/texts";
import { contractTypeLabels } from "@mocks/contracts/enums";
import { useEmployee } from "@hooks/useEmployee";
import { Widget } from "@components/cards/Widget";
import { useEmployeeVacationDays } from "@hooks/useEmployeeVacationDays";

import { StyledHolidaysContainer } from "./styles";
import { HolidaysTable } from "./components/HolidaysTable";
import { DaysUsedTable } from "./components/DaysUsedTable";
import { IHolidaysTable } from "./components/HolidaysTable/types";
import { formatVacationHistory } from "./config/table.config";
import { Detail } from "./components/Detail";

interface HolidaysOptionsUIProps {
  appName: string;
  appRoute: IRoute[];
  navigatePage: string;
  tableData: IHolidaysTable[];
  isLoadingRequests: boolean;
  isMobile: boolean;
  appDescription?: string;
  hasActiveContract?: boolean;
  hasEnjoymentPrivilege?: boolean;
  hasPaymentPrivilege?: boolean;
  actionDescriptions?: Record<string, string>;
  handleDeleteRequest: (
    requestId: string,
    justification?: string,
  ) => boolean | void;
}

function HolidaysOptionsUI(props: HolidaysOptionsUIProps) {
  const {
    appName,
    appRoute,
    navigatePage,
    tableData,
    isLoadingRequests,
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
  const { employees } = useAppContext();
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

  const { employee, isLoading } = useEmployee(employees.employeeId);
  const contracts = employee?.employmentContracts ?? [];

  const { vacationDays, loadingDays } = useEmployeeVacationDays(
    employee?.employeeId ?? null,
  );

  const totalDays =
    vacationDays?.reduce((sum, contract) => sum + contract.pendingDays, 0) ?? 0;

  const tabs: ITab[] = [
    { id: "dias", label: "Días utilizados" },
    {
      id: "solicitudes",
      label: isMobile
        ? "Solicitudes en trámite"
        : "Solicitudes de vacaciones en trámite",
      icon: {
        appearance: "warning",
        icon: <MdOutlineWarningAmber />,
        size: "14px",
      },
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
      label="Días pendientes"
      value={totalDays}
      isLoading={loadingDays}
    />
  );

  const renderActions = () =>
    isMobile ? (
      <Stack direction="column" gap={spacing.s150}>
        {pendingDaysWidget}
        <Detail
          disableEnjoyment={!hasEnjoymentPrivilege || !hasActiveContract}
          disablePayment={!hasPaymentPrivilege || !hasActiveContract}
          actionDescriptions={actionDescriptions}
          hasTableData={tableData && tableData.length > 0}
          onRequestEnjoyment={() => {
            if (hasActiveContract && hasEnjoymentPrivilege) {
              void handleRequestEnjoyment();
            }
          }}
          onRequestPayment={() => {
            if (hasActiveContract && hasPaymentPrivilege) {
              void handleRequestPayment();
            }
          }}
          onInfoIconClick={(desc) => {
            void onOpenInfoModal(desc);
          }}
        />
      </Stack>
    ) : (
      <Stack gap={spacing.s150} justifyContent="end" direction="row">
        {pendingDaysWidget}
        <Stack gap={spacing.s025} alignItems="center">
          <Button
            spacing="wide"
            variant="filled"
            iconBefore={<MdAdd />}
            fullwidth={isMobile}
            disabled={!hasActiveContract || !hasEnjoymentPrivilege}
            onClick={() => {
              if (hasActiveContract && hasEnjoymentPrivilege) {
                void handleRequestEnjoyment();
              }
            }}
          >
            Agregar solicitud de disfrute
          </Button>
          {(!hasActiveContract || !hasEnjoymentPrivilege) && (
            <Icon
              icon={<MdOutlineInfo />}
              appearance="primary"
              size="16px"
              cursorHover
              onClick={() => {
                void onOpenInfoModal(actionDescriptions.enjoyment);
              }}
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
            onClick={() => {
              if (hasActiveContract && hasPaymentPrivilege) {
                void handleRequestPayment();
              }
            }}
          >
            Agregar solicitud de pago
          </Button>
          {(!hasActiveContract || !hasPaymentPrivilege) && (
            <Icon
              icon={<MdOutlineInfo />}
              appearance="primary"
              size="16px"
              cursorHover
              onClick={() => {
                void onOpenInfoModal(actionDescriptions.payment);
              }}
            />
          )}
        </Stack>
      </Stack>
    );

  const renderDaysUsedContent = () => {
    return (
      <StyledHolidaysContainer $isMobile={isMobile}>
        <Stack alignItems="center" justifyContent="space-between">
          <Text type="title" size="medium">
            Consulta de días utilizados
          </Text>
          {renderActions()}
        </Stack>
        {contracts.map((contract) => {
          const contractVacationData = formatVacationHistory([
            {
              ...employee,
              employmentContracts: [contract],
            },
          ]);

          return (
            <div key={contract.contractId}>
              {contracts.length > 1 && (
                <Text
                  type="title"
                  weight="bold"
                  size="small"
                  appearance="gray"
                  padding={`${spacing.s100} ${spacing.s0}`}
                >
                  {`${capitalizeWords(contract.businessName)} - ${
                    contractTypeLabels[contract.contractType] ??
                    contract.contractType
                  }`}
                </Text>
              )}
              <DaysUsedTable data={contractVacationData} loading={isLoading} />
            </div>
          );
        })}
      </StyledHolidaysContainer>
    );
  };

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
            {selectedTab === "solicitudes" ? (
              <StyledHolidaysContainer $isMobile={isMobile}>
                <Stack alignItems="center" justifyContent="space-between">
                  <Text type="title" size="medium">
                    Solicitudes en trámite
                  </Text>
                </Stack>
                <HolidaysTable
                  data={tableData}
                  loading={isLoadingRequests}
                  hasViewDetailsPrivilege
                  hasDeletePrivilege
                  handleDeleteRequest={handleDeleteRequest}
                />
              </StyledHolidaysContainer>
            ) : (
              renderDaysUsedContent()
            )}
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
