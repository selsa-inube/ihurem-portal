import { useParams } from "react-router-dom";
import { Text } from "@inubekit/inubekit";

import { useAppContext } from "@context/AppContext/useAppContext";
import { labels } from "@i18n/labels";

import { StyledVacationsApproval, StyledFooter } from "./styles";
import { HolidaysConfirmationForm } from "./holidaysConfirmationForm";

function HolidaysConfirmation() {
  const { user } = useAppContext();
  const { requestId } = useParams();
  return (
    <>
      <StyledVacationsApproval>
        <HolidaysConfirmationForm
          humanResourceRequestId={requestId ?? ""}
          userWhoExecutedAction={user?.id ?? ""}
        />
      </StyledVacationsApproval>

      <StyledFooter>
        <Text textAlign="center" size="large" appearance="gray">
          {labels.holidays.footer.copyright}
        </Text>
      </StyledFooter>
    </>
  );
}

export { HolidaysConfirmation };
