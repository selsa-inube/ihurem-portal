import styled from "styled-components";
import { Th, Td, inube } from "@inubekit/inubekit";

export const StyledTableContainer = styled.div`
  border-radius: 8px;
  width: 100%;
`;

export const StyledTh = styled(Th)<{ $isAttachmentColumn?: boolean }>`
  background-color: ${({ $isAttachmentColumn }) =>
    $isAttachmentColumn
      ? inube.palette.neutral.N30
      : inube.palette.neutral.N10};
  text-align: left;
`;

export const StyledTd = styled(Td)<{ $isOdd?: boolean }>`
  background-color: ${({ $isOdd, theme }) =>
    $isOdd
      ? (theme as typeof inube)?.palette?.neutral?.N0 ||
        inube.palette.neutral.N0
      : (theme as typeof inube)?.palette?.neutral?.N10 ||
        inube.palette.neutral.N10};
`;
