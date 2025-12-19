import {
  Col,
  Colgroup,
  Pagination,
  Table,
  Tbody,
  Td,
  Tfoot,
  Thead,
  Tr,
  Icon,
  IIcon,
  useMediaQueries,
  Text,
  SkeletonLine,
  Stack,
} from "@inubekit/inubekit";
import { MdOutlineVisibility, MdOutlineHighlightOff } from "react-icons/md";
import { useState } from "react";

import { TextAreaModal } from "@components/modals/TextAreaModal";
import { RequestComponentDetail } from "@components/modals/ComponentDetailModal";
import { mockRequirements } from "@mocks/requirements/requirementsTable.mock";
import { Tooltip } from "@components/overlay/Tooltip";
import { InfoModal } from "@components/modals/InfoModal";
import { spacing } from "@design/tokens/spacing";
import { contractTypeLabels } from "@mocks/contracts/enums";
import { showRequirements } from "@pages/holidays/config/requirements";
import { formatDate } from "@utils/date";

import { IHolidaysTable, HolidayTableDataDetails } from "./types";
import { StyledTd, StyledTh, TooltipWrapper } from "./styles";
import { columns, headers } from "./tableConfig";
import { usePagination } from "./usePagination";

interface HolidaysTableProps {
  data: IHolidaysTable[];
  loading?: boolean;
  disableDeleteAction?: boolean;
  hasViewDetailsPrivilege?: boolean;
  hasDeletePrivilege?: boolean;
  handleDeleteRequest: (
    requestId: string,
    justification?: string,
  ) => boolean | void;
}

