import styled from "styled-components";
import { Th, Td } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing/spacing";

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
    padding: ${spacing.s0} ${spacing.s150};
  }
`;

export const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;

  & > div {
    position: absolute;
    visibility: hidden;
    top: 150%;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    z-index: 1;
  }

  &:hover > div {
    visibility: visible;
  }
`;
