import { Icon, Stack, Text } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing/spacing";

import { StyledWidget } from "./styles";

export interface WidgetProps {
  icon: JSX.Element;
  value: number | string;
  label: string;
  onClick?: () => void;
}

function Widget(props: WidgetProps) {
  const { icon, value, label, onClick } = props;

  return (
    <StyledWidget onClick={onClick} clickable={!!onClick}>
      <Stack alignItems="center" gap={spacing.s100}>
        <Icon icon={icon} appearance="gray" size="24px" />
        <Text type="title" weight="bold" appearance="primary">
          {value}
        </Text>
      </Stack>
      <Text type="label" size="small" appearance="gray">
        {label}
      </Text>
    </StyledWidget>
  );
}

export { Widget };
