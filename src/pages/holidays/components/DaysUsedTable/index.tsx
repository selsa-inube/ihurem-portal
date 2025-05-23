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
  Stack,
} from "@inubekit/inubekit";
import { useEffect, useState } from "react";

import { IDaysUsedTable } from "./types";
import { StyledTd, StyledTh } from "./styles";
import { columns, headers } from "./tableConfig";
import { usePagination } from "./usePagination";

interface DaysUsedTableProps {
  data: IDaysUsedTable[];
  loading?: boolean;
}

function DaysUsedTable(props: DaysUsedTableProps) {
  const { data, loading = false } = props;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

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

  const getHeaderAlignment = (key: string) => {
    switch (key) {
      case "days":
        return "right";
      default:
        return undefined;
    }
  };

  const getCellAlignment = (key: string) => {
    switch (key) {
      case "startDate":
      case "usageMode":
        return "left";
      case "days":
        return "right";
      default:
        return undefined;
    }
  };

  const renderCellContent = (cellData?: {
    value?: string | number | JSX.Element;
    type?: string;
  }) => {
    if (loading) {
      return <SkeletonLine width="100%" animated={true} />;
    }

    return typeof cellData?.value === "object"
      ? JSON.stringify(cellData.value)
      : cellData?.value;
  };

  const renderTableCell = (
    headerKey: string,
    cellData: {
      type?: string;
      value?: string | number | JSX.Element;
    },
    rowIndex: number,
  ) => {
    const cellAlign = getCellAlignment(headerKey);

    return (
      <StyledTd
        key={headerKey}
        appearance={rowIndex % 2 === 1 ? "dark" : "light"}
        align={cellAlign}
      >
        {renderCellContent(cellData)}
      </StyledTd>
    );
  };

  const renderHeaderRow = () => {
    return (
      <Tr border="bottom">
        {headers.map((header, index) => (
          <StyledTh key={index} align={getHeaderAlignment(header.key)}>
            <b>{header.label}</b>
          </StyledTh>
        ))}
      </Tr>
    );
  };

  const renderLoadingRows = () =>
    Array.from({ length: 3 }).map((_, idx) => (
      <Tr key={idx} border="bottom">
        {headers.map((header, index) => (
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
      <Td colSpan={headers.length} align="center" type="custom">
        <Stack justifyContent="center">
          <Text type="label" size="large" appearance="gray">
            Aún no has utilizado ningún día de vacaciones.
          </Text>
        </Stack>
      </Td>
    </Tr>
  );

  const renderDataRows = () =>
    displayData.map((row: IDaysUsedTable, rowIndex: number) => (
      <Tr key={rowIndex} border="bottom">
        {headers.map((header) => {
          const cellData = row[header.key];
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
          {columns.map((col, index) => (
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
        )}
      </Table>
    </>
  );
}

export { DaysUsedTable };
