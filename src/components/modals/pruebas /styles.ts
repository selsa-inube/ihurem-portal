import styled, { css } from "styled-components";
import { inube } from "@inubekit/inubekit";

interface IStyledWithTheme {
  theme: typeof inube;
}

export const StyledGaugeContainer = styled.div`
  position: relative;
  width: 260px;
  height: 260px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
`;

export const StyledScoreText = styled.div<{
  $isMin?: boolean;
  $isMax?: boolean;
  theme: typeof inube;
}>`
  position: absolute;
  text-align: center;

  ${({ $isMin, theme }) =>
    $isMin &&
    css`
      bottom: 45px;
      left: 55px;
      font-size: 14px;
      font-weight: 500;
      color: ${theme?.palette?.neutral?.N900 || inube.palette.neutral.N900};
    `}

  ${({ $isMax, theme }) =>
    $isMax &&
    css`
      bottom: 45px;
      right: 55px;
      font-size: 14px;
      font-weight: 500;
      color: ${theme?.palette?.neutral?.N900 || inube.palette.neutral.N900};
    `}

  ${({ $isMin, $isMax, theme }) =>
    !$isMin &&
    !$isMax &&
    css`
      top: 45%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;

      .score-label {
        font-size: 18px;
        font-weight: 500;
        color: ${theme?.palette?.blue?.B500 || inube.palette.blue.B500};
        margin-bottom: 0px;
      }

      .score-value {
        font-size: 56px;
        font-weight: 700;
        color: ${theme?.palette?.blue?.B500 || inube.palette.blue.B500};
        line-height: 1.1;
      }
    `}
`;

export const StyledScoreDate = styled.div<IStyledWithTheme>`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 13px;
  color: ${({ theme }) =>
    theme?.palette?.neutral?.N500 || inube.palette.neutral.N500};
  text-align: center;
  width: 100%;

  span {
    font-weight: bold;
    color: ${({ theme }) =>
      theme?.palette?.neutral?.N900 || inube.palette.neutral.N900};
  }
`;

export const StyledScoreIndicator = styled.div<{
  $left: number;
  $top: number;
  theme: typeof inube;
}>`
  position: absolute;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: transparent;
  border: none;

  left: ${({ $left }) => $left}px;
  top: ${({ $top }) => $top}px;
  transform: translate(-50%, -50%);
  z-index: 10;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 2px solid
      ${({ theme }) => theme?.palette?.blue?.B500 || inube.palette.blue.B500};
    box-shadow: 0 0 0 1px
      ${({ theme }) => theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${({ theme }) =>
      theme?.palette?.blue?.B500 || inube.palette.blue.B500};
    border: 1px solid
      ${({ theme }) => theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
  }
`;
