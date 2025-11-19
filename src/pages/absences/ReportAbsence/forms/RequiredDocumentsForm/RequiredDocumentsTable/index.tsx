import { useState } from "react";
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
import { RiPencilLine } from "react-icons/ri";

import { spacing } from "@design/tokens/spacing";
import { AttachDocumentModal } from "@components/modals/AttachDocumentModal";

import { IDocument } from "./types";
import { StyledTh, StyledTd, StyledTableContainer } from "./styles";
import { columns, headers } from "./tableConfig";

export interface RequiredDocumentsTableProps {
  documents: IDocument[];
  onAttachFile?: (document: IDocument, files: File[]) => void;
}

export function RequiredDocumentsTable(props: RequiredDocumentsTableProps) {
  const { documents, onAttachFile } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<IDocument | null>(
    null,
  );

  const hasDocuments = documents && documents.length > 0;

  const handleAttachClick = (doc: IDocument) => {
    if (!doc.disabled) {
      setSelectedDocument(doc);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDocument(null);
  };

  const handleAttach = (files: File[]) => {
    if (onAttachFile && selectedDocument) {
      onAttachFile(selectedDocument, files);
    }
    handleCloseModal();
  };

  const getAttachedFilesCount = (doc: IDocument) => {
    return doc.attachedFiles?.length ?? 0;
  };

  return (
    <>
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
                <StyledTh key={index} $isGray={index === headers.length - 1}>
                  <Text as="span" type="label" size="small" weight="bold">
                    {header.label}
                  </Text>
                </StyledTh>
              ))}
            </Tr>
          </Thead>

          <Tbody>
            {hasDocuments ? (
              documents.map((doc) => {
                const filesCount = getAttachedFilesCount(doc);
                return (
                  <Tr key={doc.id} border="bottom">
                    <StyledTd align="left">
                      <Text as="span" size="small">
                        {`${doc.name} ${doc.required ? "- *Requerido*" : "- (Opcional)"}`}
                      </Text>
                    </StyledTd>

                    <StyledTd align="center" type="custom">
                      <Icon
                        icon={
                          filesCount > 0 ? (
                            <RiPencilLine />
                          ) : (
                            <MdOutlineAttachFile />
                          )
                        }
                        appearance={doc.disabled ? "gray" : "primary"}
                        size={spacing.s200}
                        cursorHover={!doc.disabled}
                        onClick={() => handleAttachClick(doc)}
                        disabled={doc.disabled}
                      />
                    </StyledTd>
                  </Tr>
                );
              })
            ) : (
              <Tr>
                <StyledTd colSpan={headers.length} align="center">
                  <Text size="small">No hay documentos para mostrar</Text>
                </StyledTd>
              </Tr>
            )}
          </Tbody>
        </Table>
      </StyledTableContainer>

      {isModalOpen && selectedDocument && (
        <AttachDocumentModal
          title={selectedDocument.name}
          onAttach={handleAttach}
          onCloseModal={handleCloseModal}
          existingFiles={selectedDocument.attachedFiles}
        />
      )}
    </>
  );
}
