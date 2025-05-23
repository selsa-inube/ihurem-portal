export type ParsedData = Record<string, unknown>;

export function parseDataSafely(dataString: string | object): ParsedData {
  if (typeof dataString === "object" && dataString !== null) {
    return { ...dataString };
  }

  const stringData = typeof dataString === "string" ? dataString : "{}";

  try {
    return JSON.parse(stringData);
  } catch {
    try {
      const fixedJson = stringData
        .replace(/([,{]\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, '$1"$2":')
        .replace(/:\s*([^",{}\s][^",}]*?)(\s*[,}])/g, ':"$1"$2')
        .replace(/,(\s*[}\]])/g, "$1");

      return JSON.parse(fixedJson);
    } catch {
      return parseManually(stringData);
    }
  }
}

function parseManually(dataString: string): ParsedData {
  const result: ParsedData = {};
  const content = dataString.replace(/^\s*{\s*|\s*}\s*$/g, "");
  const regex =
    /(["']?)([a-zA-Z_][a-zA-Z0-9_]*)\1\s*:\s*(["']?)([^",}]+?)\3(?=\s*[,}]|$)/g;

  let match: RegExpExecArray | null;
  while ((match = regex.exec(content)) !== null) {
    const key = match[2];
    const value = match[4].trim();

    result[key] = /^\d+$/.test(value)
      ? parseInt(value, 10)
      : /^\d+\.\d+$/.test(value)
        ? parseFloat(value)
        : value;
  }

  return result;
}

export function getValueFromData(
  data: unknown,
  key: string,
  defaultValue: unknown = "",
) {
  if (data && typeof data === "object" && key in data) {
    return (data as ParsedData)[key];
  }
  return defaultValue;
}
