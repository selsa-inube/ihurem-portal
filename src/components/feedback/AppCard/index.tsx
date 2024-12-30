import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";
import { Divider } from "@inubekit/divider";
import { spacing } from "@design/tokens/spacing/spacing";

import { StyledAppCard } from "./styles";

interface AppCardProps {
  title: string;
  complement: string[];
  description: string;
  icon: React.ReactNode;
  url: string;
}

function AppCard(props: AppCardProps) {
  const { title, complement, description, icon, url } = props;

  return (
    <StyledAppCard to={url}>
      <Stack justifyContent="space-between">
        <Text type="title" size="medium" weight="bold">
          {title}
        </Text>
        <Icon icon={icon} appearance="dark" size="22px" cursorHover />
      </Stack>
      <Stack padding={`${spacing.s150} ${spacing.s0}`}>
        <Divider dashed />
      </Stack>
      <Stack direction="column" gap="12px">
        <Text type="title" size="small">
          {description}
        </Text>
        <Stack gap="8px" direction="column">
          {complement.map((text, index) => (
            <Text key={index} type="body" size="small">
              {text}
            </Text>
          ))}
        </Stack>
      </Stack>
    </StyledAppCard>
  );
}

export { AppCard };
export type { AppCardProps };
