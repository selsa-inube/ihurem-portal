import { IEmployeeOptions } from "@ptypes/employeePortalBusiness.types";

const mapEmployeeOptionsApiToEntity = (
  options: Record<string, unknown>[],
): IEmployeeOptions[] => {
  const toStringSafe = (value: unknown): string => {
    if (typeof value === "string" || typeof value === "number") {
      return String(value);
    }
    return "";
  };

  return options.map((option) => ({
    abbreviatedName: toStringSafe(option.abbreviatedName),
    descriptionUse: toStringSafe(option.descriptionUse),
    optionCode: toStringSafe(option.optionCode),
    optionEmployeeId: toStringSafe(option.optionEmployeeId),
    parentOptionId: toStringSafe(option.parentOptionId),
  }));
};

export { mapEmployeeOptionsApiToEntity };
