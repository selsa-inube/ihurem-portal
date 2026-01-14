import {
  Text,
  Divider,
  Stack,
  Button,
  useMediaQuery,
  Spinner,
} from "@inubekit/inubekit";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { labels } from "@i18n/labels";
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
}

function HolidaysConfirmationForm({
  humanResourceRequestId,
  userWhoExecutedAction,
}: HolidaysConfirmationFormProps) {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);

  const [responseConfig, setResponseConfig] = useState<{
    isRequestSent?: boolean;
    title: string;
    description: string;
  }>({
    isRequestSent: false,
    title: "",
    description: "",
  });

  const isMobile = useMediaQuery("(max-width: 880px)");

  const { submitApproval, isLoading: isSubmitting } =
    useApprovalHumanResourceRequestAPI();

  const { data: pendingVacationDays, isLoading: pendingLoading } =
    humanResourceRequestId
      ? usePendingVacationDaysByRequest(humanResourceRequestId)
      : { data: null, isLoading: false };

  const first =
    pendingVacationDays && pendingVacationDays.length > 0
      ? pendingVacationDays[0]
      : null;

  const employeeFullName =
    `${first?.employeeName ?? ""} ${first?.employeeSurname ?? ""}`.trim();

  const periodFrom = first ? formatDate(first.periodFrom) : "";
  const periodTo = first ? formatDate(first.periodTo) : "";

  const realTaskManagingId = first?.taskManagingId ?? "";
  const hasConfirmTask = first?.taskCode === "confirm_vacation_completion";

  const handleSubmit = async (values: { textarea: string }) => {
    if (!humanResourceRequestId || !realTaskManagingId) return;

    const result = await submitApproval({
      humanResourceRequestId,
      taskManagingId: realTaskManagingId,
      actionExecuted: ApprovalAction.CANCEL_REQUEST,
      description: values.textarea,
      userWhoExecutedAction,
    });

    setIsModalOpen(false);

    setResponseConfig(
      result.success
        ? {
            isRequestSent: true,
            title: labels.holidays.confirmationForm.responses.objectionSent,
            description:
              labels.holidays.confirmationForm.responses
                .objectionSentDescription,
          }
        : {
            isRequestSent: false,
            title: labels.holidays.confirmationForm.responses.objectionError,
            description:
              labels.holidays.confirmationForm.responses
                .objectionErrorDescription,
          },
    );

    setIsResponseModalOpen(true);
  };

  const handleConfirm = async () => {
    if (!humanResourceRequestId || !realTaskManagingId || !hasConfirmTask) {
      setResponseConfig({
        isRequestSent: false,
        title: labels.holidays.confirmationForm.responses.confirmationError,
        description: labels.holidays.confirmationForm.responses.taskNotFound,
      });

      setIsResponseModalOpen(true);
      return;
    }

    const result = await submitApproval({
      humanResourceRequestId,
      taskManagingId: realTaskManagingId,
      actionExecuted: ApprovalAction.CONFIRM_PERIOD,
      description: labels.holidays.confirmationForm.confirmationDescription,
      userWhoExecutedAction,
    });

    setResponseConfig(
      result.success
        ? {
            isRequestSent: true,
            title: labels.holidays.confirmationForm.responses.confirmationSent,
            description:
              labels.holidays.confirmationForm.responses
                .confirmationSentDescription,
          }
        : {
            isRequestSent: false,
            title: labels.holidays.confirmationForm.responses.confirmationError,
            description:
              labels.holidays.confirmationForm.responses
                .confirmationErrorDescription,
          },
    );

    setIsResponseModalOpen(true);
  };

  const handleCloseResponseModal = () => {
    setIsResponseModalOpen(false);

    if (responseConfig.isRequestSent) {
      navigate("/");
    }
  };

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
        {labels.holidays.confirmationForm.title}
      </Text>

      <Divider dashed />

      <StyledDescriptionContainer>
        <Text>
          {labels.holidays.confirmationForm.confirmationText}{" "}
          {capitalizeWords(employeeFullName)}{" "}
          {labels.holidays.confirmationForm.confirmationTextContinuation}
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
          <Text>{labels.holidays.confirmationForm.periodConnector}</Text>
          <Text type="title" weight="bold" size="large">
            {periodTo}
          </Text>
        </Stack>
      </StyledDescriptionContainer>

      <Stack gap={spacing.s250} justifyContent="flex-end" width="100%">
        <Button
          appearance="danger"
          variant="outlined"
          onClick={() => setIsModalOpen(true)}
          disabled={isSubmitting}
        >
          {labels.holidays.confirmationForm.buttons.object}
        </Button>

        <Button
          onClick={() => void handleConfirm()}
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          {labels.holidays.confirmationForm.buttons.confirm}
        </Button>
      </Stack>

      {isModalOpen && (
        <TextAreaModal
          title={labels.holidays.objectModal.title}
          buttonText={labels.holidays.objectModal.buttonText}
          inputLabel={labels.holidays.objectModal.inputLabel}
          inputPlaceholder={labels.holidays.objectModal.inputPlaceholder}
          maxLength={500}
          description={labels.holidays.objectModal.description}
          onSubmit={handleSubmit}
          onCloseModal={() => setIsModalOpen(false)}
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
