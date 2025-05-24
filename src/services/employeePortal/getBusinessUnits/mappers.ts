import {
  BusinessManagersByBusinessesUnit,
  IBusinessUnitsPortalEmployee,
  PublicCodeTablesByBusinessesUnit,
  UseCasesByBusinessesUnit,
} from "@ptypes/employeePortalBusiness.types";

const mapBusinessUnitsPortalEmployeeApiToEntity = (
  businessUnit: Record<string, string | number | object>,
): IBusinessUnitsPortalEmployee => {
  const businessUnitData: IBusinessUnitsPortalEmployee = {
    abbreviatedName:
      typeof businessUnit.abbreviatedName === "string" ||
      typeof businessUnit.abbreviatedName === "number"
        ? String(businessUnit.abbreviatedName)
        : "",
    businessManagersByBusinessesUnit:
      businessUnit.businessManagersByBusinessesUnit
        ? mapBusinessManagersByBusinessesUnit(
            businessUnit.businessManagersByBusinessesUnit as Record<
              string,
              string | number | object
            >[],
          )
        : [],
    businessUnit:
      typeof businessUnit.businessUnit === "string" ||
      typeof businessUnit.businessUnit === "number"
        ? String(businessUnit.businessUnit)
        : "",
    descriptionUse:
      typeof businessUnit.descriptionUse === "string" ||
      typeof businessUnit.descriptionUse === "number"
        ? String(businessUnit.descriptionUse)
        : "",
    firstMonthOfFiscalYear:
      typeof businessUnit.firstMonthOfFiscalYear === "string" ||
      typeof businessUnit.firstMonthOfFiscalYear === "number"
        ? String(businessUnit.firstMonthOfFiscalYear)
        : "",
    languageId:
      typeof businessUnit.languageId === "string" ||
      typeof businessUnit.languageId === "number"
        ? String(businessUnit.languageId)
        : "",
    publicCode:
      typeof businessUnit.publicCode === "string" ||
      typeof businessUnit.publicCode === "number"
        ? String(businessUnit.publicCode)
        : "",
    publicCodeTablesByBusinessesUnit:
      businessUnit.publicCodeTablesByBusinessesUnit
        ? mapPublicCodeTablesByBusinessesUnit(
            businessUnit.publicCodeTablesByBusinessesUnit as Record<
              string,
              string | number | object
            >[],
          )
        : [],
    urlLogo:
      typeof businessUnit.urlLogo === "string" ||
      typeof businessUnit.urlLogo === "number"
        ? String(businessUnit.urlLogo)
        : "",
    useCasesByBusinessesUnit: Array.isArray(
      businessUnit.useCasesByBusinessesUnit,
    )
      ? mapUseCasesByBusinessesUnit(
          businessUnit.useCasesByBusinessesUnit as Record<
            string,
            string | number | object
          >[],
        )
      : [],
  };
  return businessUnitData;
};

const mapBusinessManagersByBusinessesUnit = (
  businessManagers: Record<string, string | number | object>[],
): BusinessManagersByBusinessesUnit[] => {
  return businessManagers.map((businessManager) => ({
    businessManagerId:
      typeof businessManager.businessManagerId === "string" ||
      typeof businessManager.businessManagerId === "number"
        ? String(businessManager.businessManagerId)
        : "",
    businessUnit:
      typeof businessManager.businessUnit === "string" ||
      typeof businessManager.businessUnit === "number"
        ? String(businessManager.businessUnit)
        : "",
  }));
};
const mapPublicCodeTablesByBusinessesUnit = (
  publicCodeTables: Record<string, string | number | object>[],
): PublicCodeTablesByBusinessesUnit[] => {
  return publicCodeTables.map((publicCodeTable) => ({
    algorithmToPublicCode:
      typeof publicCodeTable.algorithmToPublicCode === "string" ||
      typeof publicCodeTable.algorithmToPublicCode === "number"
        ? String(publicCodeTable.algorithmToPublicCode)
        : "",
    businessTableId:
      typeof publicCodeTable.businessTableId === "string" ||
      typeof publicCodeTable.businessTableId === "number"
        ? String(publicCodeTable.businessTableId)
        : "",
    businessUnit:
      typeof publicCodeTable.businessUnit === "string" ||
      typeof publicCodeTable.businessUnit === "number"
        ? String(publicCodeTable.businessUnit)
        : "",
    lengthToPublicCode:
      typeof publicCodeTable.lengthToPublicCode === "string" ||
      typeof publicCodeTable.lengthToPublicCode === "number"
        ? Number(publicCodeTable.lengthToPublicCode)
        : 0,
    prefixToPublicCode:
      typeof publicCodeTable.prefixToPublicCode === "string" ||
      typeof publicCodeTable.prefixToPublicCode === "number"
        ? String(publicCodeTable.prefixToPublicCode)
        : "",
    publicCodeGeneration:
      typeof publicCodeTable.publicCodeGeneration === "string" ||
      typeof publicCodeTable.publicCodeGeneration === "number"
        ? String(publicCodeTable.publicCodeGeneration)
        : "",
  }));
};

const mapUseCasesByBusinessesUnit = (
  useCases: Record<string, string | number | object>[],
): UseCasesByBusinessesUnit[] => {
  return useCases.map((useCase) => ({
    businessUnit:
      typeof useCase.businessUnit === "string" ||
      typeof useCase.businessUnit === "number"
        ? String(useCase.businessUnit)
        : "",
    effectiveDate:
      typeof useCase.effectiveDate === "string" ||
      typeof useCase.effectiveDate === "number"
        ? String(useCase.effectiveDate)
        : "",
    useCaseId:
      typeof useCase.useCaseId === "string" ||
      typeof useCase.useCaseId === "number"
        ? String(useCase.useCaseId)
        : "",
  }));
};

const mapBusinessUnitsPortalEmployeeToEntities = (
  resend: Record<string, string | number | object>[],
): IBusinessUnitsPortalEmployee[] => {
  return resend.map(mapBusinessUnitsPortalEmployeeApiToEntity);
};

export {
  mapBusinessUnitsPortalEmployeeToEntities,
  mapBusinessUnitsPortalEmployeeApiToEntity,
};
