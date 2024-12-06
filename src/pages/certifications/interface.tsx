import { Button } from "@inubekit/button";
import { Stack } from "@inubekit/stack";
import { useMediaQuery } from "@inubekit/hooks";
import { MdOutlineAdd } from "react-icons/md";

import { AppMenu } from "@components/layout/AppMenu";
import { IRoute } from "@components/layout/AppMenu/types";
import { spacing } from "@design/tokens/spacing/spacing";

import { StyledCertificationsContainer } from "./styles";
import { CertificationsTable } from "./components/CertificationsTable";
import { generateData } from "./components/CertificationsTable/tableConfig";

interface CertificationsOptionsUIProps {
  appName: string;
  appRoute: IRoute[];
  navigatePage: string;
  appDescription?: string;
}

function CertificationsOptionsUI(props: CertificationsOptionsUIProps) {
  const { appName, appRoute, navigatePage, appDescription } = props;

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <>
      <AppMenu
        appName={appName}
        appDescription={appDescription}
        appRoute={appRoute}
        navigatePage={navigatePage}
      >
        <StyledCertificationsContainer $isMobile={isMobile}>
          <Stack
            gap={spacing.s150}
            justifyContent="end"
            width="100%"
            direction={isMobile ? "column" : "row"}
          >
            <Button
              spacing="wide"
              variant="filled"
              iconBefore={<MdOutlineAdd />}
              type="link"
              path="/certifications/new-certification"
              fullwidth={isMobile}
            >
              Nueva certificación
            </Button>
          </Stack>
          <CertificationsTable data={generateData()} />
        </StyledCertificationsContainer>
      </AppMenu>
    </>
  );
}

export { CertificationsOptionsUI };
