import { IEmployeePortalByBusinessManager } from "@ptypes/employeePortalBusiness.types";

function toSafeString(value: unknown): string {
  if (value === null || value === undefined) {
    return "";
  }

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
    case "symbol":
    case "function":
    default:
      return "";
  }
}

const mapEmployeePortalByBusinessManagerApiToEntity = (
  resend: Record<string, unknown>,
): IEmployeePortalByBusinessManager => {
  return {
    abbreviatedName: toSafeString(resend.abbreviatedName),
    businessManagerId: toSafeString(resend.businessManagerId),
    businessUnit: toSafeString(resend.businessUnit),
    descriptionUse: toSafeString(resend.descriptionUse),
    portalCode: toSafeString(resend.portalCode),
    employeePortalCatalogId: toSafeString(resend.employeePortalCatalogId),
    employeePortalId: toSafeString(resend.employeePortalId),
    externalAuthenticationProvider: toSafeString(
      resend.externalAuthenticationProvider,
    ),
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
