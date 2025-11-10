import {
  Table,
  Thead,
  Tbody,
  Tr,
  Col,
  Colgroup,
  Text,
  Icon,
} from "@inubekit/inubekit";
import { MdOutlineAttachFile } from "react-icons/md";
import { spacing } from "@design/tokens/spacing";

import { StyledTh, StyledTd, StyledTableContainer } from "./styles";
import { columns, headers } from "./tableConfig";

export interface UploadDocumentsTableProps {
  documents: { id: number; name: string }[];
}

export function UploadDocumentsTable(props: UploadDocumentsTableProps) {
  const { documents } = props;

  return (
    <StyledTableContainer>
      <Table>
        <Colgroup>
          {columns.map((col, index) => (
            <Col key={index} span={col.span} style={col.style} />
          ))}
        </Colgroup>

        <Thead>
          <Tr border="bottom">
            {headers.map((header, index) => (
              <StyledTh
                key={index}
                $isAttachmentColumn={header.label === "Adjuntar"}
              >
                <Text as="span" type="label" size="small" weight="bold">
                  {header.label}
                </Text>
              </StyledTh>
            ))}
          </Tr>
        </Thead>

        <Tbody>
          {documents.map((doc, index) => {
            const isRequired = doc.name.toLowerCase().includes("requerido");

            return (
              <Tr key={doc.id} border="bottom">
                <StyledTd $isOdd={index % 2 === 1} align="left">
                  <Text as="span" type="body" size="small">
                    {doc.name}
                  </Text>
                </StyledTd>

                <StyledTd $isOdd={index % 2 === 1} align="center" type="custom">
                  <Icon
                    icon={<MdOutlineAttachFile />}
                    appearance={isRequired ? "gray" : "primary"}
                    size={spacing.s200}
                    cursorHover={!isRequired}
                  />
                </StyledTd>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </StyledTableContainer>
  );
}
