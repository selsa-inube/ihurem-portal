import { MdOutlineVisibility, MdOutlineHighlightOff } from "react-icons/md";
import { useState } from "react";
import {
  Text,
  Icon,
  IIcon,
  SkeletonLine,
  useMediaQueries,
  Col,
  Colgroup,
  Pagination,
  Table,
  Tbody,
  Td,
  Tfoot,
  Thead,
  Tr,
  Stack,
} from "@inubekit/inubekit";

import { TextAreaModal } from "@components/modals/TextAreaModal";
import { RequestComponentDetail } from "@components/modals/ComponentDetailModal";
import { mockRequirements } from "@mocks/requirements/requirementsTable.mock";
import { Tooltip } from "@components/overlay/Tooltip";
import { InfoModal } from "@components/modals/InfoModal";
import { contractTypeLabels } from "@mocks/contracts/enums";
import { spacing } from "@design/tokens/spacing";

import { CertificationsTableDataDetails, ICertificationsTable } from "./types";
import { StyledTd, StyledTh, TooltipWrapper } from "./styles";
import { columns, headers } from "./tableConfig";
import { usePagination } from "./usePagination";

interface CertificationsTableProps {
  data: ICertificationsTable[];
  loading?: boolean;
  disableDeleteAction?: boolean;
  hasViewDetailsPrivilege?: boolean;
  hasDeletePrivilege?: boolean;
  handleDeleteRequest: (requestId: string, justification: string) => void;
}

