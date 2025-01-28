import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";
import {
  Icon,
  Text,
  Stack,
  Button,
  Blanket,
  Divider,
  useMediaQuery,
} from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing/spacing";

import {
  StyledModal,
  StyledContainerContent,
  StyledContainerClose,
  StyledContainerTitle,
} from "./styles";
import { PendingVacationDaysTable } from "../../components/PendingVacationDaysTable";
import { IPendingVacationDaysTable } from "../../components/PendingVacationDaysTable/types";

export interface IPendingHolidaysModalProps {
  totalDays: number;
  tableData: IPendingVacationDaysTable[];
  portalId?: string;
  loading?: boolean;
  handleClose: () => void;
}

export function PendingHolidaysModal(props: IPendingHolidaysModalProps) {
  const {
    totalDays,
    tableData,
    portalId = "portal",
    loading,
    handleClose,
  } = props;
  const portalNode = document.getElementById(portalId);

  if (!portalNode) {
    throw new Error(
      `El nodo del portal con id "${portalId}" no está definido. Asegúrate de que existe en el DOM.`,
    );
  }

  const isMobile = useMediaQuery("(max-width: 700px)");

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <StyledContainerTitle>
          <Text type="headline" size="small">
            Días por disfrutar
          </Text>
          <StyledContainerClose onClick={handleClose}>
            <Stack alignItems="center" gap={spacing.s100}>
              <Text>Cerrar</Text>
              <Icon
                icon={<MdClear />}
                size={spacing.s300}
                appearance="dark"
                cursorHover
              />
            </Stack>
          </StyledContainerClose>
        </StyledContainerTitle>
        <Divider />
        <StyledContainerContent $smallScreen={isMobile}>
          <Stack justifyContent="center" alignItems="center" gap={spacing.s100}>
            <Text size="small">Días por disfrutar a la fecha:</Text>
            <Text type="title" size="large" appearance="primary" weight="bold">
              {totalDays}
            </Text>
          </Stack>
          <PendingVacationDaysTable data={tableData} loading={loading} />
        </StyledContainerContent>
        <Stack
          justifyContent="flex-end"
          margin={`${spacing.s200} ${spacing.s0}`}
          gap={spacing.s100}
        >
          <Button onClick={handleClose} fullwidth={isMobile}>
            Cerrar
          </Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    portalNode,
  );
}
