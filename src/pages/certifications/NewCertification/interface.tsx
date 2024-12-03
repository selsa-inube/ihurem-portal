import { AppMenu } from "@components/layout/AppMenu";
import { IRoute } from "@components/layout/AppMenu/types";

interface NewCertificationUIProps {
  appName: string;
  appRoute: IRoute[];
  navigatePage: string;
  appDescription?: string;
}

function NewCertificationUI(props: NewCertificationUIProps) {
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

export { NewCertificationUI };
