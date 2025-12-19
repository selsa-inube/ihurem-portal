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
import { useState, useEffect } from "react";
import { MdOutlineVisibility, MdOutlineHighlightOff } from "react-icons/md";
import { InfoModal } from "@components/modals/InfoModal";
import { TextAreaModal } from "@components/modals/TextAreaModal";
import { RequestComponentDetail } from "@components/modals/ComponentDetailModal";
import { mockRequirements } from "@mocks/requirements/requirementsTable.mock";
import { formatDate } from "@utils/date";
import { spacing } from "@design/tokens/spacing";
import { IUnifiedHumanResourceRequestData } from "@ptypes/humanResourcesRequest.types";
import {
  absenceReasonLabels,
  leaveReasonLabels,
  EAbsenceReason,
  ELeaveReason,
} from "@ptypes/humanResourcesRequest.types";
import { contractTypeLabels } from "@mocks/contracts/enums";
import { labels } from "@i18n/labels";

import { usePagination } from "./usePagination";
import {
  IAbsencesProcedureTable,
  AbsencesProcedureTableDataDetails,
} from "./types";
import { StyledTd, StyledTh } from "./styles";
import { columns, headers } from "./tableConfig";

interface AbsencesProcedureTableProps {
  data: IAbsencesProcedureTable[];
  loading?: boolean;
  hasViewDetailsPrivilege?: boolean;
  hasUploadPrivilege?: boolean;
  handleDeleteRequest: (requestId: string, justification: string) => void;
}

