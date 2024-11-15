import { IStaffPortalByBusinessManager } from "@src/types/employeePortalBusiness.types";

const mapStaffPortalByBusinessManagerApiToEntity = (
  resend: Record<string, string | number | object>,
): IStaffPortalByBusinessManager => {
  const buildResend: IStaffPortalByBusinessManager = {
    abbreviatedName:
      typeof resend.abbreviatedName === "object"
        ? JSON.stringify(resend.abbreviatedName)
        : String(resend.abbreviatedName),
    businessManagerId:
      typeof resend.businessManagerId === "object"
        ? JSON.stringify(resend.businessManagerId)
        : String(resend.businessManagerId),
    descriptionUse:
      typeof resend.descriptionUse === "object"
        ? JSON.stringify(resend.descriptionUse)
        : String(resend.descriptionUse),
    publicCode:
      typeof resend.publicCode === "object"
        ? JSON.stringify(resend.publicCode)
        : String(resend.publicCode),
    staffPortalCatalogId:
      typeof resend.staffPortalCatalogId === "object"
        ? JSON.stringify(resend.staffPortalCatalogId)
        : String(resend.staffPortalCatalogId),
    staffPortalId:
      typeof resend.staffPortalId === "object"
        ? JSON.stringify(resend.staffPortalId)
        : String(resend.staffPortalId),
    url:
      typeof resend.url === "object"
        ? JSON.stringify(resend.url)
        : String(resend.url),
  };
  return buildResend;
};
const mapStaffPortalByBusinessManagerApiToEntities = (
  resend: Record<string, string | number | object>[],
): IStaffPortalByBusinessManager[] => {
  return resend.map(mapStaffPortalByBusinessManagerApiToEntity);
};
export {
  mapStaffPortalByBusinessManagerApiToEntities,
  mapStaffPortalByBusinessManagerApiToEntity,
};
