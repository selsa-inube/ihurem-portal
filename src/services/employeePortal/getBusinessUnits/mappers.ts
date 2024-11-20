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
    abbreviatedName: String(businessUnit.abbreviatedName),
    businessManagersByBusinessesUnit:
      businessUnit.businessManagersByBusinessesUnit
        ? mapBusinessManagersByBusinessesUnit(
            businessUnit.businessManagersByBusinessesUnit as Record<
              string,
              string | number | object
            >[],
          )
        : [],
    businessUnit: String(businessUnit.businessUnit),
    descriptionUse: String(businessUnit.descriptionUse),
    firstMonthOfFiscalYear: String(businessUnit.firstMonthOfFiscalYear),
    languageId: String(businessUnit.languageId),
    publicCode: String(businessUnit.publicCode),
    publicCodeTablesByBusinessesUnit:
      businessUnit.publicCodeTablesByBusinessesUnit
        ? mapPublicCodeTablesByBusinessesUnit(
            businessUnit.publicCodeTablesByBusinessesUnit as Record<
              string,
              string | number | object
            >[],
          )
        : [],
    urlLogo: String(businessUnit.urlLogo),
    useCasesByBusinessesUnit: mapUseCasesByBusinessesUnit(
      businessUnit.useCasesByBusinessesUnit as Record<
        string,
        string | number | object
      >[],
    ),
  };
  return businessUnitData;
};

const mapBusinessManagersByBusinessesUnit = (
  businessManagers: Record<string, string | number | object>[],
): BusinessManagersByBusinessesUnit[] => {
  return businessManagers.map((businessManager) => ({
    businessManagerId: String(businessManager.businessManagerId),
    businessUnit: String(businessManager.businessUnit),
  }));
};

const mapPublicCodeTablesByBusinessesUnit = (
  publicCodeTables: Record<string, string | number | object>[],
): PublicCodeTablesByBusinessesUnit[] => {
  return publicCodeTables.map((publicCodeTable) => ({
    algorithmToPublicCode: String(publicCodeTable.algorithmToPublicCode),
    businessTableId: String(publicCodeTable.businessTableId),
    businessUnit: String(publicCodeTable.businessUnit),
    lengthToPublicCode: Number(publicCodeTable.lengthToPublicCode),
    prefixToPublicCode: String(publicCodeTable.prefixToPublicCode),
    publicCodeGeneration: String(publicCodeTable.publicCodeGeneration),
  }));
};

const mapUseCasesByBusinessesUnit = (
  useCases: Record<string, string | number | object>[],
): UseCasesByBusinessesUnit[] => {
  return useCases.map((useCase) => ({
    businessUnit: String(useCase.businessUnit),
    effectiveDate: String(useCase.effectiveDate),
    useCaseId: String(useCase.useCaseId),
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
