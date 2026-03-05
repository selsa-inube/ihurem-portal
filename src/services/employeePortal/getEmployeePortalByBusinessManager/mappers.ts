import {
  IEmployeePortalByBusinessManager,
  IOptionsByEmployeePortalBusinessManagers,
} from "@ptypes/employeePortalBusiness.types";

function toSafeString(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "object") {
    try {
      return JSON.stringify(value);
    } catch {
      return "";
    }
  }
  switch (typeof value) {
    case "boolean":
    case "number":
    case "string":
    case "bigint":
      return String(value);
    default:
      return "";
  }
}

const mapOptionsByEmployeePortalBusinessManagers = (
  options: unknown,
): IOptionsByEmployeePortalBusinessManagers[] => {
  if (!Array.isArray(options)) return [];
  return options.map((option: Record<string, unknown>) => ({
    employeePortalId: toSafeString(option.employeePortalId),
    optionCode: toSafeString(option.optionCode),
    portalCatalogCode: toSafeString(option.portalCatalogCode),
  }));
};

const mapEmployeePortalByBusinessManagerApiToEntity = (
  resend: Record<string, unknown>,
): IEmployeePortalByBusinessManager => {
  return {
    abbreviatedName: toSafeString(resend.abbreviatedName),
    brandImageUrl: toSafeString(resend.brandImageUrl),
    businessManagerCode: toSafeString(resend.businessManagerCode),
    businessManagerName: toSafeString(resend.businessManagerName),
    businessUnitCode: toSafeString(resend.businessUnitCode),
    businessUnitName: toSafeString(resend.businessUnitName),
    descriptionUse: toSafeString(resend.descriptionUse),
    employeePortalId: toSafeString(resend.employeePortalId),
    externalAuthenticationProvider: toSafeString(
      resend.externalAuthenticationProvider,
    ),
    optionsByEmployeePortalBusinessManagers:
      mapOptionsByEmployeePortalBusinessManagers(
        resend.optionsByEmployeePortalBusinessManagers,
      ),
    portalCatalogCode: toSafeString(resend.portalCatalogCode),
    portalCode: toSafeString(resend.portalCode),
    url: toSafeString(resend.url),
  };
};

const mapEmployeePortalByBusinessManagerApiToEntities = (
  resendArray: Record<string, unknown>[],
): IEmployeePortalByBusinessManager[] => {
  return resendArray.map(mapEmployeePortalByBusinessManagerApiToEntity);
};

export {
  mapEmployeePortalByBusinessManagerApiToEntity,
  mapEmployeePortalByBusinessManagerApiToEntities,
};
