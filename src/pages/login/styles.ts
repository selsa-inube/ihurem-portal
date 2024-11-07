import styled from "styled-components";
import { inube } from "@inubekit/foundations";

const StyledWelcomeContainer = styled.div`
  background-color: ${inube.palette.neutral.N30};
`;

const StyledOutletContainer = styled(StyledWelcomeContainer)`
  background-color: ${inube.palette.neutral.N0};
`;

export { StyledWelcomeContainer, StyledOutletContainer };
