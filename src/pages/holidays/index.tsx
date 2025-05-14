import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMediaQuery } from "@inubekit/inubekit";

import { getHumanResourceRequests } from "@services/humanResourcesRequest/getHumanResourcesRequest";
import { useDeleteRequest } from "@hooks/useDeleteRequest";
import { useErrorFlag } from "@hooks/useErrorFlag";

import { formatHolidaysData } from "./config/table.config";
import { HolidaysOptionsUI } from "./interface";
import { holidaysNavConfig } from "./config/nav.config";
import { IHolidaysTable } from "./components/HolidaysTable/types";

interface LocationState {
  showFlag?: boolean;
  flagMessage?: string;
  flagTitle?: string;
  isSuccess?: boolean;
}

function HolidaysOptions() {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as LocationState | null;
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState<IHolidaysTable[]>([]);

  const hasActiveContract = true;
  const hasEnjoymentPrivilege = true;
  const hasPaymentPrivilege = true;

  const mainNavItem = holidaysNavConfig[0];

  const fetchHolidaysData = async () => {
    setIsLoading(true);
    try {
      const requests = await getHumanResourceRequests("vacations", "");
      setTableData(formatHolidaysData(requests ?? []));

      if (locationState?.showFlag) {
        navigate(location.pathname, { replace: true });
      }
    } catch (error) {
      setTableData([]);
      showError(
        error instanceof Error
          ? error.message
          : "An error occurred while fetching data.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const showError = (message: string) => {
    navigate(location.pathname, {
      state: {
        showFlag: true,
        flagMessage: message,
        flagTitle: "Error",
        isSuccess: false,
      },
      replace: true,
    });
  };

  const handleDeleteRequest = (requestId: string, justification: string) => {
    const request = tableData.find((item) => item.requestId === requestId);
    const requestNumber = request?.requestNumber ?? "";
    void handleDelete(requestId, justification, requestNumber);
  };

  const { handleDelete } = useDeleteRequest((filterFn) => {
    setTableData((prev) => prev.filter(filterFn));
  });

  useEffect(() => {
    void fetchHolidaysData();
  }, []);

  useEffect(() => {
    if (locationState?.showFlag) {
      const timer = setTimeout(() => {
        navigate(location.pathname, { replace: true });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [locationState?.showFlag, navigate, location.pathname]);

  useErrorFlag(
    locationState?.showFlag ?? false,
    locationState?.flagMessage,
    locationState?.flagTitle,
    locationState?.isSuccess ?? false,
  );

  return (
    <HolidaysOptionsUI
      appName={mainNavItem.label}
      appRoute={mainNavItem.crumbs}
      navigatePage={mainNavItem.url}
      tableData={tableData}
      isLoading={isLoading}
      hasActiveContract={hasActiveContract}
      isMobile={isMobile}
      hasEnjoymentPrivilege={hasEnjoymentPrivilege}
      hasPaymentPrivilege={hasPaymentPrivilege}
      handleDeleteRequest={handleDeleteRequest}
    />
  );
}

export { HolidaysOptions };
