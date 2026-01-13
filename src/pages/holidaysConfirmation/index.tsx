import { Text } from "@inubekit/inubekit";

import { useSearchParams } from "react-router-dom";
import { useAppContext } from "@context/AppContext/useAppContext";

import { StyledVacationsApproval, StyledFooter } from "./styles";
import { HolidaysConfirmationForm } from "./holidaysConfirmationForm";

function HolidaysConfirmation() {
  const { user } = useAppContext();
  const [searchParams] = useSearchParams();

  const humanResourceRequestId = searchParams.get("requestId") ?? "";

  return (
    <>
      <StyledVacationsApproval>
        <HolidaysConfirmationForm
          humanResourceRequestId={humanResourceRequestId}
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
