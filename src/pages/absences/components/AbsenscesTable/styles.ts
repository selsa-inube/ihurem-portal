import styled from "styled-components";
import { Th, Td } from "@inubekit/inubekit";

export const StyledTh = styled(Th)`
  & > p {
    text-align: center;
  }
`;

export const StyledTd = styled(Td)`
  & > p {
    text-align: center;
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

export const StyledMenuWrapper = styled.div`
  position: absolute;
  z-index: 1000;
`;
