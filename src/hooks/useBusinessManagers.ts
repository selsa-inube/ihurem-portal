import { useState, useEffect } from "react";
import { businessManagers } from "@src/services/staffPortal/getBusinessManager";
import {
  IBusinessManagers,
  IStaffPortalByBusinessManager,
} from "@ptypes/staffPortalBusiness.types";

export const useBusinessManagers = (
  portalPublicCode: IStaffPortalByBusinessManager[],
  portalCode: string | null,
) => {
  const [businessManagersData, setBusinessManagersData] =
    useState<IBusinessManagers>({} as IBusinessManagers);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchBusinessManagers = async () => {
      const portalPublicCodeFiltered = portalPublicCode.filter(
        (data) => data.staffPortalId === portalCode,
      );
      const foundBusiness = portalPublicCodeFiltered.find(
        (bussines) => bussines,
      )?.businessManagerId;

      if (portalPublicCodeFiltered.length > 0 && foundBusiness) {
        try {
          const newData = await businessManagers(foundBusiness);
          setBusinessManagersData(newData);
        } catch (error) {
          console.info(error);
          setHasError(true);
        }
      } else {
        console.error();
      }
    };

    void fetchBusinessManagers();
  }, [portalPublicCode, portalCode]);

  return { businessManagersData, hasError };
};
