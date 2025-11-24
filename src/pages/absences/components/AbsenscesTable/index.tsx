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
import { useState, useRef, useEffect } from "react";
import {
  MdOutlineVisibility,
  MdOutlineFileUpload,
  MdMoreVert,
} from "react-icons/md";

import {
  AbsenceReasonES,
  ESubReason,
  ESubReasonES,
} from "@ptypes/employeeAbsence.types";
import { InfoModal } from "@components/modals/InfoModal";
import { UploadDocumentsModal } from "@components/modals/UploadDocumentsModal";
import { RequestComponentDetail } from "@components/modals/ComponentDetailModal";
import { mockRequirements } from "@mocks/requirements/requirementsTable.mock";
import { MenuPropect } from "@components/feedback/MenuPropect";
import { IOptions } from "@components/feedback/MenuPropect/types";
import { formatDate, formatMobileDate } from "@utils/date";
import { spacing } from "@design/tokens/spacing";

import { usePagination } from "./usePagination";
import { IAbsencesTable, AbsencesTableDataDetails } from "./types";
import { StyledTd, StyledTh, StyledMenuWrapper } from "./styles";
import { columns, headers } from "./tableConfig";
import { mockDocuments } from "../tableMock/tableMock";
import { SelectedModalContent } from "./types";

interface IModalDetailItem {
  label: string;
  value: string;
}

interface AbsencesTableProps {
  data: IAbsencesTable[];
  loading?: boolean;
  hasViewDetailsPrivilege?: boolean;
  hasUploadPrivilege?: boolean;
  handleRestrictedClick?: (message: string) => void;
}

const formatDetailsForModal = (
  details: AbsencesTableDataDetails | null,
): IModalDetailItem[] => {
  if (!details) return [];

  const reasonES =
    AbsenceReasonES[details.absenceReason] ?? details.absenceReason ?? "N/A";

  const subReasonES =
    ESubReasonES[details.subReason as ESubReason] ?? details.subReason ?? "N/A";

  const items: IModalDetailItem[] = [
    { label: "Tipo de Ausencia", value: reasonES },
    {
      label: "Descripción del Motivo",
      value: details.absenceReasonDetails ?? "N/A",
    },
    {
      label: "Fecha de Inicio",
      value: details.absenceStartDate
        ? formatDate(details.absenceStartDate)
        : "N/A",
    },
  ];

  const isAbsenceByDays =
    typeof details.absenceDays === "number" && details.absenceDays > 0;

  if (isAbsenceByDays) {
    items.push({
      label: "Días de Ausencia",
      value: String(details.absenceDays),
    });
  } else {
    items.push(
      {
        label: "Hora de Inicio",
        value:
          details.absenceStartHour !== undefined &&
          details.absenceStartHour !== null
            ? String(details.absenceStartHour)
            : "N/A",
      },
      {
        label: "Horas de Ausencia",
        value:
          details.hoursAbsent !== undefined && details.hoursAbsent !== null
            ? String(details.hoursAbsent)
            : "N/A",
      },
    );
  }

  items.push(
    { label: "Empleado ID", value: String(details.employeeId) },
    { label: "Sub Razón", value: subReasonES },
  );

  return items;
};

