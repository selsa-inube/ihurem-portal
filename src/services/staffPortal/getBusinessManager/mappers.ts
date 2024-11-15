import { IBusinessManagers } from "@src/types/employeePortalBusiness.types";

const safeStringify = (
  value: string | number | object | null | undefined,
): string => {
  if (value && typeof value === "object") {
    return JSON.stringify(value);
  }
  return String(value);
};

const mapBusinessManagerApiToEntity = (
  businessManager: Record<string, string | number | object>,
): IBusinessManagers => {
  const business: IBusinessManagers = {
    id: safeStringify(businessManager.businessManagerId),
    publicCode: safeStringify(businessManager.publicCode),
    language: safeStringify(businessManager.languageId),
    abbreviatedName: safeStringify(businessManager.abbreviatedName),
    description: safeStringify(businessManager.descriptionUse),
    urlBrand: safeStringify(businessManager.urlBrand),
    urlLogo: safeStringify(businessManager.urlLogo),
    customerId: safeStringify(businessManager.customerId),
  };

  return business;
};

export { mapBusinessManagerApiToEntity };
