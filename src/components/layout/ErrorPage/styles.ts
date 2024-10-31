import styled from "styled-components";
import { inube } from "@inubekit/foundations";

const StyledCompanyLogo = styled.img`
  max-width: 300px;

  @media screen and (max-width: 1000px) {
    margin: 0 auto;
    max-width: 250px;
  }
`;

const StyledErrorImage = styled.img`
  justify-self: center;
  max-width: 100%;
`;

const StyledFooter = styled.footer`
  bottom: 0;
  width: 100%;
  justify-content: center;
  position: absolute;
  padding: 16px 0px;
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N10 || inube.palette.neutral.N10};
`;

export { StyledCompanyLogo, StyledErrorImage, StyledFooter };
