import { Outlet } from "react-router-dom";
import { Nav, Grid, Header, useMediaQuery } from "@inubekit/inubekit";

import {
  useNavConfig,
  userMenu,
  actions,
  useConfigHeader,
} from "@config/nav.config";
import { useEmployeeOptions } from "@hooks/useEmployeeOptions";
import { useAppContext } from "@context/AppContext/useAppContext";
import { useContractValidation } from "@hooks/useContractValidation";

import {
  StyledAppPage,
  StyledContainer,
  StyledContentImg,
  StyledLogo,
  StyledMain,
  StyledMainScroll,
} from "./styles";

interface AppPageProps {
  withNav?: boolean;
}

const renderLogo = (imgUrl: string, clientName: string) => {
  return imgUrl ? (
    <StyledContentImg to="/">
      <StyledLogo src={imgUrl} alt={clientName} />
    </StyledContentImg>
  ) : (
    <StyledContentImg to="/">{clientName}</StyledContentImg>
  );
};

function AppPage(props: AppPageProps) {
  const { withNav = true } = props;
  const { user, logoUrl, businessUnit } = useAppContext();
  const isTablet = useMediaQuery("(max-width: 944px)");

  const { data: employeeOptions } = useEmployeeOptions(user?.id ?? "");
  const safeEmployeeOptions = employeeOptions ?? [];

  const navConfig = useNavConfig(safeEmployeeOptions);
  const configHeader = useConfigHeader(safeEmployeeOptions);

  useContractValidation();

  return (
    <StyledAppPage>
      <Grid templateRows="auto 1fr" height="100vh" justifyContent="unset">
        <Header
          navigation={{ nav: configHeader, breakpoint: "800px" }}
          logoURL={renderLogo(
            businessUnit?.urlLogo ?? logoUrl,
            businessUnit?.abbreviatedName ?? "Sin unidad seleccionada",
          )}
          user={{
            username: user?.username ?? "Nombre de usuario",
            client: businessUnit?.abbreviatedName ?? "Sin unidad seleccionada",
            breakpoint: "800px",
          }}
          menu={userMenu}
        />
        <StyledContainer>
          <Grid
            templateColumns={withNav && !isTablet ? "auto 1fr" : "1fr"}
            alignContent="unset"
            height="95vh"
          >
            {withNav && !isTablet && (
              <Nav navigation={navConfig} actions={actions} collapse={true} />
            )}
            <StyledMainScroll>
              <StyledMain>
                <Outlet />
              </StyledMain>
            </StyledMainScroll>
          </Grid>
        </StyledContainer>
      </Grid>
    </StyledAppPage>
  );
}

export { AppPage };
