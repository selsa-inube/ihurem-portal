import {
  IEmployeeOptions,
  IEmployeeSubOption,
} from "@ptypes/employeePortalBusiness.types";

const mapEmployeeOptionsApiToEntity = (
  options: Record<string, unknown>[],
): IEmployeeOptions[] => {
  const toStringSafe = (value: unknown): string => {
    if (typeof value === "string" || typeof value === "number") {
      return String(value);
    }
    return "";
  };

  const mapSubOption = (subOption: unknown) => {
    if (!subOption || typeof subOption !== "object") {
      return null;
    }

    const sub = subOption as Record<string, unknown>;

    const result = {
      abbreviatedName: toStringSafe(sub.abbreviatedName),
      descriptionUse: toStringSafe(sub.descriptionUse),
      iconReference: toStringSafe(sub.iconReference),
      optionEmployeeId: toStringSafe(sub.optionEmployeeId),
      publicCode: toStringSafe(sub.publicCode),
      subOption: Array.isArray(sub.subOption)
        ? sub.subOption.map(toStringSafe)
        : [],
    };

    return result as IEmployeeSubOption;
  };

  return options.map((option): IEmployeeOptions => {
    const mappedSubOptions =
      Array.isArray(option.subOption) && option.subOption.length > 0
        ? option.subOption
            .map(mapSubOption)
            .filter((s): s is IEmployeeSubOption => s !== null)
        : [];

    return {
      abbreviatedName: toStringSafe(option.abbreviatedName),
      descriptionUse: toStringSafe(option.descriptionUse),
      iconReference: toStringSafe(option.iconReference),
      optionEmployeeId: toStringSafe(option.optionEmployeeId),
      parentOptionId: toStringSafe(option.parentOptionId),
      publicCode: toStringSafe(option.publicCode),
      subOption: mappedSubOptions,
    };
  });
};

export { mapEmployeeOptionsApiToEntity };
