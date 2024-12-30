import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";
import { Divider } from "@inubekit/divider";
import { spacing } from "@design/tokens/spacing/spacing";
import { StyledAlertCard } from "./styles";

interface AlertCardProps {
  title: string;
  requirement: string;
  cause: string;
  icon: React.ReactNode;
}

function AlertCard(props: AlertCardProps) {
  const { title, requirement, cause, icon } = props;

  return (
    <Stack direction="column">
      <Stack>
        <Text type="title" size="medium" weight="bold" appearance="gray">
          {title}
        </Text>
      </Stack>
      <StyledAlertCard>
        <Stack direction="column" gap={spacing.s100} margin={spacing.s150}>
          <Stack
            direction="row"
            alignItems="center"
            gap="4px"
            justifyContent="space-between"
          >
            <Text type="title" size="small" weight="bold">
              Requisito:
            </Text>
            <Icon icon={icon} appearance="warning" size="20px" />
          </Stack>
          <Divider />
          <Text type="body" size="small">
            {requirement}
          </Text>
          <Stack direction="column" gap="4px">
            <Text type="title" size="small" weight="bold">
              Causa de incumplimiento:
            </Text>
            <Divider />
            <Text type="body" size="small">
              {cause}
            </Text>
          </Stack>
        </Stack>
      </StyledAlertCard>
    </Stack>
  );
}

export { AlertCard };
export type { AlertCardProps };
