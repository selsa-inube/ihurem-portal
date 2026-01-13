import {
  Text,
  Divider,
  Stack,
  Button,
  useMediaQuery,
  Spinner,
} from "@inubekit/inubekit";
import { useState } from "react";

import { spacing } from "@design/tokens/spacing";
import { TextAreaModal } from "@components/modals/TextAreaModal";
import { ResponseSuccesModal } from "@components/modals/ResponseSuccesModal";
import { usePendingVacationDaysByRequest } from "@hooks/usePendingVacationDaysByRequest";
import { useApprovalHumanResourceRequestAPI } from "@hooks/useApprovalHumanResourceRequestAPI";
import { ApprovalAction } from "@services/employeeConsultation/postApprovalHumanResourceRequest/types";
import { formatDate } from "@utils/date";
import { capitalizeWords } from "@utils/texts";

import {
  StyledHolidaysConfirmationFormContainer,
  StyledDescriptionContainer,
} from "./styles";

interface HolidaysConfirmationFormProps {
  humanResourceRequestId: string;
  userWhoExecutedAction: string;
  taskManagingId: string;
}

function HolidaysConfirmationForm(props: HolidaysConfirmationFormProps) {
  const { humanResourceRequestId, userWhoExecutedAction, taskManagingId } =
    props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);

  const [responseConfig, setResponseConfig] = useState<{
    isRequestSent?: boolean;
    title: string;
    description: string;
  }>({ isRequestSent: true, title: "", description: "" });

  const isMobile = useMediaQuery("(max-width: 880px)");

  const { submitApproval, isLoading: isSubmitting } =
    useApprovalHumanResourceRequestAPI();

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (values: { textarea: string }) => {
    const result = await submitApproval({
      humanResourceRequestId,
      taskManagingId,
      actionExecuted: ApprovalAction.CONFIRM_PERIOD,
      description: values.textarea,
      userWhoExecutedAction,
    });

    setIsModalOpen(false);

    if (result.success) {
      setResponseConfig({
        isRequestSent: true,
        title: "Objeción enviada",
        description: "¡La solicitud de objeción ha sido enviada exitosamente!",
      });
    } else {
      setResponseConfig({
        isRequestSent: false,
        title: "Error al enviar objeción",
        description:
          "No se pudo enviar la objeción. Por favor, intenta nuevamente.",
      });
    }

    setIsResponseModalOpen(true);
  };

  const handleConfirm = async () => {
    const result = await submitApproval({
      humanResourceRequestId,
      taskManagingId,
      actionExecuted: ApprovalAction.CONFIRM_PERIOD,
      description: "Confirmación del periodo de disfrute de vacaciones",
      userWhoExecutedAction,
    });

    if (result.success) {
      setResponseConfig({
        isRequestSent: true,
        title: "Confirmación enviada",
        description:
          "¡La confirmación del periodo de vacaciones fue enviada exitosamente!",
      });
    } else {
      setResponseConfig({
        isRequestSent: false,
        title: "Error al confirmar",
        description:
          "No se pudo confirmar el periodo. Por favor, intenta nuevamente.",
      });
    }

    setIsResponseModalOpen(true);
  };

  const handleCloseResponseModal = () => {
    setIsResponseModalOpen(false);
  };

  const { data: pendingVacationDays, isLoading: pendingLoading } =
    usePendingVacationDaysByRequest(humanResourceRequestId);

  const first =
    pendingVacationDays && pendingVacationDays.length > 0
      ? pendingVacationDays[0]
      : null;

  const employeeFullName = first
    ? `${first.employeeName} ${first.employeeSurname}`
    : "";

  const periodFrom = first ? formatDate(first.periodFrom) : "";
  const periodTo = first ? formatDate(first.periodTo) : "";

  if (pendingLoading) {
    return (
      <Stack alignItems="center" direction="column">
        <Spinner size="large" />
      </Stack>
    );
  }

  return (
    <StyledHolidaysConfirmationFormContainer $isMobile={isMobile}>
      <Text type="title" weight="bold" textAlign="center">
        Constancia de disfrute vacaciones
      </Text>

      <Divider dashed />

      <StyledDescriptionContainer>
        <Text>
          Yo, {capitalizeWords(employeeFullName)} confirmo que he disfrutado el
          periodo de vacaciones de:
        </Text>

        <Stack
          gap={spacing.s100}
          alignItems="center"
          justifyContent="center"
          width="100%"
          direction={isMobile ? "column" : "row"}
        >
          <Text type="title" weight="bold" size="large">
            {periodFrom}
          </Text>
          <Text>a</Text>
          <Text type="title" weight="bold" size="large">
            {periodTo}
          </Text>
        </Stack>
      </StyledDescriptionContainer>

      <Stack gap={spacing.s250} justifyContent="flex-end" width="100%">
        <Button
          appearance="danger"
          variant="outlined"
          onClick={handleOpen}
          disabled={isSubmitting}
        >
          Objetar
        </Button>

        <Button
          onClick={() => void handleConfirm()}
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          Confirmar
        </Button>
      </Stack>

      {isModalOpen && (
        <TextAreaModal
          title="Objetar"
          buttonText="Objetar"
          inputLabel="Observaciones"
          inputPlaceholder="Proporciona detalles acerca de la objeción de la constancia"
          maxLength={500}
          description="Describe el motivo por el cual deseas objetar la constancia de disfrute de vacaciones."
          onSubmit={handleSubmit}
          onCloseModal={handleClose}
        />
      )}

      {isResponseModalOpen && (
        <ResponseSuccesModal
          isRequestSent={responseConfig.isRequestSent}
          title={responseConfig.title}
          description={responseConfig.description}
          onCloseModal={handleCloseResponseModal}
        />
      )}
    </StyledHolidaysConfirmationFormContainer>
  );
}

export { HolidaysConfirmationForm };
