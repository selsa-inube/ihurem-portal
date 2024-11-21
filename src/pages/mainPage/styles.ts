import { Link } from "react-router-dom";
import styled from "styled-components";
import { inube } from "@inubekit/foundations";
import { spacing } from "@design/tokens/spacing/spacing";

interface StyledMainProps {
  $isTablet: boolean;
}

const StyledAppPage = styled.div`
  display: inherit;
  box-sizing: border-box;
`;

const StyledContainer = styled.div`
  display: inherit;
  overflow: hidden;
`;

const StyledMain = styled.main<StyledMainProps>`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: ${({ $isTablet }) =>
    $isTablet
      ? `${spacing.s300} ${spacing.s200} ${spacing.s0}`
      : `${spacing.s300} ${spacing.s400} ${spacing.s0}`};
`;

const StyledContentImg = styled(Link)`
  width: 100px;
`;

const StyledLogo = styled.img`
  max-width: 100px;
`;

const StyledFooter = styled.footer`
  margin-top: auto;
  display: flex;
  justify-content: center;
  padding: ${spacing.s200} ${spacing.s300};
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N10 || inube.palette.neutral.N10};
`;

export {
  StyledAppPage,
  StyledContainer,
  StyledContentImg,
  StyledLogo,
  StyledMain,
  StyledFooter,
};
