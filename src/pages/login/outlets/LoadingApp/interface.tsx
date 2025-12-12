import { Text, Stack, Spinner } from "@inubekit/inubekit";

import { labels } from "@i18n/labels";
import { spacing } from "@design/tokens/spacing";

interface LoadingAppUIProps {
  inLogin?: boolean;
}

function LoadingAppUI(props: LoadingAppUIProps) {
  const { inLogin = false } = props;
  return (
    <Stack
      gap={spacing.s200}
      direction="column"
      justifyContent="center"
      alignItems="center"
      height={inLogin ? "auto" : "100vh"}
    >
      <Stack direction="column">
        <Text type="title" textAlign="center">
          {labels.loginLabels.loadingApp.mainTitle}
        </Text>
        <Text type="title" size="small" textAlign="center">
          {labels.loginLabels.loadingApp.subTitle}
        </Text>
      </Stack>
      <Stack alignItems="center" direction="column">
        <Spinner size="large" />
      </Stack>
    </Stack>
  );
}

export { LoadingAppUI };
