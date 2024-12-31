import styled from "styled-components";
import { Link } from "react-router-dom";
import { inube } from "@inubekit/foundations";
import { spacing } from "@design/tokens/spacing/spacing";

interface IStyledComplementContainer {
  theme: typeof inube;
}

interface IStyledAppCard {
  theme: typeof inube;
}

const StyledAppCard = styled(Link)<IStyledAppCard>`
  box-sizing: border-box;
  padding: ${spacing.s150} ${spacing.s300};
  height: 174px;
  max-height: 174px;
  width: 313px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  text-decoration: none;
  color: ${({ theme }) =>
    theme?.palette?.neutral?.N900 || inube.palette.neutral.N900};
  border: 1px solid
    ${({ theme }) => theme?.palette?.neutral?.N40 || inube.palette.neutral.N40};
  box-shadow: 0px 4px 8px 3px
    ${({ theme }) => theme?.palette?.neutral?.N40 || inube.palette.neutral.N40};

  cursor: pointer;

  &:hover {
    color: ${({ theme }) =>
      theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
    background-color: ${({ theme }) =>
      theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
    box-shadow: none;
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

const StyledComplementContainer = styled.div<IStyledComplementContainer>`
  overflow: auto;
  display: flex;
  height: 68px;
  flex-direction: column;
  width: auto;
  box-sizing: border-box;
  align-items: flex-start;
  border: 1px solid
    ${({ theme }) => theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
  padding: ${spacing.s025} ${spacing.s050};
  gap: ${spacing.s100};
  border-radius: ${spacing.s025};

  &::-webkit-scrollbar {
    width: 3px;
    border-radius: 8px;
    background-color: ${({ theme }) =>
      theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) =>
      theme?.palette?.neutral?.N50 || inube.palette.neutral.N50};
    border-radius: 8px;
  }
`;

export { StyledAppCard, StyledComplementContainer };