function CertificationsTable({
  data,
  loading = false,
  disableDeleteAction = false,
  hasViewDetailsPrivilege = false,
  hasDeletePrivilege = false,
  handleDeleteRequest,
}: CertificationsTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [infoModalContent, setInfoModalContent] = useState({
    title: "Información",
    titleDescription: "No tienes privilegios",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  });
  const [selectedRecord, setSelectedRecord] = useState<
    { label: string; value: string }[] | null
  >(null);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(
    null,
  );

  const mediaQueries = useMediaQueries([
    "(max-width: 1024px)",
    "(max-width: 542px)",
  ]);

  const isMobile = mediaQueries["(max-width: 542px)"];
  const iconSize = isMobile ? "20px" : "16px";

  const {
    totalRecords,
    handleStartPage,
    handlePrevPage,
    handleNextPage,
    handleEndPage,
    firstEntryInPage,
    lastEntryInPage,
    currentData,
  } = usePagination(data);

  const displayData = isMobile ? data : currentData;

  const determineVisibleHeaders = () => {
    if (mediaQueries["(max-width: 542px)"]) {
      return [
        ...headers.filter((header) => ["date", "status"].includes(header.key)),
        {
          label: "Acciones",
          key: "mobileActions",
          action: true,
          style: { width: "50px" },
        },
      ];
    }
    if (mediaQueries["(max-width: 1024px)"]) {
      return headers.filter((header) =>
        ["requestNumber", "date", "status", "details", "delete"].includes(
          header.key,
        ),
      );
    }
    return headers.filter((header) =>
      ["requestNumber", "status", "date", "type", "details", "delete"].includes(
        header.key,
      ),
    );
  };

  const visibleHeaders = determineVisibleHeaders();
  const visibleColumns = mediaQueries["(max-width: 542px)"]
    ? columns.slice(1, 3)
    : mediaQueries["(max-width: 1024px)"]
      ? columns.slice(0, 3)
      : columns;

  const getHeaderAlignment = (key: string) => {
    if (mediaQueries["(max-width: 1024px)"]) {
      return "center";
    }

    switch (key) {
      case "requestNumber":
      case "type":
      case "date":
      case "status":
      case "actions":
        return "center";
      default:
        return "left";
    }
  };

  const getCellAlignment = (key: string) => {
    if (mediaQueries["(max-width: 1024px)"]) {
      return "center";
    }

    switch (key) {
      case "requestNumber":
        return "right";
      case "type":
      case "date":
      case "status":
        return "left";
      case "details":
      case "actions":
      case "delete":
        return "center";
      default:
        return "left";
    }
  };

  const handleOpenModal = (requestId: string) => {
    setSelectedRequestId(requestId);
    {
      if (!hasDeletePrivilege) {
        showInfoModal(
          "No tienes privilegios",
          "No tienes privilegios para eliminar este registro.",
        );
        return;
      }
      setIsSecondModalOpen(true);
    }
  };

  const handleCloseModal = () => setIsSecondModalOpen(false);

  const handleClose = () => {
    setIsSecondModalOpen(false);
    setIsModalOpen(false);
    setIsInfoModalOpen(false);
    setSelectedRecord(null);
  };

  const showInfoModal = (titleDescription: string, description: string) => {
    setInfoModalContent({
      title: "Información",
      titleDescription,
      description,
    });
    setIsInfoModalOpen(true);
  };

  const renderDetailsIcon = (rowIndex: number) => {
    const iconProps: IIcon = {
      appearance: "dark",
      size: iconSize,
      cursorHover: true,
      onClick: () => handleOpenDetailsModal(rowIndex),
      icon: <MdOutlineVisibility />,
    };
    return (
      <TooltipWrapper>
        <Icon {...iconProps} />
        <Tooltip
          text={
            hasViewDetailsPrivilege ? "Ver más detalles" : "Sin privilegios"
          }
        />
      </TooltipWrapper>
    );
  };

  const renderDeleteIcon = (requestId: string) => {
    const iconProps: IIcon = {
      appearance: "danger",
      size: iconSize,
      onClick: () => handleOpenModal(requestId),
      cursorHover: true,
      icon: <MdOutlineHighlightOff />,
    };
    return (
      <TooltipWrapper>
        <Icon {...iconProps} />
        <Tooltip
          text={
            !disableDeleteAction && hasDeletePrivilege
              ? "Descartar solicitud"
              : "Sin privilegios"
          }
        />
      </TooltipWrapper>
    );
  };

  const handleOpenDetailsModal = (rowIndex: number) => {
    if (!hasViewDetailsPrivilege) {
      showInfoModal(
        "No tienes privilegios",
        "No tienes privilegios para ver detalles.",
      );
      return;
    }

    const dataDe = data[rowIndex].dataDetails
      ?.value as unknown as CertificationsTableDataDetails;

    const dataDeta = [
      {
        label: "Tipo de certificación",
        value:
          typeof dataDe?.certificationType === "string" &&
          dataDe.certificationType.trim()
            ? dataDe.certificationType.trim()
            : "Sin información",
      },
      {
        label: "Destinatario",
        value:
          typeof dataDe?.addressee === "string" && dataDe.addressee.trim()
            ? dataDe.addressee.trim()
            : "Sin información",
      },
      {
        label: "Contrato",
        value:
          dataDe.businessName || dataDe.contractType
            ? `${dataDe.businessName ?? ""} - ${
                contractTypeLabels[dataDe.contractType] ?? ""
              }`
            : "Sin información",
      },
      {
        label: "Observaciones",
        value:
          typeof dataDe?.observationEmployee === "string" &&
          dataDe.observationEmployee.trim()
            ? dataDe.observationEmployee.trim()
            : "Sin observaciones",
      },
    ];

    setSelectedRecord(dataDeta);
    setIsModalOpen(true);
  };

  const renderCellContent = (
    headerKey: string,
    cellData?: {
      value?: string | number | JSX.Element | CertificationsTableDataDetails;
      type?: string;
      onClick?: () => void;
      hasDeletePrivilege?: boolean;
    },
    rowIndex?: number,
  ) => {
    if (loading) {
      return <SkeletonLine width="100%" animated={true} />;
    }

    if (
      cellData?.type === "icon" &&
      (headerKey === "details" || headerKey === "delete")
    ) {
      if (headerKey === "details") {
        const iconProps: IIcon = {
          appearance: "dark",
          size: "16px",
          cursorHover: true,
          onClick: () =>
            rowIndex !== undefined && handleOpenDetailsModal(rowIndex),
          icon: <MdOutlineVisibility />,
        };
        return (
          <TooltipWrapper>
            <Icon {...iconProps} />
            <Tooltip
              text={
                hasViewDetailsPrivilege ? "Ver más detalles" : "Sin privilegios"
              }
            />
          </TooltipWrapper>
        );
      }

      if (headerKey === "delete") {
        const requestId = currentData[rowIndex!]?.requestId;

        const iconProps: IIcon = {
          appearance: "danger",
          size: "16px",
          onClick: () => requestId && handleOpenModal(requestId),
          cursorHover: true,
          icon: <MdOutlineHighlightOff />,
        };
        return (
          <TooltipWrapper>
            <Icon {...iconProps} />
            <Tooltip
              text={
                !disableDeleteAction && hasDeletePrivilege
                  ? "Descartar solicitud"
                  : "Sin privilegios"
              }
            />
          </TooltipWrapper>
        );
      }
    }

    return typeof cellData?.value === "object"
      ? JSON.stringify(cellData.value)
      : cellData?.value;
  };

  const renderTableCell = (
    headerKey: string,
    cellData: {
      type?: string;
      value?: string | number | JSX.Element | CertificationsTableDataDetails;
      onClick?: () => void;
    },
    rowIndex: number,
  ) => {
    const isMobileAction =
      headerKey === "mobileActions" && mediaQueries["(max-width: 542px)"];

    if (isMobileAction) {
      return (
        <Td
          key={headerKey}
          appearance={rowIndex % 2 === 1 ? "dark" : "light"}
          align="center"
          type="custom"
        >
          {loading ? (
            <SkeletonLine width="100%" animated={true} />
          ) : (
            <Stack justifyContent="center" gap={spacing.s200}>
              {renderDetailsIcon(rowIndex)}
              {renderDeleteIcon(displayData[rowIndex].requestId!)}
            </Stack>
          )}
        </Td>
      );
    }

    const cellType =
      headerKey === "details" || headerKey === "delete" || loading
        ? "custom"
        : "text";

    const cellAlign = getCellAlignment(headerKey);

    return (
      <StyledTd
        key={headerKey}
        appearance={rowIndex % 2 === 1 ? "dark" : "light"}
        type={cellType}
        align={cellAlign}
        style={{ padding: "16px 2px" }}
      >
        {renderCellContent(headerKey, cellData, rowIndex)}
      </StyledTd>
    );
  };

  const renderHeaderRow = () => {
    if (!mediaQueries["(max-width: 542px)"]) {
      const headerSlice = mediaQueries["(max-width: 1024px)"]
        ? headers.slice(1, 4)
        : headers.slice(0, 4);

      return (
        <Tr border="bottom">
          {headerSlice.map((header, index) => (
            <StyledTh key={index} align={getHeaderAlignment(header.key)}>
              <b>{header.label}</b>
            </StyledTh>
          ))}
          <StyledTh
            key="acciones"
            colSpan={2}
            align="center"
            style={{ width: "120px" }}
            action
          >
            <b>Acciones</b>
          </StyledTh>
        </Tr>
      );
    }

    return (
      <Tr border="bottom">
        {visibleHeaders.map((header, index) => (
          <StyledTh
            key={index}
            align="center"
            style={header.style}
            action={header.key === "mobileActions"}
          >
            <b>{header.label}</b>
          </StyledTh>
        ))}
      </Tr>
    );
  };

  const renderLoadingRows = () =>
    Array.from({ length: 3 }).map((_, idx) => (
      <Tr key={idx} border="bottom">
        {visibleHeaders.map((_, index) => (
          <Td key={index} colSpan={1} align="center" type="custom">
            <SkeletonLine width="100%" animated />
          </Td>
        ))}
      </Tr>
    ));

  const renderEmptyState = () => (
    <Tr border="bottom">
      <Td colSpan={visibleHeaders.length} align="center" type="custom">
        <Text size="medium">No tiene solicitudes en trámite.</Text>
      </Td>
    </Tr>
  );

  const renderDataRows = () =>
    currentData.map((row: ICertificationsTable, rowIndex: number) => (
      <Tr key={rowIndex} border="bottom">
        {visibleHeaders.map((header) => {
          const cellData = row[header.key as keyof ICertificationsTable] as {
            type?: string;
            value?:
              | string
              | number
              | JSX.Element
              | CertificationsTableDataDetails;
            onClick?: () => void;
          };
          return renderTableCell(
            header.key,
            cellData ?? { value: "" },
            rowIndex,
          );
        })}
      </Tr>
    ));

  return (
    <>
      <Table>
        <Colgroup>
          {visibleColumns.map((col, index) => (
            <Col key={index} span={col.span} style={col.style} />
          ))}
        </Colgroup>
        <Thead>{renderHeaderRow()}</Thead>
        <Tbody>
          {loading
            ? renderLoadingRows()
            : data.length === 0
              ? renderEmptyState()
              : renderDataRows()}
        </Tbody>
        {data.length > 0 && (
          <Tfoot>
            <Tr border="bottom">
              <Td colSpan={visibleHeaders.length} type="custom" align="center">
                <Pagination
                  firstEntryInPage={firstEntryInPage}
                  lastEntryInPage={lastEntryInPage}
                  totalRecords={totalRecords}
                  handleStartPage={handleStartPage}
                  handlePrevPage={handlePrevPage}
                  handleNextPage={handleNextPage}
                  handleEndPage={handleEndPage}
                />
              </Td>
            </Tr>
          </Tfoot>
        )}
      </Table>

      {isModalOpen && selectedRecord && (
        <RequestComponentDetail
          handleClose={handleClose}
          modalContent={selectedRecord}
          requirements={mockRequirements}
          title="Detalles de la certificación"
          buttonLabel="Cerrar"
          showRequirementsTable
        />
      )}

      {isSecondModalOpen && (
        <TextAreaModal
          title="Descartar"
          buttonText="Descartar"
          inputLabel="Justificación"
          inputPlaceholder="¿Por qué eliminarás el registro?"
          description="Al descartar una solicitud esta no podrá continuar su trámite y desaparecerá. ¿Realmente quieres descartar esta solicitud?"
          maxLength={500}
          onSubmit={(values) => {
            if (selectedRequestId) {
              handleDeleteRequest(selectedRequestId, values.textarea);
              handleCloseModal();
            }
          }}
          onCloseModal={handleClose}
        />
      )}

      {isInfoModalOpen && (
        <InfoModal
          title="Información"
          titleDescription={infoModalContent.titleDescription}
          description={infoModalContent.description}
          buttonText="Entendido"
          onCloseModal={handleClose}
        />
      )}
    </>
  );
}

export { CertificationsTable };
