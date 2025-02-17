import { Stack, Text, Icon, Divider, useMediaQuery } from "@inubekit/inubekit";

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

  const isMobile = useMediaQuery("(max-width: 450px)");

  return (
    <Stack direction="column">
      <Stack>
        <Text type="title" size="medium" weight="bold" appearance="gray">
          {title}
        </Text>
      </Stack>
      <StyledAlertCard $isMobile={isMobile}>
        <Stack direction="column" gap={spacing.s100} margin={spacing.s150}>
          <Stack
            direction="row"
            alignItems="center"
            gap="4px"
            justifyContent="space-between"
          >
            <Text type="body" size="large">
              Requisito:
            </Text>
            <Icon icon={icon} appearance="warning" size="20px" />
          </Stack>
          <Divider />
          <Text type="body" size="medium" appearance="gray">
            {requirement}
          </Text>
          <Stack direction="column" gap="4px">
            <Text type="body" size="large">
              Causa de incumplimiento:
            </Text>
            <Divider />
            <Text type="body" size="medium" appearance="gray">
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
