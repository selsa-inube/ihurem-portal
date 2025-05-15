import styled from "styled-components";

import { spacing } from "@design/tokens/spacing/spacing";

const StyledAppMenu = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  padding: ${spacing.s400} ${spacing.s800};
  gap: ${spacing.s300};

  @media (max-width: 490px) {
    padding: ${spacing.s200};
  }
`;

export { StyledAppMenu };
