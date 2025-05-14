import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

interface IStyledDetail {
  theme: typeof inube;
  $isMobile?: boolean;
  $showTabs?: boolean;
}

const StyledDetail = styled.div<IStyledDetail>`
  border-radius: 8px;
  position: relative;
  height: 0px;
  z-index: 1;
  top: ${({ $showTabs }) => ($showTabs ? "-150px" : "-90px")};
`;

export { StyledDetail };
