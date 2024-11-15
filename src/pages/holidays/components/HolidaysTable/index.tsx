import {
  MdOutlineVisibility,
  MdDeleteOutline,
  MdMoreVert,
} from "react-icons/md";
import {
  Col,
  Colgroup,
  Pagination,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@inubekit/table";
import { Icon } from "@inubekit/icon";
import { useMediaQueries } from "@inubekit/hooks";
import { Text } from "@inubekit/text";
import { SkeletonLine } from "@inubekit/skeleton";

import { IHolidaysTable } from "./types";
import { columns, headers } from "./tableConfig";
import { usePagination } from "./usePagination";

interface HolidaysTableProps {
  data: IHolidaysTable[];
  loading?: boolean;
}

function HolidaysTable({ data, loading = false }: HolidaysTableProps) {
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
    cellData:
      | {
          type?: string;
          value?: string | number | JSX.Element;
          onClick?: () => void;
        }
      | undefined,
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
            <Icon
              icon={<MdMoreVert />}
              appearance="primary"
              variant="filled"
              shape="circle"
              size="20px"
              onClick={() => console.log("Actions clicked")}
              cursorHover
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
      <Td
        key={headerKey}
        appearance={rowIndex % 2 === 1 ? "dark" : "light"}
        type={cellType}
        align="center"
        style={{ padding: "16px 2px" }}
      >
        {renderCellContent(headerKey, cellData)}
      </Td>
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
        onClick: cellData.onClick,
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

  return (
    <Table>
      <Colgroup>
        {visibleColumns.map((col, index) => (
          <Col key={index} span={col.span} style={col.style} />
        ))}
      </Colgroup>
      <Thead>
        <Tr border="bottom">
          {visibleHeaders.map((header, index) => (
            <Th
              key={index}
              action={header.action}
              align="center"
              style={header.style}
            >
              <b>{header.label}</b>
            </Th>
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
          currentData.map((row: IHolidaysTable, rowIndex: number) => (
            <Tr key={rowIndex} border="bottom">
              {visibleHeaders.map((header) =>
                renderTableCell(header.key, row[header.key], rowIndex),
              )}
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
  );
}

export { HolidaysTable };
