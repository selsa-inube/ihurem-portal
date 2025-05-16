import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

interface IStyledBorderedTag {
  $color: "success" | "danger" | "warning";
  theme?: typeof inube;
}

const getTagColors = (
  appearance: "success" | "danger" | "warning",
  theme: typeof inube,
) => {
  const palette = theme?.palette || inube.palette;

  switch (appearance) {
    case "success":
      return {
        background: palette.green.G50,
        border: palette.green.G400,
      };
    case "danger":
      return {
        background: palette.red.R50,
        border: palette.red.R400,
      };
    case "warning":
      return {
        background: palette.yellow.Y50,
        border: palette.yellow.Y400,
      };
  }
};

export const StyledBorderedTag = styled.span<IStyledBorderedTag>`
  display: inline-flex;
  padding: 0px 8px;
  border-radius: 16px;
  background-color: ${({ $color, theme }) =>
    getTagColors($color, theme || inube).background};
  border: 1px solid
    ${({ $color, theme }) => getTagColors($color, theme || inube).border};
`;
