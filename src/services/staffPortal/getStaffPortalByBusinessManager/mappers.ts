import { IStaffPortalByBusinessManager } from "@ptypes/staffPortalBusiness.types";

const safeStringify = (
  value: string | number | object | null | undefined,
): string => {
  if (value && typeof value === "object") {
    return JSON.stringify(value);
  }
  return value !== null && value !== undefined ? String(value) : "";
};

const mapStaffPortalByBusinessManagerApiToEntity = (
  resend: Record<string, string | number | object>,
): IStaffPortalByBusinessManager => {
  const buildResend: IStaffPortalByBusinessManager = {
    abbreviatedName: safeStringify(resend.abbreviatedName),
    businessManagerId: safeStringify(resend.businessManagerId),
    descriptionUse: safeStringify(resend.descriptionUse),
    publicCode: safeStringify(resend.publicCode),
    staffPortalCatalogId: safeStringify(resend.staffPortalCatalogId),
    staffPortalId: safeStringify(resend.staffPortalId),
    url: safeStringify(resend.url),
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
