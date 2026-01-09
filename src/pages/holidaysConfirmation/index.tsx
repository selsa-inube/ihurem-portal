import { Text } from "@inubekit/inubekit";

import { useAppContext } from "@context/AppContext/useAppContext";

import { StyledVacationsApproval, StyledFooter } from "./styles";
import { HolidaysConfirmationForm } from "./holidaysConfirmationForm";

function HolidaysConfirmation() {
  const { user } = useAppContext();

  return (
    <>
      <StyledVacationsApproval>
        <HolidaysConfirmationForm
          humanResourceRequestId={"48a9ec79-60a5-4bf3-b868-8702b04e9cce"}
          userWhoExecutedAction={user?.id ?? ""}
          taskManagingId={user?.id ?? ""}
        />
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
