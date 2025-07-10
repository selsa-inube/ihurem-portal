import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

interface IStyledWelcomeContainer {
  theme?: typeof inube;
}

interface IStyledOutletContainer {
  theme?: typeof inube;
}

interface IStyledImg {
  $screenMobile: boolean;
  theme?: typeof inube;
}

const StyledWelcomeContainer = styled.div<IStyledWelcomeContainer>`
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
`;

const StyledOutletContainer = styled(
  StyledWelcomeContainer,
)<IStyledOutletContainer>`
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
`;

const StyledLogo = styled.img`
  width: 194px;
  margin-top: ${spacing.s200};
`;

const StyledImg = styled.img<IStyledImg>`
  width: ${({ $screenMobile }) => ($screenMobile ? "189px" : "278px")};
`;

export { StyledWelcomeContainer, StyledOutletContainer, StyledLogo, StyledImg };
