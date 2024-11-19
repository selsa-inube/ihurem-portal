import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from "react";
import selsaLogo from "@assets/images/selsa.png";
import { useAuth0 } from "@auth0/auth0-react";
import { decrypt } from "@utils/encrypt";
import { IAppContextType, IPreferences, IProvisionedPortal } from "./types";
import { IBusinessUnitsPortalEmployee } from "@ptypes/employeePortalBusiness.types";
import { usePortalData } from "@hooks/usePortalData";
import { useBusinessManagers } from "@hooks/useBusinessManagers";

const AppContext = createContext<IAppContextType | undefined>(undefined);

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user: auth0User } = useAuth0();
  const [user, setUser] = useState<{
    username: string;
    id: string;
    company: string;
    urlImgPerfil: string;
  } | null>(
    auth0User
      ? {
          username: auth0User.name ?? "",
          id: auth0User.nickname ?? "",
          company: "Company Name",
          urlImgPerfil: auth0User.picture ?? "",
        }
      : null,
  );

  const initialLogo = localStorage.getItem("logoUrl") ?? selsaLogo;
  const [logoUrl, setLogoUrl] = useState<string>(initialLogo);

  const [preferences, setPreferences] = useState<IPreferences>({
    boardOrientation:
      (localStorage.getItem("boardOrientation") as "vertical" | "horizontal") ??
      "vertical",
    showPinnedOnly: false,
  });

  const [provisionedPortal, setProvisionedPortal] =
    useState<IProvisionedPortal | null>(null);

  const portalId = localStorage.getItem("portalCode");
  const portalCode = portalId ? decrypt(portalId) : "";

  const { portalData } = usePortalData(portalCode);

  const { businessManagersData } = useBusinessManagers(
    Array.isArray(portalData) ? portalData : [],
    portalCode,
  );

  const [businessUnitSigla, setBusinessUnitSigla] = useState(
    localStorage.getItem("businessUnitSigla") ?? "",
  );
  const [businessUnitsToTheStaff, setBusinessUnitsToTheStaff] = useState<
    IBusinessUnitsPortalEmployee[]
  >([]);

  const [appData, setAppData] = useState({
    portal: {
      abbreviatedName: "",
      staffPortalCatalogId: "",
      businessManagerId: "",
      publicCode: "",
    },
    businessManager: {
      publicCode: "",
      abbreviatedName: "",
      urlBrand: "",
      urlLogo: "",
    },
    businessUnit: {
      publicCode: "",
      abbreviatedName: "",
      languageId: "",
      urlLogo: "",
    },
    user: {
      userAccount: user?.username ?? "",
      userName: user?.username ?? "",
    },
  });

  useEffect(() => {
    if (!businessManagersData || !portalData) return;

    const portalDataFiltered = Array.isArray(portalData)
      ? portalData.find((data: any) => data.staffPortalId === portalCode)
      : null;

    if (portalDataFiltered) {
      setAppData((prev) => ({
        ...prev,
        portal: {
          ...prev.portal,
          abbreviatedName: portalDataFiltered.abbreviatedName || "",
          staffPortalCatalogId: portalDataFiltered.staffPortalId || "",
          businessManagerId: portalDataFiltered.businessManagerId || "",
          publicCode: portalDataFiltered.publicCode || "",
        },
        businessManager: {
          ...prev.businessManager,
          publicCode: businessManagersData.publicCode || "",
          abbreviatedName: businessManagersData.abbreviatedName || "",
          urlBrand: businessManagersData.urlBrand || "",
          urlLogo: businessManagersData.urlLogo || "",
        },
      }));
    }
  }, [businessManagersData, portalData, portalCode]);

  useEffect(() => {
    localStorage.setItem("businessUnitSigla", businessUnitSigla);

    if (businessUnitSigla) {
      const businessUnit = JSON.parse(businessUnitSigla);

      setAppData((prev) => ({
        ...prev,
        businessUnit: {
          ...prev.businessUnit,
          abbreviatedName: businessUnit?.abbreviatedName,
          publicCode: businessUnit?.publicCode,
          languageId: businessUnit?.languageId,
          urlLogo: businessUnit?.urlLogo,
        },
      }));
    }
  }, [businessUnitSigla, businessUnitsToTheStaff]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("logoUrl", logoUrl);
      localStorage.setItem("boardOrientation", preferences.boardOrientation);
    }
  }, [logoUrl, preferences, user]);

  const updatePreferences = (newPreferences: Partial<IPreferences>) => {
    setPreferences((prev) => ({ ...prev, ...newPreferences }));
  };

  const appContext = useMemo(
    () => ({
      user,
      setUser,
      preferences,
      updatePreferences,
      logoUrl,
      setLogoUrl,
      provisionedPortal,
      setProvisionedPortal,
      businessUnitSigla,
      setBusinessUnitSigla,
      businessUnitsToTheStaff,
      setBusinessUnitsToTheStaff,
      appData,
      setAppData,
      handleClientChange: () => {},
    }),
    [
      user,
      preferences,
      logoUrl,
      provisionedPortal,
      businessUnitSigla,
      businessUnitsToTheStaff,
      appData,
    ],
  );

  return (
    <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export { AppProvider, useAppContext };
