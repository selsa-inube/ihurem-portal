import { IOption } from "@inubekit/inubekit";

export interface EnumItem {
  code: string;
  description: string;
}

export interface AbsenceReasonRelation {
  absenceReason: string;
  subReason: string[];
}

export const transformEnumsToOptions = (enums: EnumItem[]): IOption[] => {
  if (!Array.isArray(enums) || enums.length === 0) {
    return [];
  }

  return enums.map((item, index) => ({
    id: String(index + 1),
    label: item.description,
    value: item.code,
  }));
};

export const getSubMotivesForMotive = (
  motiveValue: string,
  relations: AbsenceReasonRelation[],
  subReasonEnums: EnumItem[],
): IOption[] => {
  if (
    !motiveValue ||
    !Array.isArray(relations) ||
    !Array.isArray(subReasonEnums)
  ) {
    return [];
  }

  const relation = relations.find((rel) => rel.absenceReason === motiveValue);

  if (!relation || relation.subReason.length === 0) {
    return [];
  }

  const filteredSubReasons = subReasonEnums.filter((subReason) =>
    relation.subReason.includes(subReason.code),
  );

  return transformEnumsToOptions(filteredSubReasons);
};
