import { Stack } from "@inubekit/stack";
import { Breadcrumbs } from "@inubekit/breadcrumbs";

import { PageTitle } from "../PageTitle";
import { StyledAppMenu } from "./styles";
import { IRoute } from "./types";

interface AppMenuProps {
  appName: string;
  appRoute: IRoute[];
  children: React.ReactNode;
  appDescription?: string;
}

function AppMenu(props: AppMenuProps) {
  const { appName, appRoute, children, appDescription } = props;

  return (
    <StyledAppMenu>
      <Breadcrumbs crumbs={appRoute} />
      <Stack margin="24px 0px 24px 0px">
        <PageTitle
          title={appName}
          description={appDescription}
          navigatePage="/"
        />
      </Stack>
      {children}
    </StyledAppMenu>
  );
}

export { AppMenu };
export type { AppMenuProps };
