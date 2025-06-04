import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMediaQuery } from "@inubekit/inubekit";

import { useHumanResourceRequests } from "@hooks/useHumanResourceRequests";
import { useDeleteRequest } from "@hooks/useDeleteRequest";
import { useErrorFlag } from "@hooks/useErrorFlag";

import { formatHumanResourceData } from "./config/table.config";
import { CertificationsOptionsUI } from "./interface";
import { breadcrumbs } from "./config/nav.config";
import { ICertificationsTable } from "./components/CertificationsTable/types";

function CertificationsOptions() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const {
    data: fetchedData,
    isLoading,
    error,
  } = useHumanResourceRequests<ICertificationsTable>(
    "Certification",
    formatHumanResourceData,
  );
  const [tableData, setTableData] = useState<ICertificationsTable[]>([]);

  useEffect(() => {
    setTableData(fetchedData);
  }, [fetchedData]);

  useEffect(() => {
    if (error) {
      console.error("Error fetching certifications:", error.message);
    }
  }, [error]);

  const { handleDelete } = useDeleteRequest((filterFn) => {
    setTableData((prev) => prev.filter(filterFn));
  });

  useErrorFlag(
    location.state?.showFlag,
    location.state?.flagMessage,
    location.state?.flagTitle,
    location.state?.isSuccess,
  );

  useEffect(() => {
    if (location.state?.showFlag) {
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  return (
    <CertificationsOptionsUI
      appName={breadcrumbs.label}
      appRoute={breadcrumbs.crumbs}
      navigatePage={breadcrumbs.url}
      tableData={tableData}
      isLoading={isLoading}
      isMobile={isMobile}
      handleDeleteRequest={(requestId, justification) => {
        const request = tableData.find((item) => item.requestId === requestId);
        const requestNumber = request?.requestNumber?.value ?? "";
        void handleDelete(requestId, justification, requestNumber);
      }}
    />
  );
}

export { CertificationsOptions };
