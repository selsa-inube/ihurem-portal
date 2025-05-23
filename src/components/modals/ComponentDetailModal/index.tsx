import React from "react";
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
  MdAddCircleOutline,
  MdOutlineCheckCircle,
} from "react-icons/md";
import { createPortal } from "react-dom";

import CheckIcon from "@assets/images/CheckIcon.svg";
import CloseIcon from "@assets/images/CloseIcon.svg";
import HelpIcon from "@assets/images/HelpIcon.svg";
import { spacing } from "@design/tokens/spacing";
import { TableBoard } from "@components/data/TableBoard";
import { Requirement, IEntries } from "@components/data/TableBoard/types";

import {
  StyledContainerClose,
  StyledContainerContent,
  StyledModal,
  StyledContainerTitle,
  StyledBoxAttribute,
  StyledTableContainer,
} from "./styles";
import { ModalContent } from "./types";

export interface RequestComponentDetailProps {
  title: string;
  buttonLabel: string;
  modalContent: string | ModalContent[];
  portalId?: string;
  stackDirection?: "row" | "column";
  requirements?: Requirement[];
  showRequirementsTable?: boolean;
  handleClose: () => void;
  filterCriteria?: (item: ModalContent) => boolean;
}

function RequestComponentDetail(props: RequestComponentDetailProps) {
  const {
    title,
    buttonLabel,
    modalContent,
    portalId = "portal",
    stackDirection,
    requirements,
    showRequirementsTable = false,
    handleClose,
    filterCriteria,
  } = props;

  const infoItems = [
    { icon: <MdAddCircleOutline />, text: "Adjuntar", appearance: "help" },
    {
      icon: <MdOutlineCheckCircle />,
      text: "Forzar Aprobación",
      appearance: "help",
    },
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

  const node = document.getElementById(portalId);
  if (!node) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly.",
    );
  }

  const isMobile = useMediaQuery("(max-width: 700px)");
  const filteredContent = Array.isArray(modalContent)
    ? modalContent.filter((item) =>
        filterCriteria ? filterCriteria(item) : true,
      )
    : modalContent;

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <StyledContainerTitle>
          <Text type="headline" size="small">
            {title}
          </Text>
          <StyledContainerClose onClick={handleClose}>
            <Stack alignItems="center" gap={spacing.s100}>
              <Text>Cerrar</Text>
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
        <StyledContainerContent>
          <Stack gap={spacing.s150} direction="column">
            {Array.isArray(filteredContent) ? (
              filteredContent.map((item, index) => {
                const isLongContent = item.value
                  ? item.value.length > 42
                  : false;

                return (
                  <StyledBoxAttribute key={index} $smallScreen={isMobile}>
                    <Stack
                      direction={
                        isLongContent || isMobile || showRequirementsTable
                          ? "column"
                          : (stackDirection ?? "row")
                      }
                      justifyContent="space-between"
                    >
                      <Text type="label" size="medium" weight="bold">
                        {item.label}:
                      </Text>
                      <Text type="body" size="medium" appearance="gray">
                        {item.value}
                      </Text>
                    </Stack>
                  </StyledBoxAttribute>
                );
              })
            ) : (
              <Text type="body" size="medium" appearance="gray">
                {filteredContent}
              </Text>
            )}
          </Stack>

          {showRequirementsTable && (
            <Stack direction="column" alignItems="center" gap={spacing.s100}>
              <Text type="label" weight="bold">
                Requisitos
              </Text>

              <StyledTableContainer $smallScreen={isMobile}>
                {requirements?.map((requirement, index) => (
                  <TableBoard
                    key={requirement.id}
                    id={requirement.id}
                    titles={requirement.titles}
                    entries={requirement.entries}
                    actions={[]}
                    actionMobile={[]}
                    actionMobileIcon={getActionsMobileIcon()}
                    appearanceTable={{
                      widthTd: "75%",
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
          )}
        </StyledContainerContent>

        <Stack justifyContent="flex-end" gap={spacing.s100}>
          <Button onClick={handleClose}>{buttonLabel}</Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    node,
  );
}

export { RequestComponentDetail };
