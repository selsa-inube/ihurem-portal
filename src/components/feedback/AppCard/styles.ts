import styled from "styled-components";
import { Link } from "react-router-dom";
import { inube } from "@inubekit/foundations";
import { spacing } from "@design/tokens/spacing/spacing";

const StyledAppCard = styled(Link)`
  box-sizing: border-box;
  padding: ${spacing.s150} ${spacing.s300};
  height: 174px;
  overflow: auto;
  max-height: 174px;
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

  &::-webkit-scrollbar {
    width: 8px;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) =>
      theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
    border-radius: 8px;
  }

  @media (max-width: 400px) {
    padding: ${spacing.s200};
    width: 100%;
    min-height: 100px;
    gap: ${spacing.s100};

    div {
      gap: ${spacing.s050};
    }
  }
`;

export { StyledAppCard };
