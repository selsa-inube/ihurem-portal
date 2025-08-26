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
    iconReference: toStringSafe(option.iconReference),
    optionStaffId: toStringSafe(option.optionStaffId),
    parentOptionId: toStringSafe(option.parentOptionId),
    publicCode: toStringSafe(option.publicCode),
    useCaseName: toStringSafe(option.useCaseName),
    subOption: Array.isArray(option.subOption)
      ? (option.subOption as IEmployeeOptions["subOption"])
      : undefined,
  }));
};

export { mapEmployeeOptionsApiToEntity };
