import { IBusinessManagers } from "@ptypes/employeePortalBusiness.types";

const mapBusinessManagerApiToEntity = (
  businessManager: Record<string, unknown>,
): IBusinessManagers => {
  const toStringSafe = (value: unknown): string => {
    if (typeof value === "string" || typeof value === "number") {
      return String(value);
    }
    return "";
  };

  const business: IBusinessManagers = {
    id: toStringSafe(businessManager.businessManagerId),
    publicCode: toStringSafe(businessManager.publicCode),
    language: toStringSafe(businessManager.languageId),
    abbreviatedName: toStringSafe(businessManager.abbreviatedName),
    description: toStringSafe(businessManager.descriptionUse),
    urlBrand: toStringSafe(businessManager.urlBrand),
    urlLogo: toStringSafe(businessManager.urlLogo),
    customerId: toStringSafe(businessManager.customerId),
  };

  return business;
};

export { mapBusinessManagerApiToEntity };
