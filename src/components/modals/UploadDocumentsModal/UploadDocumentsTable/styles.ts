import styled from "styled-components";
import { Th, Td, inube } from "@inubekit/inubekit";

export const StyledTableContainer = styled.div`
  border-radius: 8px;
  width: 100%;
`;

export const StyledTh = styled(Th)<{ $isGray?: boolean }>`
  background-color: ${({ $isGray }) =>
    $isGray ? inube.palette.neutral.N30 : "transparent"};
  text-align: left;
`;

export const StyledTd = styled(Td)`
  background-color: ${inube.palette.neutral.N0};
`;
