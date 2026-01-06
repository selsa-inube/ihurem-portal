import {
  Text,
  Divider,
  Stack,
  Button,
  useMediaQuery,
} from "@inubekit/inubekit";
import { useState } from "react";

import { spacing } from "@design/tokens/spacing";
import { TextAreaModal } from "@components/modals/TextAreaModal";
import { ResponseSuccesModal } from "@components/modals/ResponseSuccesModal";

import {
  StyledHolidaysConfirmationFormContainer,
  StyledDescriptionContainer,
} from "./styles";

function HolidaysConfirmationForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedObjection, setSubmittedObjection] = useState<string | null>(
    null,
  );
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
  const [responseConfig, setResponseConfig] = useState<{
    isRequestSent?: boolean;
    title: string;
    description: string;
  }>({ isRequestSent: true, title: "", description: "" });

  const isMobile = useMediaQuery("(max-width: 880px)");

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const handleSubmit = (values: { textarea: string }) => {
    setSubmittedObjection(values.textarea);
    setIsModalOpen(false);
    setResponseConfig({
      isRequestSent: true,
      title: "Objeción enviada",
      description: "¡La solicitud de objeción ha sido enviada!",
    });
    setIsResponseModalOpen(true);
  };

  const handleConfirm = () => {
    setResponseConfig({
      isRequestSent: true,
      title: "Respuesta enviada",
      description: "¡La respuesta fue recibida!",
    });
    setIsResponseModalOpen(true);
  };

  console.log(submittedObjection);

  const handleCloseResponseModal = () => setIsResponseModalOpen(false);

  return (
    <StyledHolidaysConfirmationFormContainer $isMobile={isMobile}>
      <Text type="title" weight="bold" textAlign="center">
        Constancia de disfrute vacaciones
      </Text>
      <Divider dashed />
      <StyledDescriptionContainer>
        <Text>
          Yo, Sergio Andrés Nieto Alba confirmo que he disfrutado el periodo de
          vacaciones de:
        </Text>
        <Stack
          gap={spacing.s100}
          alignItems="center"
          justifyContent="center"
          width="100%"
          direction={isMobile ? "column" : "row"}
        >
          <Text type="title" weight="bold" size="large">
            02/Dic/2025
          </Text>
          <Text>a</Text>
          <Text type="title" weight="bold" size="large">
            02/Dic/2025
          </Text>
        </Stack>
      </StyledDescriptionContainer>
      <Stack gap={spacing.s250} justifyContent="flex-end" width="100%">
        <Button appearance="danger" variant="outlined" onClick={handleOpen}>
          Objetar
        </Button>
        <Button onClick={handleConfirm}>Confirmar</Button>
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
