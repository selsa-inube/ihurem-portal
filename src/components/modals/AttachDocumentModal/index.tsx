import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";
import {
  Icon,
  Stack,
  Text,
  useMediaQuery,
  Blanket,
  Divider,
  Button,
  Grid,
} from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";
import { formatFileSize } from "@utils/forms/size";
import { File } from "@components/data/File";
import { ellipsisText } from "@utils/texts";

import { AttachViewerModal } from "../AttachViewerModal";
import {
  StyledModal,
  StyledContainerClose,
  StyledAttachContainer,
} from "./styles";

export interface AttachDocumentModalProps {
  title?: string;
  portalId?: string;
  existingFiles?: globalThis.File[];
  onAttach?: (files: globalThis.File[]) => void;
  onCloseModal?: () => void;
}

export function AttachDocumentModal(props: AttachDocumentModalProps) {
  const {
    title = "Adjuntar documento",
    portalId = "portal",
    existingFiles = [],
    onAttach,
    onCloseModal,
  } = props;
  const [selectedFiles, setSelectedFiles] = useState<globalThis.File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);
  const MAX_FILE_SIZE = 2.5 * 1024 * 1024;
  const [viewerUrl, setViewerUrl] = useState<string | null>(null);
  const [viewerTitle, setViewerTitle] = useState<string>("");
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 700px)");
  const portalNode = document.getElementById(portalId) ?? document.body;

  useEffect(() => {
    if (existingFiles && existingFiles.length > 0) {
      setSelectedFiles([...existingFiles]);
    }
  }, [existingFiles]);

  const addFiles = (filesLike: FileList | globalThis.File[]) => {
    const filesArray = Array.from(filesLike);
    const validFiles = filesArray.filter(
      (file) =>
        file.type === "application/pdf" &&
        file.size <= MAX_FILE_SIZE &&
        !selectedFiles.some(
          (f) => `${f.name}-${f.size}` === `${file.name}-${file.size}`,
        ),
    );
    if (validFiles.length > 0) {
      setSelectedFiles((prev) => [...prev, ...validFiles]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(e.target.files);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragCounter.current++;
    if (dragCounter.current === 1) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragCounter.current--;
    if (dragCounter.current === 0) setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragCounter.current = 0;
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAttachFiles = () => {
    onAttach?.(selectedFiles);
  };

  const handleViewFile = (file: globalThis.File) => {
    const url = URL.createObjectURL(file);
    setViewerUrl(url);
    setViewerTitle(file.name);
    setIsViewerOpen(true);
  };

  const handleCloseViewer = () => {
    setIsViewerOpen(false);
    if (viewerUrl) {
      URL.revokeObjectURL(viewerUrl);
      setViewerUrl(null);
    }
  };

  return createPortal(
    <Blanket>
      <StyledModal
        $smallScreen={isMobile}
        $selectedFile={selectedFiles.length > 0}
      >
        <Stack alignItems="center" justifyContent="space-between">
          <Text type="headline" size="small">
            {ellipsisText(title, 60)}
          </Text>
          <StyledContainerClose onClick={onCloseModal}>
            <Stack alignItems="center" gap={spacing.s100}>
              <Text>Cerrar</Text>
              <Icon
                icon={<MdClear />}
                size="24px"
                cursorHover
                appearance="dark"
              />
            </Stack>
          </StyledContainerClose>
        </Stack>
        <Divider />
        <StyledAttachContainer
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          $isDragging={isDragging}
        >
          <Stack direction="column" alignItems="center">
            <Text appearance="gray">Arrastra un archivo</Text>
            <Text appearance="gray">o</Text>
          </Stack>
          <Button spacing="compact" onClick={handleBrowseClick}>
            Busca un archivo
          </Button>
          <input
            type="file"
            accept="application/pdf"
            multiple
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </StyledAttachContainer>
        <Text size="small" appearance="gray">
          Peso máximo por archivo: 2.5MB
        </Text>
        {selectedFiles.length > 0 && (
          <>
            <Divider dashed />
            <Stack direction="column" gap={spacing.s300}>
              <Text type="title" size="medium" weight="bold" appearance="gray">
                Documentos adjuntos ({selectedFiles.length})
              </Text>
              <Grid
                templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
                autoRows="auto"
                gap={spacing.s200}
              >
                {selectedFiles.map((file, index) => (
                  <File
                    key={`${file.name}-${file.size}-${index}`}
                    name={file.name}
                    size={formatFileSize(file.size)}
                    onDelete={() => removeFile(index)}
                    onView={() => handleViewFile(file)}
                  />
                ))}
              </Grid>
            </Stack>
          </>
        )}
        <Stack
          alignItems="flex-end"
          justifyContent="flex-end"
          gap={spacing.s250}
        >
          <Button onClick={onCloseModal} variant="outlined" appearance="gray">
            Cancelar
          </Button>
          <Button onClick={handleAttachFiles}>Adjuntar</Button>
        </Stack>
      </StyledModal>
      {isViewerOpen && viewerUrl && (
        <AttachViewerModal
          title={viewerTitle}
          fileUrl={viewerUrl}
          onCloseModal={handleCloseViewer}
        />
      )}
    </Blanket>,
    portalNode,
  );
}
