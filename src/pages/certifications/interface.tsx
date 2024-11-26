import { Button } from "@inubekit/button";
import { Stack } from "@inubekit/stack";
import { MdOutlineAdd } from "react-icons/md";
import { useMediaQuery } from "@inubekit/hooks";

import { AppMenu } from "@components/layout/AppMenu";
import { IRoute } from "@components/layout/AppMenu/types";
import { spacing } from "@design/tokens/spacing/spacing";
import { StyledCertificationsContainer } from "./styles";
import { CertificationsTable } from "./components/CertificationsTable";
import { generateData } from "./components/CertificationsTable/tableConfig";

interface CertificationsOptionsUIProps {
  appName: string;
  appDescription?: string;
  appRoute: IRoute[];
}

function CertificationsOptionsUI(props: CertificationsOptionsUIProps) {
  const { appName, appDescription, appRoute } = props;

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <>
      <AppMenu
        appName={appName}
        appDescription={appDescription}
        appRoute={appRoute}
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
