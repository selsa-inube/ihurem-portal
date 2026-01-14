import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

import textureBackground from "@assets/images/texturebackground.png";
import { spacing } from "@design/tokens/spacing";

interface IStyledVacationsApproval {
  theme: typeof inube;
}

interface IStyledFooter {
  theme: typeof inube;
}

const StyledVacationsApproval = styled.div<IStyledVacationsApproval>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${spacing.s200};
  width: 100%;
  height: 89vh;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url(${textureBackground});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const StyledFooter = styled.footer<IStyledFooter>`
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 6vh;
  & p {
    line-height: 5vh;
  }
`;

export { StyledVacationsApproval, StyledFooter };
