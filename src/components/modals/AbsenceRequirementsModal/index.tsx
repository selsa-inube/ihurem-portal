import React, { useState } from "react";
import {
  Icon,
  Text,
  Stack,
  Button,
  Blanket,
  Divider,
  useMediaQuery,
} from "@inubekit/inubekit";
import {
  MdClear,
  MdOutlineVisibility,
  MdOutlineCheckCircle,
} from "react-icons/md";
import { createPortal } from "react-dom";

import { labels } from "@i18n/labels";
import CheckIcon from "@assets/images/CheckIcon.svg";
import CloseIcon from "@assets/images/CloseIcon.svg";
import HelpIcon from "@assets/images/HelpIcon.svg";
import { spacing } from "@design/tokens/spacing";
import { TableBoard } from "@components/data/TableBoard";
import {
  IEntries,
  IAction,
  Requirement,
} from "@components/data/TableBoard/types";
import { InfoModal } from "@components/modals/InfoModal";

import {
  StyledContainerClose,
  StyledContainerContent,
  StyledModal,
  StyledContainerTitle,
  StyledTableContainer,
} from "./styles";

export interface AbsenceRequirementsModalProps {
  title: string;
  buttonLabel: string;
  portalId?: string;
  requirements: Requirement[];
  handleClose: () => void;
}

function AbsenceRequirementsModal(props: AbsenceRequirementsModalProps) {
  const {
    title,
    buttonLabel,
    portalId = "portal",
    requirements,
    handleClose,
  } = props;

  const [infoModal, setInfoModal] = useState({
    open: false,
    title: "",
    description: "",
  });

  const node = document.getElementById(portalId);
  if (!node) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly.",
    );
  }

  const isMobile = useMediaQuery("(max-width: 730px)");

  const renderAddIcon = (entry: IEntries) => {
    return (
      <Stack justifyContent="center">
        <Icon
          icon={<MdOutlineVisibility />}
          appearance="dark"
          onClick={() => console.log("Add clicked", entry)}
          spacing="compact"
          variant="empty"
          size="20px"
          cursorHover
        />
      </Stack>
    );
  };

  const actionsRequirements: IAction[] = [
    { id: "agregar", content: renderAddIcon },
  ];

  const getIconByTagStatus = (tagElement: React.ReactElement) => {
    const label = tagElement.props.children;

    if (label === "Cumple") {
      return <img src={CheckIcon} alt="Cumple" width={14} height={14} />;
    } else if (label === "Sin Evaluar") {
      return <img src={HelpIcon} alt="Sin Evaluar" width={14} height={14} />;
    } else if (label === "No Cumple") {
      return <img src={CloseIcon} alt="No Cumple" width={14} height={14} />;
    } else {
      return null;
    }
  };

  const getActionsMobileIcon = () => {
    return [
      {
        id: "estado",
        actionName: "",
        content: (entry: IEntries) => {
          const tagElement = entry.tag as React.ReactElement;
          return (
            <Stack>
              <Icon
                icon={getIconByTagStatus(tagElement)}
                appearance={tagElement.props.appearance}
                cursorHover
                size="20px"
              />
            </Stack>
          );
        },
      },
    ];
  };

  const getActionsMobile = () => {
    return [
      {
        id: "agregar",
        content: (entry: IEntries) => renderAddIcon(entry),
      },
    ];
  };

  const infoItems = [
    {
      icon: <MdOutlineVisibility />,
      text: labels.modals.attach,
      appearance: "help",
    },
    {
      icon: <MdOutlineCheckCircle />,
      text: labels.modals.forceApproval,
      appearance: "help",
    },
  ];

  return createPortal(
    <>
      <Blanket>
        <StyledModal $smallScreen={isMobile}>
          <StyledContainerTitle>
            <Text type="headline" size="small">
              {title}
            </Text>
            <StyledContainerClose onClick={handleClose}>
              <Stack alignItems="center" gap={spacing.s100}>
                <Text>{labels.modals.close}</Text>
                <Icon
                  icon={<MdClear />}
                  size="24px"
                  cursorHover
                  appearance="dark"
                />
              </Stack>
            </StyledContainerClose>
          </StyledContainerTitle>

          <Divider />
          <StyledContainerContent $smallScreen={isMobile}>
            <Stack direction="column" gap={spacing.s100}>
              <StyledTableContainer $smallScreen={isMobile}>
                {requirements.map((requirement, index) => (
                  <TableBoard
                    key={requirement.id}
                    id={requirement.id}
                    titles={requirement.titles}
                    entries={requirement.entries}
                    actions={actionsRequirements}
                    actionMobile={getActionsMobile()}
                    actionMobileIcon={getActionsMobileIcon()}
                    appearanceTable={{
                      widthTd: "84%",
                      efectzebra: true,
                      title: "primary",
                      isStyleMobile: true,
                    }}
                    isFirstTable={index === 0}
                    infoItems={infoItems}
                  />
                ))}
              </StyledTableContainer>
            </Stack>
            <Stack justifyContent="flex-end" gap={spacing.s100}>
              <Button onClick={handleClose}>{buttonLabel}</Button>
            </Stack>
          </StyledContainerContent>
        </StyledModal>
      </Blanket>
      {infoModal.open && (
        <InfoModal
          title={infoModal.title}
          titleDescription={labels.modals.infoModal.reasonTitle}
          description={infoModal.description}
          onCloseModal={() =>
            setInfoModal({ open: false, title: "", description: "" })
          }
        />
      )}
    </>,
    node,
  );
}

export { AbsenceRequirementsModal };
