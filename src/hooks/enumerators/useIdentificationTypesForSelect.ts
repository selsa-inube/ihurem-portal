import { IOption } from "@inubekit/inubekit";

import { IEnumeratorItem } from "@services/enumerators/types";

import { useEnumeratorsIsaas } from "../useEnumeratorsIsaas";

const idTypeTranslations: Record<string, string> = {
  CitizenshipCard: "Cédula de Ciudadanía",
  CivilRegistryPerson: "Registro Civil de Persona",
  DiplomaticCard: "Tarjeta Diplomática",
  Dni: "Documento Nacional de Identidad",
  Escrow: "Fideicomiso",
  ForeignerId: "Identificación de Extranjero",
  IdentityCard: "Tarjeta de Identidad",
  Nuip: "Número Único de Identificación Personal",
  Other: "Otro tipo de documento",
  Passport: "Pasaporte",
  SocialSecurity: "Seguridad Social",
  SpecialResidencePermit: "Permiso Especial de Residencia",
};

export const formatIdTypesToSelectOptions = (
  data: IEnumeratorItem[],
): IOption[] => {
  return data.map((item) => ({
    id: item.code,
    label: idTypeTranslations[item.code] || item.description,
    value: item.code,
  }));
};

export const useIdentificationTypesForSelect = () => {
  return useEnumeratorsIsaas(
    "identificationtypenaturalperson",
    formatIdTypesToSelectOptions,
  );
};
