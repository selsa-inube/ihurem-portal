import { Text } from "@inubekit/inubekit";

import { StyledTooltipContainer } from "./styles";

export interface TooltipProps {
  text: string;
}

function Tooltip(props: TooltipProps) {
  const { text } = props;
  return (
    <StyledTooltipContainer>
      <Text size="small" appearance="light">
        {text}
      </Text>
    </StyledTooltipContainer>
  );
}
export { Tooltip };