function HolidaysTable(props: HolidaysTableProps) {
  const {
    data,
    loading = false,
    disableDeleteAction = false,
    hasViewDetailsPrivilege = false,
    hasDeletePrivilege = false,
    handleDeleteRequest,
  } = props;

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
    if (isMobile) {
      return [
        ...headers.filter((header) =>
          ["description", "date"].includes(header.key),
        ),
        {
          label: "Acciones",
          key: "actions",
          action: true,
        },
      ];
    }
    if (mediaQueries["(max-width: 1024px)"]) {
      return headers.filter((header) =>
        ["description", "days", "date", "details", "delete"].includes(
          header.key,
        ),
      );
    }
    return headers.filter((header) =>
      ["date", "status", "days", "description", "details", "delete"].includes(
        header.key,
      ),
    );
  };

  const visibleHeaders = determineVisibleHeaders();
  const visibleColumns = isMobile
    ? columns.slice(1, 3)
    : mediaQueries["(max-width: 1024px)"]
      ? columns.slice(0, 3)
      : columns;

  const getHeaderAlignment = (key: string) => {
    if (mediaQueries["(max-width: 1024px)"]) {
      return "center";
    }

    switch (key) {
      case "date":
        return "right";
      case "days":
        return "right";
      case "status":
      case "details":
      case "delete":
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
      case "days":
        return "right";
      case "details":
      case "delete":
      case "actions":
      case "date":
        return "center";
      default:
        return "left";
    }
  };

  const handleClose = () => {
    setIsSecondModalOpen(false);
    setIsModalOpen(false);
    setIsInfoModalOpen(false);
    setSelectedRecord(null);
    setSelectedRequestId(null);
  };

  const showInfoModal = (titleDescription: string, description: string) => {
    setInfoModalContent({
      title: "Información",
      titleDescription,
      description,
    });
    setIsInfoModalOpen(true);
  };

  const handleOpenDetailsModal = (rowIndex: number) => {
    if (!hasViewDetailsPrivilege) {
      showInfoModal(
        "No tienes privilegios",
        "No tienes privilegios para ver detalles.",
      );
      return;
    }

    const dataSource = isMobile ? data : currentData;

    const dataDe = dataSource[rowIndex].dataDetails
      ?.value as unknown as HolidayTableDataDetails;

    console.log("DETAILS DATA", dataDe);

    const contractLabel = dataDe.contractType
      ? contractTypeLabels[dataDe.contractType]
      : "";

    const dataDeta = [
      { label: "Días de disfrute", value: String(dataDe.daysOff ?? "") },
      { label: "Días hábiles a pagar", value: String(dataDe.daysToPay ?? "") },
      {
        label: "Fecha de inicio o pago",
        value: dataDe.startDateEnyoment
          ? formatDate(dataDe.startDateEnyoment)
          : "",
      },
      {
        label: "Contrato",
        value:
          dataDe.businessName && contractLabel
            ? `${dataDe.businessName} - ${contractLabel}`
            : dataDe.businessName || contractLabel,
      },
      {
        label: "Observaciones",
        value: String(dataDe.observationEmployee ?? ""),
      },
    ].filter(
      (item) =>
        item.value !== "" &&
        !(typeof item.value === "string" && item.value.trim() === ""),
    );

    if (dataDeta.length === 0) return;

    setSelectedRecord(dataDeta);
    setIsModalOpen(true);
  };

  const handleOpenModal = (requestId: string) => {
    if (!hasDeletePrivilege) {
      showInfoModal(
        "No tienes privilegios",
        "No tienes privilegios para eliminar este registro.",
      );
      return;
    }

    const canDelete = handleDeleteRequest(requestId);

    if (canDelete !== false) {
      setSelectedRequestId(requestId);
      setIsSecondModalOpen(true);
    }
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

  const renderCellContent = (
    headerKey: string,
    cellData?: {
      value?: string | number | JSX.Element | HolidayTableDataDetails;
      type?: string;
    },
    rowIndex?: number,
  ) => {
    if (loading) {
      return <SkeletonLine width="100%" animated={true} />;
    }

    if (cellData?.type === "icon" && headerKey === "details") {
      return rowIndex !== undefined ? renderDetailsIcon(rowIndex) : null;
    }

    if (cellData?.type === "icon" && headerKey === "delete") {
      const dataSource = isMobile ? data : currentData;
      const requestId = dataSource[rowIndex!]?.requestId;
      return requestId ? renderDeleteIcon(requestId) : null;
    }

    return typeof cellData?.value === "object"
      ? JSON.stringify(cellData.value)
      : cellData?.value;
  };

  const renderTableCell = (
    headerKey: string,
    cellData: {
      type?: string;
      value?: string | number | JSX.Element | HolidayTableDataDetails;
    },
    rowIndex: number,
  ) => {
    if (headerKey === "actions" && isMobile) {
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
            <Stack justifyContent="center" gap={spacing.s400}>
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
      >
        {renderCellContent(headerKey, cellData, rowIndex)}
      </StyledTd>
    );
  };

  const renderHeaderRow = () => {
    if (!isMobile) {
      const headerSlice = mediaQueries["(max-width: 1024px)"]
        ? headers.slice(0, 3)
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
            style={{ width: "110px" }}
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
            align={getHeaderAlignment(header.key)}
            action={header.key === "actions"}
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
        {visibleHeaders.map((header, index) => (
          <Td
            key={index}
            colSpan={1}
            align={getCellAlignment(header.key)}
            type="custom"
          >
            <SkeletonLine width="100%" animated />
          </Td>
        ))}
      </Tr>
    ));

  const renderEmptyState = () => (
    <Tr border="bottom">
      <Td colSpan={visibleHeaders.length} align="center" type="custom">
        <Text size="medium">
          Aún no has utilizado ningún día de vacaciones.
        </Text>
      </Td>
    </Tr>
  );

  const renderDataRows = () =>
    displayData.map((row: IHolidaysTable, rowIndex: number) => (
      <Tr key={rowIndex} border="bottom">
        {visibleHeaders.map((header) => {
          const cellData = row[header.key as keyof IHolidaysTable] as {
            type?: string;
            value?: string | number | JSX.Element | HolidayTableDataDetails;
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
            <Col key={index} span={col.span} />
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
        {!isMobile && data.length > 0 && (
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
          requirements={showRequirements ? mockRequirements : undefined}
          showRequirementsTable
          title="Detalles de solicitudes de vacaciones"
          buttonLabel="Cerrar"
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
              handleClose();
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

export { HolidaysTable };
