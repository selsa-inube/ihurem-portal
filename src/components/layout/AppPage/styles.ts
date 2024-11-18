import { Link } from "react-router-dom";
import styled from "styled-components";

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
  box-sizing: border-box;
  height: calc(100vh - 54px);
  overflow-y: auto;
  padding: ${({ $isTablet }) => ($isTablet ? "32px 20px" : "32px 64px")};
`;

const StyledContentImg = styled(Link)`
  width: 100px;
`;

const StyledLogo = styled.img`
  max-width: 100px;
`;

export {
  StyledAppPage,
  StyledContainer,
  StyledContentImg,
  StyledLogo,
  StyledMain,
};
