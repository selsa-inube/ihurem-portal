import { MdWarningAmber } from "react-icons/md";

import { labels } from "@i18n/labels";

export const alerts = labels.holidays.alerts.map((alert) => ({
  ...alert,
  icon: <MdWarningAmber />,
}));
