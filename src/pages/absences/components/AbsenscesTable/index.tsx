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
  useMediaQueries,
  Text,
  SkeletonLine,
  Stack,
} from "@inubekit/inubekit";
import { useState } from "react";
import {
  MdOutlineVisibility,
  MdOutlineFileUpload,
  MdMoreVert,
} from "react-icons/md";

import { usePrivileges } from "@hooks/usePrivileges";
import { InfoModal } from "@components/modals/InfoModal";

import { usePagination } from "./usePagination";
import { IAbsencesTable, AbsencesTableDataDetails } from "./types";
import { StyledTd, StyledTh } from "./styles";
import { columns, headers } from "./tableConfig";

interface AbsencesTableProps {
  data: IAbsencesTable[];
  loading?: boolean;
  onNoPrivilege?: () => void;
}

function AbsencesTable({ data, loading = false }: AbsencesTableProps) {
  const mediaQueries = useMediaQueries([
    "(max-width: 1024px)",
    "(max-width: 542px)",
  ]);
  const { hasPrivilege } = usePrivileges();

  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    title: "Acceso restringido",
    titleDescription: "",
    description: "",
  });

  const handleRestrictedClick = (message: string) => {
    setModalInfo({
      title: "Acceso restringido",
      titleDescription: "Permiso requerido",
      description: message,
    });
    setShowModal(true);
  };

  const isMobile = mediaQueries["(max-width: 542px)"];

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

  const determineVisibleHeaders = () => {
    if (isMobile) {
      return [
        { label: "Motivo", key: "reason" },
        { label: "M/A", key: "duration" },
        { label: "Acciones", key: "actions", action: true },
      ];
    }

    return headers.filter((header) =>
      ["reason", "date", "duration", "actions"].includes(header.key),
    );
  };

  const getHeaderAlignment = (key: string) => {
    if (mediaQueries["(max-width: 1024px)"]) return "center";

    switch (key) {
      case "reason":
        return "center";
      case "date":
        return "right";
      case "duration":
      case "actions":
        return "center";
      default:
        return "left";
    }
  };

  const getCellAlignment = (key: string) => {
    if (isMobile || mediaQueries["(max-width: 1024px)"]) return "center";

    switch (key) {
      case "duration":
      case "date":
      case "actions":
        return "center";
      default:
        return "left";
    }
  };

  const visibleHeaders = determineVisibleHeaders();
  const visibleColumns = isMobile
    ? columns.slice(1, 3)
    : mediaQueries["(max-width: 1024px)"]
      ? columns.slice(0, 3)
      : columns;

  const renderActionIcons = () => {
    if (isMobile) {
      return (
        <Stack justifyContent="center">
          <Icon
            icon={<MdMoreVert />}
            appearance="dark"
            size="20px"
            cursorHover
            onClick={() => console.log("Acciones móviles")}
          />
        </Stack>
      );
    }

    const canView = hasPrivilege("viewDetailsReportAbsencesHR");
    const canUpload = hasPrivilege("uploadDocumentsReportAbsences");

    return (
      <Stack justifyContent="center" gap="8px">
        <Icon
          icon={<MdOutlineVisibility />}
          appearance={canView ? "dark" : "gray"}
          size="16px"
          cursorHover={canView}
          onClick={() =>
            canView
              ? console.log("Ver detalles de ausencia")
              : handleRestrictedClick(
                  "No tienes privilegios para ver los detalles del reporte de ausencia.",
                )
          }
        />

        <Icon
          icon={<MdOutlineFileUpload />}
          appearance={canUpload ? "primary" : "gray"}
          size="16px"
          cursorHover={canUpload}
          onClick={() =>
            canUpload
              ? console.log("Subir documentos de ausencia")
              : handleRestrictedClick(
                  "No tienes privilegios para cargar documentos en esta ausencia.",
                )
          }
        />
      </Stack>
    );
  };

  const renderCellContent = (
    headerKey: string,
    cellData?: {
      value?: string | number | JSX.Element | AbsencesTableDataDetails;
      type?: string;
      onClick?: () => void;
    },
  ) => {
    if (loading) return <SkeletonLine width="100%" animated />;

    if (headerKey === "actions") return renderActionIcons();

    return typeof cellData?.value === "object"
      ? JSON.stringify(cellData.value)
      : cellData?.value;
  };

  const renderTableCell = (
    headerKey: string,
    cellData: {
      value?: string | number | JSX.Element | AbsencesTableDataDetails;
      type?: string;
      onClick?: () => void;
    },
    rowIndex: number,
  ) => {
    const cellType = headerKey === "actions" || loading ? "custom" : "text";
    const cellAlign = getCellAlignment(headerKey);

    return (
      <StyledTd
        key={headerKey}
        appearance={rowIndex % 2 === 1 ? "dark" : "light"}
        type={cellType}
        align={cellAlign}
      >
        {renderCellContent(headerKey, cellData)}
      </StyledTd>
    );
  };

  const renderHeaderRow = () => (
    <Tr border="bottom">
      {visibleHeaders.map((header, index) => (
        <StyledTh
          key={index}
          align={isMobile ? "center" : getHeaderAlignment(header.key)}
          action={header.key === "actions"}
        >
          <b>{header.label}</b>
        </StyledTh>
      ))}
    </Tr>
  );

  const renderDataRows = () =>
    currentData.map((row: IAbsencesTable, rowIndex: number) => (
      <Tr key={rowIndex} border="bottom">
        {visibleHeaders.map((header) => {
          const cellData = row[header.key as keyof IAbsencesTable] as {
            type?: string;
            value?: string | number | JSX.Element | AbsencesTableDataDetails;
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
  const renderEmptyState = () => (
    <Tr border="bottom">
      <Td colSpan={visibleHeaders.length} align="center" type="custom">
        <Text size="medium">No hay ausencias registradas.</Text>
      </Td>
    </Tr>
  );

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

      {showModal && (
        <InfoModal
          title={modalInfo.title}
          titleDescription={modalInfo.titleDescription}
          description={modalInfo.description}
          onCloseModal={() => setShowModal(false)}
        />
      )}
    </>
  );
}

export { AbsencesTable };