function AbsencesTable({
  data,
  loading = false,
  hasViewDetailsPrivilege = false,
  hasUploadPrivilege = false,
}: AbsencesTableProps) {
  const mediaQueries = useMediaQueries([
    "(max-width: 1024px)",
    "(max-width: 542px)",
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showRequestDetail, setShowRequestDetail] = useState(false);
  const [selectedAbsenceDetails, setSelectedAbsenceDetails] =
    useState<SelectedModalContent>(null);

  const [modalInfo, setModalInfo] = useState({
    title: "Información",
    titleDescription: "No tienes privilegios.",
    description: "",
  });

  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

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

  const handleRestrictedClick = (message: string) => {
    setModalInfo({
      title: "Información",
      titleDescription: "No tienes privilegios.",
      description: message,
    });
    setShowModal(true);
  };

  const handleViewDetails = () => {
    if (!hasViewDetailsPrivilege) {
      handleRestrictedClick(
        "No tienes privilegios para ver los detalles de esta ausencia.",
      );
      return;
    }
    if (selectedAbsenceDetails) {
      setShowRequestDetail(true);
    }
  };

  const handleCloseRequestDetail = () => {
    setShowRequestDetail(false);
    setSelectedAbsenceDetails(null);
  };

  const handleUploadDocuments = () => {
    if (!hasUploadPrivilege) {
      handleRestrictedClick(
        "No tienes privilegios para cargar documentos en esta ausencia.",
      );
      return;
    }
    setShowUploadModal(true);
  };

  const handleMenuClick = (
    event: React.MouseEvent<Element, MouseEvent>,
    details: AbsencesTableDataDetails,
  ) => {
    setSelectedAbsenceDetails(details);

    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    setMenuPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX + 45,
    });
    setShowMenu(true);
  };

  const handleCloseMenu = () => {
    setShowMenu(false);
  };

  useEffect(() => {
    const handleOutsideTouch = (event: Event) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    const handleScrollOrMove = () => {
      setShowMenu(false);
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleOutsideTouch);
      document.addEventListener("touchstart", handleOutsideTouch);
      window.addEventListener("scroll", handleScrollOrMove, true);
      window.addEventListener("touchmove", handleScrollOrMove, true);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideTouch);
      document.removeEventListener("touchstart", handleOutsideTouch);
      window.removeEventListener("scroll", handleScrollOrMove, true);
      window.removeEventListener("touchmove", handleScrollOrMove, true);
    };
  }, [showMenu]);

  const menuOptions: IOptions[] = [
    {
      title: "Detalles",
      icon: <MdOutlineVisibility />,
      visible: true,
      onClick: () => {
        handleCloseMenu();
        handleViewDetails();
      },
      appearance: "gray",
    },
    {
      title: "Documentos",
      icon: <MdOutlineFileUpload />,
      visible: true,
      onClick: () => {
        handleCloseMenu();
        handleUploadDocuments();
      },
      appearance: "primary",
    },
  ];

  const getHeaderAlignment = (key: string) => {
    if (mediaQueries["(max-width: 1024px)"]) return "center";
    switch (key) {
      case "reason":
      case "date":
      case "duration":
      case "actions":
        return "center";
      default:
        return "left";
    }
  };

  const getCellAlignment = (key: string) => {
    if (isMobile) {
      return key === "reason" ? "left" : "center";
    }

    if (mediaQueries["(max-width: 1024px)"]) {
      return ["reason", "duration", "date", "actions"].includes(key)
        ? "left"
        : "left";
    }

    return ["reason", "duration", "date", "actions"].includes(key)
      ? "left"
      : "left";
  };

  const determineVisibleHeaders = () => {
    if (isMobile) {
      return [
        { label: "Motivo", key: "reason", style: { width: "50%" } },
        { label: "M/A", key: "date", style: { width: "30%" } },
        {
          label: "Acciones",
          key: "actions",
          style: { width: "20%" },
          action: true,
        },
      ];
    }
    return headers.filter((header) =>
      ["reason", "date", "duration", "actions"].includes(header.key),
    );
  };

  const visibleHeaders = determineVisibleHeaders();

  const visibleColumns = isMobile
    ? [
        { span: 1, style: { width: "auto" } },
        { span: 1, style: { width: "22%" } },
        { span: 1, style: { width: "25%" } },
      ]
    : mediaQueries["(max-width: 1024px)"]
      ? columns.slice(0, 3)
      : columns;

  const renderActionIcons = (details: AbsencesTableDataDetails) => {
    if (isMobile) {
      return (
        <Stack justifyContent="center">
          <Icon
            icon={<MdMoreVert />}
            appearance="primary"
            size="16px"
            cursorHover
            onClick={(e) => handleMenuClick(e, details)}
            variant="filled"
            shape="circle"
          />
        </Stack>
      );
    }

    return (
      <Stack justifyContent="center" gap={spacing.s600}>
        <Icon
          icon={<MdOutlineVisibility />}
          appearance={hasViewDetailsPrivilege ? "dark" : "gray"}
          size="16px"
          cursorHover={hasViewDetailsPrivilege}
          onClick={() => {
            if (!hasViewDetailsPrivilege) {
              handleRestrictedClick(
                "No tienes privilegios para ver los detalles de esta ausencia.",
              );
              return;
            }
            setSelectedAbsenceDetails(details);
            setShowRequestDetail(true);
          }}
        />
        <Icon
          icon={<MdOutlineFileUpload />}
          appearance={hasUploadPrivilege ? "primary" : "gray"}
          size="16px"
          cursorHover={hasUploadPrivilege}
          onClick={
            hasUploadPrivilege
              ? handleUploadDocuments
              : () =>
                  handleRestrictedClick(
                    "No tienes privilegios para cargar documentos en esta ausencia.",
                  )
          }
        />
      </Stack>
    );
  };

  const renderCellContent = (
    headerKey: string,
    rowData: IAbsencesTable,
    cellData?: {
      value?: string | number | JSX.Element | AbsencesTableDataDetails;
    },
  ) => {
    if (loading) return <SkeletonLine width="100%" animated />;

    if (headerKey === "actions") {
      const details = rowData.dataDetails?.value;

      if (!details) {
        return renderActionIcons({} as AbsencesTableDataDetails);
      }

      return renderActionIcons(details as AbsencesTableDataDetails);
    }

    if (headerKey === "date" && typeof cellData?.value === "string") {
      const dateText = cellData.value;

      if (isMobile) return formatMobileDate(dateText);
      if (dateText.includes(":")) return dateText;

      return formatDate(dateText);
    }

    return typeof cellData?.value === "object"
      ? JSON.stringify(cellData.value)
      : cellData?.value;
  };

  const renderTableCell = (
    headerKey: string,
    cellData: {
      value?: string | number | JSX.Element | AbsencesTableDataDetails;
    },
    rowIndex: number,
    rowData: IAbsencesTable,
  ) => (
    <StyledTd
      key={headerKey}
      appearance={rowIndex % 2 === 1 ? "dark" : "light"}
      type={headerKey === "actions" || loading ? "custom" : "text"}
      align={getCellAlignment(headerKey)}
    >
      {renderCellContent(headerKey, rowData, cellData)}
    </StyledTd>
  );

  const renderHeaderRow = () => (
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

  const renderDataRows = () => {
    const visibleData = isMobile ? data : currentData;
    return visibleData.map((row, rowIndex) => (
      <Tr key={rowIndex} border="bottom">
        {visibleHeaders.map((header) => {
          const cellData = row[header.key as keyof IAbsencesTable] as {
            value?: string | number | JSX.Element | AbsencesTableDataDetails;
          };
          return renderTableCell(
            header.key,
            cellData ?? { value: "" },
            rowIndex,
            row,
          );
        })}
      </Tr>
    ));
  };

  const renderEmptyState = () => (
    <Tr border="bottom">
      <Td colSpan={visibleHeaders.length} align="center" type="custom">
        <Stack justifyContent="center" alignItems="center" gap={spacing.s050}>
          <Text size="medium" appearance="gray">
            Aún no hay ninguna ausencia registrada. Para agregar una presiona
          </Text>
          <Text size="medium" appearance="gray" weight="bold">
            “+ Reportar ausencia”.
          </Text>
        </Stack>
      </Td>
    </Tr>
  );

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

      {showUploadModal && (
        <UploadDocumentsModal
          handleClose={() => setShowUploadModal(false)}
          documents={mockDocuments}
        />
      )}

      {showRequestDetail && selectedAbsenceDetails && (
        <RequestComponentDetail
          title="Detalle de Solicitud"
          buttonLabel="Cerrar"
          modalContent={formatDetailsForModal(selectedAbsenceDetails)}
          requirements={mockRequirements}
          handleClose={handleCloseRequestDetail}
          showRequirementsTable
        />
      )}

      {showMenu && menuPosition && (
        <StyledMenuWrapper
          ref={menuRef}
          style={{
            position: "absolute",
            top: `${menuPosition.top}px`,
            left: `${menuPosition.left}px`,
          }}
        >
          <MenuPropect
            options={menuOptions}
            onClose={handleCloseMenu}
            onMouseLeave={handleCloseMenu}
          />
        </StyledMenuWrapper>
      )}
    </>
  );
}

export { AbsencesTable };
