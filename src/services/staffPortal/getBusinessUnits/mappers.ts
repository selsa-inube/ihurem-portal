import { IBusinessUnitsPortalStaff } from "@ptypes/staffPortalBusiness.types";

const safeStringify = (
  value: string | number | object | null | undefined,
): string => {
  if (value && typeof value === "object") {
    return JSON.stringify(value);
  }
  return String(value);
};

const mapBusinessUnitsPortalStaffApiToEntity = (
  businessUnit: Record<string, string | number | object>,
): IBusinessUnitsPortalStaff => {
  const businessUnitData: IBusinessUnitsPortalStaff = {
    publicCode: safeStringify(businessUnit.businessUnitPublicCode),
    languageId: safeStringify(businessUnit.languageId),
    abbreviatedName: safeStringify(businessUnit.abbreviatedName),
    descriptionUse: safeStringify(businessUnit.descriptionUse),
    firstMonthOfFiscalYear: safeStringify(businessUnit.firstMonthOfFiscalYear),
    urlLogo: safeStringify(businessUnit.urlLogo),
  };
  return businessUnitData;
};

const mapBusinessUnitsPortalStaffToEntities = (
  resend: Record<string, string | number | object>[],
): IBusinessUnitsPortalStaff[] => {
  return resend.map(mapBusinessUnitsPortalStaffApiToEntity);
};

export {
  mapBusinessUnitsPortalStaffToEntities,
  mapBusinessUnitsPortalStaffApiToEntity,
};
