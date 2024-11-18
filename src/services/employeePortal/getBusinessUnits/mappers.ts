import { IBusinessUnitsPortalEmployee } from "@ptypes/employeePortalBusiness.types";

const safeString = (value: unknown): string =>
  typeof value === "string" || typeof value === "number" ? String(value) : "";

const mapBusinessUnitsPortalStaffApiToEntity = (
  businessUnit: Record<string, string | number | object>,
): IBusinessUnitsPortalEmployee => {
  const businessUnitData: IBusinessUnitsPortalEmployee = {
    publicCode: safeString(businessUnit.businessUnitPublicCode),
    languageId: safeString(businessUnit.languageId),
    abbreviatedName: safeString(businessUnit.abbreviatedName),
    descriptionUse: safeString(businessUnit.descriptionUse),
    firstMonthOfFiscalYear: safeString(businessUnit.firstMonthOfFiscalYear),
    urlLogo: safeString(businessUnit.urlLogo),
  };
  return businessUnitData;
};

const mapBusinessUnitsPortalStaffToEntities = (
  resend: Record<string, string | number | object>[],
): IBusinessUnitsPortalEmployee[] => {
  return resend.map(mapBusinessUnitsPortalStaffApiToEntity);
};

export {
  mapBusinessUnitsPortalStaffToEntities,
  mapBusinessUnitsPortalStaffApiToEntity,
};
