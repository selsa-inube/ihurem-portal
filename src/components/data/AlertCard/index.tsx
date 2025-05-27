import {
  Stack,
  Text,
  Icon,
  Divider,
  IIconAppearance,
} from "@inubekit/inubekit";
import { spacing } from "@design/tokens/spacing";

import { StyledAlertCard } from "./styles";

interface AlertCardProps {
  requirement: string;
  cause: string;
  icon: React.ReactNode;
  title?: string;
  iconAppearance?: IIconAppearance;
  ellipsis?: boolean;
}

function AlertCard(props: AlertCardProps) {
  const {
    requirement,
    cause,
    icon,
    title,
    iconAppearance = "warning",
    ellipsis = false,
  } = props;

  return (
    <Stack direction="column">
      {title && (
        <Stack>
          <Text type="title" size="medium" weight="bold" appearance="gray">
            {title}
          </Text>
        </Stack>
      )}
      <StyledAlertCard>
        <Stack direction="column" gap={spacing.s200}>
          <Stack direction="column" gap={spacing.s050}>
            <Stack alignItems="center" justifyContent="space-between">
              <Text>Requisito:</Text>
              <Icon icon={icon} appearance={iconAppearance} size="22px" />
            </Stack>
            <Divider />
            <Text size="medium" appearance="gray" ellipsis={ellipsis}>
              {requirement}
            </Text>
          </Stack>
          <Stack direction="column" gap={spacing.s050}>
            <Stack direction="column" gap={spacing.s050}>
              <Text>Causa de incumplimiento:</Text>
              <Divider />
              <Text size="medium" appearance="gray" ellipsis={ellipsis}>
                {cause}
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </StyledAlertCard>
    </Stack>
  );
}

export { AlertCard };
export type { AlertCardProps };
