import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

interface IStyledWidget {
  theme: typeof inube;
  clickable?: boolean;
}

const StyledWidget = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "clickable",
})<IStyledWidget>`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: ${({ clickable }) => (clickable ? "pointer" : "default")};
`;

export { StyledWidget };
