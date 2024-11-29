import styled from "styled-components";
import { spacing } from "@design/tokens/spacing/spacing";

const StyledMenu = styled.div`
  background-color: #ffff;
  border-radius: 8px;
  box-shadow:
    0px 4px 4px 0px #091e4221,
    0px 8px 12px 6px #091e4221;
  padding: ${spacing.s075} ${spacing.s0};
  position: absolute;
  right: 1px;
  width: 162px;
`;

const StyledContainerLabel = styled.div`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 30px;
  margin: 0px;
  padding: ${spacing.s150} ${spacing.s200};

  &:hover {
    background-color: #f4f5f7;
    cursor: pointer;
  }
`;
const StyledCloseIcon = styled.div`
  position: absolute;
`;

export { StyledMenu, StyledContainerLabel, StyledCloseIcon };
