import { AppMenu } from "@components/layout/AppMenu";
import { IRoute } from "@components/layout/AppMenu/types";

interface RequestPaymentUIProps {
  appName: string;
  appRoute: IRoute[];
  navigatePage: string;
  appDescription?: string;
}

function RequestPaymentUI(props: RequestPaymentUIProps) {
  const { appName, appRoute, navigatePage, appDescription } = props;

  return (
    <AppMenu
      appName={appName}
      appDescription={appDescription}
      appRoute={appRoute}
      navigatePage={navigatePage}
    >
      <></>
    </AppMenu>
  );
}

export { RequestPaymentUI };
