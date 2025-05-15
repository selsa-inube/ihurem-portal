import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

interface IStyledButton {
  theme: typeof inube;
  $data?: number;
}

export const StyledButton = styled.div<IStyledButton>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 4px 12px;
  border-radius: 8px;
  gap: 6px;
  border: 1px solid
    ${({ theme }) => theme?.palette?.neutral?.N90 || inube.palette.neutral.N300};
  cursor: pointer;
  height: 20px;

  &::before {
    content: "${({ $data }) => $data}";
    position: absolute;
    top: -8px;
    right: -8px;
    width: 17px;
    height: 17px;
    background-color: ${({ theme }) =>
      theme?.palette?.red?.R400 || inube.palette.red.R400};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) =>
      theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
    font-size: 11px;
    font-family: Roboto;
    z-index: 1;
  }
`;
