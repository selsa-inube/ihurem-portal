import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

interface IStyledDetail {
  theme: typeof inube;
  $isMobile?: boolean;
  $showTabs?: boolean;
  $isUsedDaysTab?: boolean;
}

const StyledDetail = styled.div<IStyledDetail>`
  border-radius: 8px;
  position: relative;
  height: 0px;
  z-index: 1;
  top: ${({ $showTabs, $isUsedDaysTab }) => {
    if ($isUsedDaysTab) {
      return $showTabs ? "-179px" : "-130px";
    }
    return $showTabs ? "-135px" : "-130px";
  }};
`;

export { StyledDetail };
