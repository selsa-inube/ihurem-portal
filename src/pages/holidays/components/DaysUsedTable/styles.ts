import styled from "styled-components";
import { Th, Td } from "@inubekit/inubekit";

export const StyledTh = styled(Th)`
  & > p {
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const StyledTd = styled(Td)`
  & > p {
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
