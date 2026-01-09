import { inube } from "@inubekit/inubekit";
import styled from "styled-components";

import { Variant } from "./types";

export interface IProgressBarProps {
  theme?: typeof inube;
}

export interface IProgressIndicatorProps {
  theme?: typeof inube;
  $arrayLength: number;
  $currentStep: number;
  $variant?: Variant;
}

export interface IStepIndicatorProps {
  theme?: typeof inube;
  $variant?: Variant;
}

const StyledProgressBar = styled.div<IProgressBarProps>`
  border-radius: 10px;
  transition: width 0.5s;
  height: 6px;
  width: 100%;
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
  border: 1px solid
    ${({ theme }) => theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
`;

const StyledProgressIndicator = styled.div<IProgressIndicatorProps>`
  border-radius: 8px;
  transition: width 0.5s;
  height: 6px;
  width: ${({ $arrayLength, $currentStep }) =>
    `${($currentStep / $arrayLength) * 100}%`};
  background: ${({ theme, $variant = "primary" }) =>
    $variant === "danger"
      ? theme?.palette?.red?.R400 || inube.palette.red.R400
      : $variant === "success"
        ? theme?.palette?.green?.G400 || inube.palette.green.G400
        : theme?.palette?.blue?.B400 || inube.palette.blue.B400};
`;

const StyledStepIndicator = styled.div<IStepIndicatorProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border-width: 2px;
  border-style: solid;
  border-color: ${({ theme, $variant = "primary" }) =>
    $variant === "danger"
      ? theme?.palette?.red?.R400 || inube.palette.red.R400
      : $variant === "success"
        ? theme?.palette?.green?.G400 || inube.palette.green.G400
        : theme?.palette?.blue?.B400 || inube.palette.blue.B400};
`;

export { StyledProgressBar, StyledProgressIndicator, StyledStepIndicator };
