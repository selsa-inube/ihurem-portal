import { IEmployeePortalByBusinessManager } from "@src/types/employeePortalBusiness.types";

const mapEmployeePortalByBusinessManagerApiToEntity = (
  resend: Record<string, string | number | object>,
): IEmployeePortalByBusinessManager => {
  const buildResend: IEmployeePortalByBusinessManager = {
    abbreviatedName: String(resend.abbreviatedName),
    businessManagerId: String(resend.businessManagerId),
    businessUnit: String(resend.businessUnit),
    descriptionUse: String(resend.descriptionUse),
    portalCode: String(resend.portalCode),
    employeePortalCatalogId: String(resend.employeePortalCatalogId),
    employeePortalId: String(resend.employeePortalId),
  };
  return buildResend;
};

const mapEmployeePortalByBusinessManagerApiToEntities = (
  resend: Record<string, string | number | object>[],
): IEmployeePortalByBusinessManager[] => {
  return resend.map(mapEmployeePortalByBusinessManagerApiToEntity);
};

export {
  mapEmployeePortalByBusinessManagerApiToEntities,
  mapEmployeePortalByBusinessManagerApiToEntity,
};
