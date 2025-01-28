import { MdOutlineVisibility, MdDeleteOutline } from "react-icons/md";
import {
  Text,
  Icon,
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
} from "@inubekit/inubekit";

import { ICertificationsTable } from "./types";
import { StyledTd, StyledTh } from "./styles";
import { columns, headers } from "./tableConfig";
import { usePagination } from "./usePagination";
import { Detail } from "./Detail";
import { useState } from "react";
import RequestComponentDetail from "@components/modals/ComponentDetailModal";

interface CertificationsTableProps {
  data: ICertificationsTable[];
  loading?: boolean;
}

function CertificationsTable({
  data,
  loading = false,
}: CertificationsTableProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<any>(null);

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

  const mediaQueries = useMediaQueries([
    "(max-width: 1024px)",
    "(max-width: 542px)",
  ]);

  const determineVisibleHeaders = () => {
    if (mediaQueries["(max-width: 542px)"]) {
      return headers
        .filter((header) => ["date", "status", "days"].includes(header.key))
        .concat({
          label: "Acciones",
          key: "mobileActions",
          action: true,
          style: { width: "50px" },
        });
    } else if (mediaQueries["(max-width: 1024px)"]) {
      return headers.filter((header) =>
        ["date", "status", "days", "details", "delete"].includes(header.key),
      );
    }
    return headers;
  };

  const visibleHeaders = determineVisibleHeaders();
  const visibleColumns = mediaQueries["(max-width: 542px)"]
    ? columns.slice(1, 3)
    : mediaQueries["(max-width: 1024px)"]
      ? columns.slice(0, 3)
      : columns;

  const renderTableCell = (
    headerKey: string,
    cellData: {
      type?: string;
      value?: string | number | JSX.Element;
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
            <Detail
              onClickDetails={() => handleDetailsClick(cellData)}
              onClickEdit={cellData?.onClick}
              onClickEliminate={cellData?.onClick}
            />
          )}
        </Td>
      );
    }

    const cellType =
      headerKey === "details" || headerKey === "delete" || loading
        ? "custom"
        : "text";

    return (
      <StyledTd
        key={headerKey}
        appearance={rowIndex % 2 === 1 ? "dark" : "light"}
        type={cellType}
        align="center"
        style={{ padding: "16px 2px" }}
      >
        {renderCellContent(headerKey, cellData)}
      </StyledTd>
    );
  };

  const renderCellContent = (
    headerKey: string,
    cellData?: {
      value?: string | number | JSX.Element;
      type?: string;
      onClick?: () => void;
    },
  ) => {
    if (loading) {
      return <SkeletonLine width="100%" animated={true} />;
    }

    if (
      cellData &&
      cellData.type === "icon" &&
      (headerKey === "details" || headerKey === "delete")
    ) {
      const appearanceValue: "dark" | "danger" | "gray" =
        headerKey === "details" ? "dark" : "danger";

      const iconProps = {
        appearance: appearanceValue,
        size: "16px",
        onClick: () => handleDetailsClick(cellData),
        cursorHover: true,
      };

      return (
        <Icon
          icon={
            headerKey === "details" ? (
              <MdOutlineVisibility />
            ) : (
              <MdDeleteOutline />
            )
          }
          {...iconProps}
        />
      );
    }
    return cellData?.value;
  };

  const handleDetailsClick = (cellData: any) => {
    setModalData(cellData);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const modalContent = [
    { label: "Número", value: "1234" },
    { label: "Tipo", value: "Disfrute de vacaciones" },
    { label: "Fecha", value: "22/Oct/2024" },
    { label: "Estado", value: "En trámite de aprobación" },
    { label: "Días de disfrute", value: "2" },
    { label: "Destinatario", value: "A quien interese" },
    { label: "Contrato", value: "Indefinido - 02/sep/2024" },
  ];

  const filteredModalContent = mediaQueries["(max-width: 1024px)"]
    ? modalContent
    : modalContent.filter(
        (item) => item.label === "Destinatario" || item.label === "Contrato",
      );

  return (
    <>
      <Table>
        <Colgroup>
          {visibleColumns.map((col, index) => (
            <Col key={index} span={col.span} style={col.style} />
          ))}
        </Colgroup>
        <Thead>
          <Tr border="bottom">
            {visibleHeaders.map((header, index) => (
              <StyledTh
                key={index}
                action={header.action}
                align="center"
                style={header.style}
              >
                <b>{header.label}</b>
              </StyledTh>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.length === 0 ? (
            <Tr border="bottom">
              <Td colSpan={visibleHeaders.length} align="center" type="custom">
                <Text size="medium">No tiene solicitudes en trámite.</Text>
              </Td>
            </Tr>
          ) : (
            currentData.map((row: ICertificationsTable, rowIndex: number) => (
              <Tr key={rowIndex} border="bottom">
                {visibleHeaders.map((header) => {
                  const cellData = row[header.key];
                  return renderTableCell(
                    header.key,
                    cellData ?? { value: "" },
                    rowIndex,
                  );
                })}
              </Tr>
            ))
          )}
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

      {isModalOpen && modalData && (
        <RequestComponentDetail
          title="Detalles"
          buttonLabel="Cerrar"
          modalContent={filteredModalContent}
          handleClose={closeModal}
        />
      )}
    </>
  );
}

export { CertificationsTable };