function AbsencesProcedureTable({
  data,
  loading = false,
  hasViewDetailsPrivilege = false,
  hasUploadPrivilege = false,
  handleDeleteRequest,
}: AbsencesProcedureTableProps) {
  const mediaQueries = useMediaQueries([
    "(max-width: 1024px)",
    "(max-width: 542px)",
  ]);

  const [localAbsences, setLocalAbsences] =
    useState<IAbsencesProcedureTable[]>(data);

  useEffect(() => {
    setLocalAbsences(data);
  }, [data]);

  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    title: "Información",
    titleDescription: "No tienes privilegios.",
    description: "",
  });
  const [showRequestDetail, setShowRequestDetail] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<
    { label: string; value: string }[] | null
  >(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAbsenceId, setSelectedAbsenceId] = useState<string | null>(
    null,
  );

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
  } = usePagination(localAbsences);

  const handleRestrictedClick = (message: string) => {
    setModalInfo({
      title: labels.absences.procedure.modals.info.title,
      titleDescription: labels.absences.procedure.modals.info.noPrivilegesTitle,
      description: message,
    });
    setShowModal(true);
  };

  const handleViewDetails = (row: IAbsencesProcedureTable) => {
    if (!hasViewDetailsPrivilege) {
      handleRestrictedClick(
        labels.absences.procedure.modals.info.noPrivilegesView,
      );
      return;
    }

    const details = row.dataDetails?.value;
    const rawRequestData = details?.humanResourceRequestData;

    let parsedData: IUnifiedHumanResourceRequestData =
      {} as IUnifiedHumanResourceRequestData;

    try {
      parsedData =
        typeof rawRequestData === "string"
          ? JSON.parse(rawRequestData)
          : (rawRequestData ?? {});
    } catch {
      parsedData = {};
    }

    const detailsData = [
      {
        label: labels.absences.procedure.details.motive,
        value: parsedData.reason
          ? (leaveReasonLabels[
              parsedData.reason as keyof typeof ELeaveReason
            ] ?? parsedData.reason)
          : labels.absences.general.noData,
      },
      {
        label: labels.absences.procedure.details.submotive,
        value: parsedData.subReason
          ? (absenceReasonLabels[parsedData.subReason as EAbsenceReason] ??
            parsedData.subReason)
          : labels.absences.general.noData,
      },
      {
        label: labels.absences.procedure.details.contractType,
        value: parsedData.contractType
          ? (contractTypeLabels[
              parsedData.contractType as keyof typeof contractTypeLabels
            ] ?? parsedData.contractType)
          : labels.absences.general.noData,
      },
      {
        label: labels.absences.procedure.details.contractId,
        value: parsedData.contractId ?? labels.absences.general.noData,
      },
      {
        label: labels.absences.procedure.details.contractNumber,
        value: parsedData.contractNumber ?? labels.absences.general.noData,
      },
      {
        label: labels.absences.procedure.details.businessName,
        value: parsedData.businessName ?? labels.absences.general.noData,
      },
      {
        label: labels.absences.procedure.details.motiveDetails,
        value: parsedData.motifDetail ?? labels.absences.general.noData,
      },
      {
        label: labels.absences.procedure.details.startDate,
        value: parsedData.startDate
          ? formatDate(parsedData.startDate)
          : labels.absences.general.noData,
      },
      {
        label: labels.absences.procedure.details.durationDays,
        value:
          parsedData.durationOfDays !== undefined
            ? parsedData.durationOfDays.toString()
            : labels.absences.general.noData,
      },
    ];

    setSelectedRecord(detailsData);
    setShowRequestDetail(true);
  };

  const handleOpenDeleteModal = (absenceId: string) => {
    if (!hasUploadPrivilege) {
      handleRestrictedClick(
        labels.absences.procedure.modals.info.noPrivilegesDelete,
      );
      return;
    }
    setSelectedAbsenceId(absenceId);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedAbsenceId(null);
  };

  const handleSubmitDelete = (justification: string) => {
    if (!selectedAbsenceId) return;

    handleDeleteRequest(selectedAbsenceId, justification);
    handleCloseDeleteModal();
  };

  const getHeaderAlignment = (key: string) => {
    if (mediaQueries["(max-width: 1024px)"]) return "center";
    switch (key) {
      case "reason":
      case "date":
      case "duration":
      case "state":
      case "actions":
        return "center";
      default:
        return "left";
    }
  };

  const getCellAlignment = (key: string) => {
    if (isMobile) return key === "reason" ? "left" : "left";
    return "left";
  };

  const determineVisibleHeaders = () => {
    if (isMobile) {
      return [
        {
          label: labels.absences.procedure.headers.startDate,
          key: "date",
          style: { width: "30%" },
        },
        {
          label: labels.absences.procedure.headers.status,
          key: "state",
          style: { width: "40%" },
        },
        {
          label: labels.absences.procedure.headers.actions,
          key: "actions",
          style: { width: "20%" },
          action: true,
        },
      ];
    }
    return headers.filter((header) =>
      ["reason", "date", "duration", "state", "actions"].includes(header.key),
    );
  };

  const visibleHeaders = determineVisibleHeaders();

  const visibleColumns = isMobile
    ? [
        { span: 1, style: { width: "auto" } },
        { span: 1, style: { width: "auto" } },
        { span: 1, style: { width: "25%" } },
      ]
    : mediaQueries["(max-width: 1024px)"]
      ? columns.slice(0, 3)
      : columns;

  const renderActionIcons = (row: IAbsencesProcedureTable) => {
    const id = row.dataDetails?.value?.humanResourceRequestId;

    return (
      <Stack
        justifyContent="center"
        gap={isMobile ? spacing.s250 : spacing.s600}
      >
        <Icon
          icon={<MdOutlineVisibility />}
          appearance={hasViewDetailsPrivilege ? "dark" : "gray"}
          size="16px"
          cursorHover={hasViewDetailsPrivilege}
          onClick={() =>
            hasViewDetailsPrivilege
              ? handleViewDetails(row)
              : handleRestrictedClick(
                  "No tienes privilegios para ver los detalles de esta ausencia.",
                )
          }
        />
        <Icon
          icon={<MdOutlineHighlightOff />}
          appearance={hasUploadPrivilege ? "danger" : "gray"}
          size="16px"
          cursorHover={hasUploadPrivilege}
          onClick={() =>
            hasUploadPrivilege
              ? handleOpenDeleteModal(id!)
              : handleRestrictedClick(
                  "No tienes privilegios para descartar esta ausencia.",
                )
          }
        />
      </Stack>
    );
  };

  const renderCellContent = (
    headerKey: string,
    cellData?: {
      value?: string | number | JSX.Element | AbsencesProcedureTableDataDetails;
    },
    row?: IAbsencesProcedureTable,
  ) => {
    if (loading) return <SkeletonLine width="100%" animated />;
    if (headerKey === "actions" && row) return renderActionIcons(row);

    if (headerKey === "date" && typeof cellData?.value === "string") {
      const dateText = cellData.value;
      return isMobile ? formatDate(dateText) : formatDate(dateText);
    }

    return typeof cellData?.value === "object"
      ? JSON.stringify(cellData.value)
      : cellData?.value;
  };

  const renderTableCell = (
    headerKey: string,
    cellData: {
      value?: string | number | JSX.Element | AbsencesProcedureTableDataDetails;
    },
    rowIndex: number,
    row: IAbsencesProcedureTable,
  ) => {
    const cellType = headerKey === "actions" || loading ? "custom" : "text";
    return (
      <StyledTd
        key={headerKey}
        appearance={rowIndex % 2 === 1 ? "dark" : "light"}
        type={cellType}
        align={getCellAlignment(headerKey)}
      >
        {renderCellContent(headerKey, cellData, row)}
      </StyledTd>
    );
  };

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
    const visibleData = isMobile ? localAbsences : currentData;

    return visibleData.map((row, rowIndex) => (
      <Tr key={rowIndex} border="bottom">
        {visibleHeaders.map((header) => {
          const cellData = row[header.key as keyof IAbsencesProcedureTable] as {
            value?:
              | string
              | number
              | JSX.Element
              | AbsencesProcedureTableDataDetails;
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
          {loading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <Tr key={idx} border="bottom">
                {visibleHeaders.map((_, index) => (
                  <Td key={index} colSpan={1} align="center" type="custom">
                    <SkeletonLine width="100%" animated />
                  </Td>
                ))}
              </Tr>
            ))
          ) : localAbsences.length === 0 ? (
            <Tr border="bottom">
              <Td colSpan={visibleHeaders.length} align="center" type="custom">
                <Text size="medium" appearance="gray">
                  {labels.absences.procedure.emptyState.noAbsences}
                </Text>
              </Td>
            </Tr>
          ) : (
            renderDataRows()
          )}
        </Tbody>

        {!isMobile && localAbsences.length > 0 && (
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

      {showRequestDetail && selectedRecord && (
        <RequestComponentDetail
          handleClose={() => setShowRequestDetail(false)}
          modalContent={selectedRecord}
          requirements={mockRequirements}
          showRequirementsTable
          title={labels.absences.procedure.detailModal.title}
          buttonLabel={labels.absences.procedure.detailModal.closeButton}
        />
      )}

      {showModal && (
        <InfoModal
          title={modalInfo.title}
          titleDescription={modalInfo.titleDescription}
          description={modalInfo.description}
          buttonText="Entendido"
          onCloseModal={() => setShowModal(false)}
        />
      )}

      {isDeleteModalOpen && (
        <TextAreaModal
          title={labels.absences.procedure.modals.delete.title}
          buttonText={labels.absences.procedure.modals.delete.confirmButton}
          inputLabel={labels.absences.procedure.modals.delete.reasonLabel}
          inputPlaceholder={
            labels.absences.procedure.modals.delete.reasonPlaceholder
          }
          description={labels.absences.procedure.modals.delete.warning}
          maxLength={500}
          onSubmit={(values) => {
            handleSubmitDelete(values.textarea);
          }}
          onCloseModal={handleCloseDeleteModal}
        />
      )}
    </>
  );
}

export { AbsencesProcedureTable };
