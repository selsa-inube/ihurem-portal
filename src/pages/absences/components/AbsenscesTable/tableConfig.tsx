import { IAbsencesTable } from "./types";
import { MdOutlineVisibility, MdOutlineFileDownload } from "react-icons/md";
import { Icon } from "@inubekit/inubekit";

export const columns = [
  { span: 1, style: { width: "auto" } },
  { span: 1, style: { width: "auto" } },
  { span: 1, style: { width: "auto" } },
  { span: 1, style: { width: "110px" } },
];

export interface ExtendedIAbsencesTable extends IAbsencesTable {
  mobileActions?: { value: JSX.Element };
  actions?: { value: JSX.Element };
}

export const headers: {
  label: string;
  key: keyof ExtendedIAbsencesTable;
  action?: boolean;
  style?: React.CSSProperties;
}[] = [
  { label: "Motivo", key: "reason", style: { width: "auto" } },
  { label: "Fecha en que se produjo", key: "date", style: { width: "auto" } },
  { label: "Duración", key: "duration", style: { width: "auto" } },
  {
    label: "Acciones",
    key: "actions",
    action: true,
    style: { width: "110px" },
  },
];

export const pageLength = 10;
export const caption = "Consulta de ausencias del empleado";

export const generateData = (): ExtendedIAbsencesTable[] => {
  return Array.from({ length: 5 }, (_, i) => ({
    reason: { value: `Motivo ${i + 1}` },
    date: { value: `2025-11-${10 + i}` },
    duration: { value: `${i + 1} día(s)` },
    view: { value: `view-${i + 1}` },
    download: { value: `download-${i + 1}` },
    actions: {
      value: (
        <>
          <Icon appearance="dark" icon={<MdOutlineVisibility />} size="20px" />
          <Icon
            appearance="dark"
            icon={<MdOutlineFileDownload />}
            size="20px"
          />
        </>
      ),
    },
  }));
};
