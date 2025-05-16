import { useState } from "react";
import { Button, Stack, Text, Icon } from "@inubekit/inubekit";
import { MdAdd, MdOutlineInfo } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { AppMenu } from "@components/layout/AppMenu";
import { IRoute } from "@components/layout/AppMenu/types";
import { spacing } from "@design/tokens/spacing/spacing";
import { InfoModal } from "@components/modals/InfoModal";

import { Detail } from "./components/CertificationsTable/Detail";
import { StyledCertificationsContainer } from "./styles";
import { CertificationsTable } from "./components/CertificationsTable";
import { ICertificationsTable } from "./components/CertificationsTable/types";

interface CertificationsOptionsUIProps {
  appName: string;
  appRoute: IRoute[];
  navigatePage: string;
  tableData: ICertificationsTable[];
  isLoading: boolean;
  isMobile: boolean;
  appDescription?: string;
  hasActiveContract?: boolean;
  hasPrivilege?: boolean;
  hasPaymentPrivilege?: boolean;
  actionDescriptions?: Record<string, string>;
  handleDeleteRequest: (requestId: string, justification: string) => void;
}

function CertificationsOptionsUI(props: CertificationsOptionsUIProps) {
  const {
    appName,
    appRoute,
    navigatePage,
    tableData,
    isMobile,
    isLoading,
    appDescription,
    hasActiveContract = true,
    hasPrivilege = true,
    actionDescriptions = {
      application:
        "No se puede solicitar la certificación, ya que no tiene un contrato activo o no cuenta con los privilegios necesarios.",
    },
    handleDeleteRequest,
  } = props;
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

  const addRequest = () => navigate("/certifications/new-certification");

  const onOpenInfoModal = (description: string) => {
    setInfoModal({
      open: true,
      title: "Acción inhabilitada",
      description,
    });
  };

  const renderActions = () =>
    isMobile ? (
      <Detail
        disableEnjoyment={!hasPrivilege || !hasActiveContract}
        actionDescriptions={actionDescriptions}
        onRequestEnjoyment={addRequest}
        onInfoIconClick={onOpenInfoModal}
      />
    ) : (
      <Stack
        gap={spacing.s150}
        justifyContent="end"
        direction={isMobile ? "column" : "row"}
      >
        <Stack gap={spacing.s025} alignItems="center">
          <Button
            spacing="wide"
            variant="filled"
            iconBefore={<MdAdd />}
            fullwidth={isMobile}
            disabled={!hasActiveContract || !hasPrivilege}
            onClick={hasActiveContract && hasPrivilege ? addRequest : undefined}
          >
            Agregar solicitud
          </Button>
          {(!hasActiveContract || !hasPrivilege) && (
            <Icon
              icon={<MdOutlineInfo />}
              appearance="primary"
              size="16px"
              cursorHover
              onClick={() => onOpenInfoModal(actionDescriptions.enjoyment)}
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
        <StyledCertificationsContainer $isMobile={isMobile}>
          <Stack justifyContent="space-between" alignItems="center">
            <Text type="title" size="medium">
              Consulta de certificaciones en trámite
            </Text>
            {renderActions()}
          </Stack>
          <CertificationsTable
            data={tableData}
            loading={isLoading}
            hasDeletePrivilege
            hasViewDetailsPrivilege
            handleDeleteRequest={handleDeleteRequest}
          />
        </StyledCertificationsContainer>
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

export { CertificationsOptionsUI };
