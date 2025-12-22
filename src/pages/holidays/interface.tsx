import { useState } from "react";
import {
  MdAdd,
  MdOutlineInfo,
  MdOutlineWarningAmber,
  MdOutlineBeachAccess,
} from "react-icons/md";
import { Button, Stack, Tabs, ITab, Text, Icon } from "@inubekit/inubekit";
import { useNavigate } from "react-router-dom";

import { labels } from "@i18n/labels";
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
import { useEmployeeVacationsUsed } from "@hooks/useEmployeeVacationsUsed";

import { StyledHolidaysContainer } from "./styles";
import { HolidaysTable } from "./components/HolidaysTable";
import { DaysUsedTable } from "./components/DaysUsedTable";
import { IHolidaysTable } from "./components/HolidaysTable/types";
import { formatVacationHistoryFromVacationsUsed } from "./config/table.config";
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
      enjoyment: labels.holidays.infoModal.enjoymentBlocked,
      payment: labels.holidays.infoModal.paymentBlocked,
    },
    handleDeleteRequest,
  } = props;

  const [selectedTab, setSelectedTab] = useState("dias");
  const navigate = useNavigate();

  const { contracts } = useAppContext();

  const [infoModal, setInfoModal] = useState({
    open: false,
    title: "",
    description: "",
  });

  const { employee, isLoading } = useEmployee(contracts[0]?.employeeId ?? null);

  const { vacationDays, loadingDays } = useEmployeeVacationDays(
    employee?.employeeId ?? null,
  );

  const { vacationsUsed, loadingVacations } = useEmployeeVacationsUsed({});

  const totalDays =
    vacationDays?.reduce((sum, contract) => sum + contract.pendingDays, 0) ?? 0;

  const tabs: ITab[] = [
    { id: "dias", label: labels.holidays.tabs.daysUsed },
    {
      id: "solicitudes",
      label: isMobile
        ? labels.holidays.tabs.requestsMobile
        : labels.holidays.tabs.requestsDesktop,
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
      title: labels.holidays.infoModal.title,
      description,
    });
  };

  const pendingDaysWidget = (
    <Widget
      icon={<MdOutlineBeachAccess />}
      label={labels.holidays.widget.pendingDays}
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
          hasTableData={tableData?.length > 0}
          onRequestEnjoyment={() => {
            if (hasActiveContract && hasEnjoymentPrivilege) {
              handleRequestEnjoyment();
            }
          }}
          onRequestPayment={() => {
            if (hasActiveContract && hasPaymentPrivilege) {
              handleRequestPayment();
            }
          }}
          onInfoIconClick={onOpenInfoModal}
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
            disabled={!hasActiveContract || !hasEnjoymentPrivilege}
            onClick={() => {
              void handleRequestEnjoyment();
            }}
          >
            {labels.holidays.actions.enjoyment}
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
            disabled={!hasActiveContract || !hasPaymentPrivilege}
            onClick={() => {
              void handleRequestPayment();
            }}
          >
            {labels.holidays.actions.payment}
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
      </Stack>
    );

  const renderDaysUsedContent = () => (
    <StyledHolidaysContainer $isMobile={isMobile}>
      <Stack alignItems="center" justifyContent="space-between">
        <Text type="title" size="medium">
          {labels.holidays.daysUsed.title}
        </Text>
        {renderActions()}
      </Stack>

      {contracts.map((contract) => {
        const contractVacations = vacationsUsed?.filter(
          (v) => String(v.contractId) === String(contract.contractId),
        );

        const contractVacationData = formatVacationHistoryFromVacationsUsed(
          contractVacations ?? [],
          contract,
        );

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

            <DaysUsedTable
              data={contractVacationData}
              loading={isLoading ?? loadingVacations}
            />
          </div>
        );
      })}
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
        {!tableData?.length ? (
          renderDaysUsedContent()
        ) : (
          <>
            <Tabs
              tabs={tabs}
              selectedTab={selectedTab}
              onChange={setSelectedTab}
              scroll={false}
            />

            {selectedTab === "solicitudes" ? (
              <StyledHolidaysContainer $isMobile={isMobile}>
                <Stack alignItems="center" justifyContent="space-between">
                  <Text type="title" size="medium">
                    {labels.holidays.inProgress.title}
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
