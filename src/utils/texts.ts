import { contractTypeLabels } from "@mocks/contracts/enums";

export function truncateText(text: string, maxLength: number): string {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

export function capitalizeWords(text: string): string {
  if (!text) return "";
  return text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const capitalizeText = (text: string) => {
  const textTowerCase = text.toLowerCase();
  return text.charAt(0).toUpperCase() + textTowerCase.slice(1);
};

const transformContractValue = (contractValue: string): string => {
  if (!contractValue) return contractValue;

  const contractTypeKey = Object.keys(contractTypeLabels).find((key) =>
    contractValue.includes(key),
  );

  if (contractTypeKey) {
    return contractValue.replace(
      contractTypeKey,
      contractTypeLabels[contractTypeKey],
    );
  }

  return contractValue;
};

export { capitalizeText, transformContractValue };
