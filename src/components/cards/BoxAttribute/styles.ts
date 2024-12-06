import styled from "styled-components";

import { spacing } from "@design/tokens/spacing/spacing";

interface IStyledBoxAttribute {
  $smallScreen?: boolean;
}

const StyledBoxAttribute = styled.div<IStyledBoxAttribute>`
  display: flex;
  align-items: center;
  border-radius: 8px;
  padding: ${({ $smallScreen }) =>
    $smallScreen ? spacing.s100 : `${spacing.s075} ${spacing.s150}`};
  width: auto;
`;

export { StyledBoxAttribute };
