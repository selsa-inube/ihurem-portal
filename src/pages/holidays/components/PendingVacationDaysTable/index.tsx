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
  Text,
  SkeletonLine,
} from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing/spacing";

import { IPendingVacationDaysTable } from "./types";
import { StyledTd, StyledTh } from "./styles";
import { columns, headers } from "./tableConfig";
import { usePagination } from "./usePagination";

interface PendingVacationDaysTableProps {
  data: IPendingVacationDaysTable[];
  loading?: boolean;
}

function PendingVacationDaysTable(props: PendingVacationDaysTableProps) {
  const { data, loading = false } = props;

  const {
    totalRecords,
    firstEntryInPage,
    lastEntryInPage,
    currentData,
    handleStartPage,
    handlePrevPage,
    handleNextPage,
    handleEndPage,
  } = usePagination(data);

  const renderCellContent = (cellData?: {
    value?: string | number | JSX.Element;
    type?: string;
    onClick?: () => void;
  }) => {
    return loading ? (
      <SkeletonLine width="100%" animated={true} />
    ) : (
      cellData?.value
    );
  };

  const renderTableCell = (
    headerKey: string,
    cellData:
      | {
          type?: string;
          value?: string | number | JSX.Element;
          onClick?: () => void;
        }
      | undefined,
    rowIndex: number,
  ) => {
    return (
      <StyledTd
        key={headerKey}
        appearance={rowIndex % 2 === 1 ? "dark" : "light"}
        type={loading ? "custom" : "text"}
        align="center"
        style={{ padding: `${spacing.s200} ${spacing.s050}` }}
      >
        {renderCellContent(cellData)}
      </StyledTd>
    );
  };

  const renderTableHeaders = () => (
    <Thead>
      <Tr border="bottom">
        {headers.map((header, index) => (
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
  );

  const renderTableBody = () => (
    <Tbody>
      {data.length === 0 ? (
        <Tr border="bottom">
          <Td colSpan={headers.length} align="center" type="custom">
            <Text size="medium">No tienes días por disfrutar.</Text>
          </Td>
        </Tr>
      ) : (
        currentData.map((row: IPendingVacationDaysTable, rowIndex: number) => (
          <Tr key={rowIndex} border="bottom">
            {headers.map((header) =>
              renderTableCell(header.key, row[header.key], rowIndex),
            )}
          </Tr>
        ))
      )}
    </Tbody>
  );

  const renderTableFooter = () =>
    data.length > 0 && (
      <Tfoot>
        <Tr border="bottom">
          <Td colSpan={headers.length} type="custom" align="center">
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
    );

  return (
    <Table>
      <Colgroup>
        {columns.map((col, index) => (
          <Col key={index} span={col.span} style={col.style} />
        ))}
      </Colgroup>
      {renderTableHeaders()}
      {renderTableBody()}
      {renderTableFooter()}
    </Table>
  );
}

export { PendingVacationDaysTable };
