import styled from "styled-components";
import { Link } from "react-router-dom";
import { inube } from "@inubekit/foundations";

const StyledAppCard = styled(Link)`
  box-sizing: border-box;
  padding: 12px 24px;
  height: 174px;
  width: 313px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  text-decoration: none;
  color: ${({ theme }) =>
    theme?.color?.stroke.dark.regular || inube.palette.neutral.N900};
  border: 1px solid
    ${({ theme }) =>
      theme?.color?.stroke.dark.regular || inube.palette.neutral.N30};
  box-shadow: 3px 3px 5px 1px
    ${({ theme }) =>
      theme?.color?.surface?.gray?.regular || inube.palette.neutral.N30};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) =>
      theme?.color?.surface?.gray?.regular || inube.palette.neutral.N30};
    background-color: ${({ theme }) =>
      theme?.color?.surface?.gray?.regular || inube.palette.neutral.N30};
    box-shadow: none;
  }

  @media (max-width: 400px) {
    padding: 16px;
    width: 100%;
    min-height: 100px;
    gap: 8px;

    div {
      gap: 4px;
    }
  }
`;

export { StyledAppCard };
