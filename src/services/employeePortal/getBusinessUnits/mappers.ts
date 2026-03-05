import {
  BusinessManagersByBusinessesUnit,
  IBusinessUnitsPortalEmployee,
  PublicCodeTablesByBusinessesUnit,
  UseCasesByBusinessesUnit,
  IBusinessUnitsPortalEmployeeApi,
  IBusinessManagersByBusinessesUnitApi,
  IPublicCodeTablesByBusinessesUnitApi,
  IUseCasesByBusinessesUnitApi,
} from "@ptypes/employeePortalBusiness.types";

const mapBusinessUnitsPortalEmployeeApiToEntity = (
  businessUnit: IBusinessUnitsPortalEmployeeApi,
): IBusinessUnitsPortalEmployee => ({
  abbreviatedName: businessUnit.abbreviatedName ?? "",
  alias: businessUnit.alias ?? "",
  businessUnit: businessUnit.businessUnit ?? "",
  countryIso: businessUnit.countryIso ?? "",
  descriptionUse: businessUnit.descriptionUse ?? "",
  firstMonthOfFiscalYear: businessUnit.firstMonthOfFiscalYear ?? "",
  languageIso: businessUnit.languageIso ?? "",
  publicCode: businessUnit.publicCode ?? "",
  iconUrl: businessUnit.iconUrl ?? "",
  urlLogo: businessUnit.urlLogo ?? "",

  businessManagersByBusinessesUnit: Array.isArray(
    businessUnit.businessManagersByBusinessesUnit,
  )
    ? mapBusinessManagersByBusinessesUnit(
        businessUnit.businessManagersByBusinessesUnit,
      )
    : [],

  publicCodeTablesByBusinessesUnit: Array.isArray(
    businessUnit.publicCodeTablesByBusinessesUnit,
  )
    ? mapPublicCodeTablesByBusinessesUnit(
        businessUnit.publicCodeTablesByBusinessesUnit,
      )
    : [],

  useCasesByBusinessesUnit: Array.isArray(businessUnit.useCasesByBusinessesUnit)
    ? mapUseCasesByBusinessesUnit(businessUnit.useCasesByBusinessesUnit)
    : [],
});

const mapBusinessManagersByBusinessesUnit = (
  businessManagers: IBusinessManagersByBusinessesUnitApi[],
): BusinessManagersByBusinessesUnit[] =>
  businessManagers.map((bm) => ({
    businessManagerId: bm.businessManagerId ?? "",
    businessUnit: bm.businessUnit ?? "",
    isSame: bm.isSame ?? "",
  }));

const mapPublicCodeTablesByBusinessesUnit = (
  publicCodeTables: IPublicCodeTablesByBusinessesUnitApi[],
): PublicCodeTablesByBusinessesUnit[] =>
  publicCodeTables.map((pct) => ({
    algorithmToPublicCode: pct.algorithmToPublicCode ?? "",
    businessTableId: pct.businessTableId ?? "",
    businessUnit: pct.businessUnit ?? "",
    lengthToPublicCode: pct.lengthToPublicCode ?? 0,
    prefixToPublicCode: pct.prefixToPublicCode ?? "",
    publicCodeGeneration: pct.publicCodeGeneration ?? "",
  }));

const mapUseCasesByBusinessesUnit = (
  useCases: IUseCasesByBusinessesUnitApi[],
): UseCasesByBusinessesUnit[] =>
  useCases.map((uc) => ({
    businessUnit: uc.businessUnit ?? "",
    effectiveDate: uc.effectiveDate ?? "",
    useCaseName: uc.useCaseName ?? "",
  }));

const mapBusinessUnitsPortalEmployeeToEntities = (
  response: IBusinessUnitsPortalEmployeeApi[],
): IBusinessUnitsPortalEmployee[] =>
  response.map(mapBusinessUnitsPortalEmployeeApiToEntity);

export {
  mapBusinessUnitsPortalEmployeeApiToEntity,
  mapBusinessUnitsPortalEmployeeToEntities,
};
