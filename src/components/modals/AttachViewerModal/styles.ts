import styled from "styled-components";

import { spacing } from "@design/tokens/spacing";

const StyledModal = styled.div<{ $smallScreen: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: ${({ $smallScreen }) => ($smallScreen ? "80vw" : "800px")};
  height: ${({ $smallScreen }) => ($smallScreen ? "70vh" : "600px")};
  border-radius: 8px;
  padding: ${spacing.s300};
  gap: ${spacing.s200};
  position: relative;
`;

const StyledContainerClose = styled.div`
  cursor: pointer;
`;

const StyledPDFContainer = styled.div`
  flex: 1;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  background-color: #525252;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

export { StyledContainerClose, StyledModal, StyledPDFContainer, StyledIframe };
