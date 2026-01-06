import { Text } from "@inubekit/inubekit";

import { StyledVacationsApproval, StyledFooter } from "./styles";
import { HolidaysConfirmationForm } from "./holidaysConfirmationForm";

function HolidaysConfirmation() {
  return (
    <>
      <StyledVacationsApproval>
        <HolidaysConfirmationForm />
      </StyledVacationsApproval>
      <StyledFooter>
        <Text textAlign="center" size="large" appearance="gray">
          © *Marca*
        </Text>
      </StyledFooter>
    </>
  );
}

export { HolidaysConfirmation };
