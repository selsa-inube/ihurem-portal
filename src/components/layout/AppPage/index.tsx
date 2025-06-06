import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Nav, Grid, Header, useMediaQuery } from "@inubekit/inubekit";

import {
  useNavConfig,
  userMenu,
  actions,
  useConfigHeader,
} from "@config/nav.config";
import { useAppContext } from "@context/AppContext/useAppContext";
import { useEmployee } from "@hooks/useEmployee";
import { EmploymentContract } from "@ptypes/employeePortalConsultation.types";

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

const FORMALIZED_STATUS = "Formalized";

const isContractActive = (status: string, deadline: string): boolean => {
  if (status !== FORMALIZED_STATUS) return false;

  if (!deadline) return true;

  const currentDate = new Date();
  const endDate = new Date(deadline);
  return endDate > currentDate;
};

const areAllContractsFinalized = (contracts: EmploymentContract[]): boolean => {
  if (!contracts || contracts.length === 0) return true;

  return contracts.every(
    (contract) =>
      contract.contractStatus === "Finalized" ||
      !isContractActive(contract.contractStatus, contract.deadline),
  );
};

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
  const { user, logoUrl, businessUnit, employees } = useAppContext();
  const { employee } = useEmployee(employees.employeeId);
  const navigate = useNavigate();
  const isTablet = useMediaQuery("(max-width: 944px)");

  const navConfig = useNavConfig();
  const configHeader = useConfigHeader();

  const contracts = employee?.employmentContracts ?? [];

  useEffect(() => {
    if (contracts.length > 0 && areAllContractsFinalized(contracts)) {
      alert(
        "Todos sus contratos han finalizado. La sesión se cerrará automáticamente.",
      );

      navigate("/logout");
    }
  }, [contracts, navigate]);

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
