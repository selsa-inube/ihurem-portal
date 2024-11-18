const capitalizeText = (text: string) => {
  const textTowerCase = text.toLowerCase();
  return text.charAt(0).toUpperCase() + textTowerCase.slice(1);
};

export { capitalizeText };
