import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMediaQuery } from "@inubekit/inubekit";

import { useErrorFlag } from "@hooks/useErrorFlag";
import { useDeleteRequest } from "@hooks/useDeleteRequest";
import { getHumanResourceRequests } from "@services/humanResourcesRequest/getHumanResourcesRequest";

import { CertificationsOptionsUI } from "./interface";
import { certificationsNavConfig } from "./config/nav.config";
import { ICertificationsTable } from "./components/CertificationsTable/types";
import { formatHumanResourceData } from "./config/table.config";

function CertificationsOptions() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState<ICertificationsTable[]>([]);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const fetchHumanResourceRequests = async () => {
      setIsLoading(true);

      try {
        const requests = await getHumanResourceRequests("certification", "");
        const formattedData = formatHumanResourceData(requests ?? []);
        setTableData(formattedData);
      } catch (error) {
        console.error(
          "Error al obtener las solicitudes de recursos humanos:",
          error,
        );
        setTableData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHumanResourceRequests();
  }, []);

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
      appName={certificationsNavConfig[0].label}
      appRoute={certificationsNavConfig[0].crumbs}
      navigatePage={certificationsNavConfig[0].url}
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
