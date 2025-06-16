import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

interface IStyledActions {
  theme: typeof inube;
  $hasTableData?: boolean;
}

const StyledDetail = styled.div<IStyledActions>`
  border-radius: 8px;
  position: relative;
  height: 0;
  top: ${({ $hasTableData }) => ($hasTableData ? "-175px" : "-125px")};
`;

export { StyledDetail };
