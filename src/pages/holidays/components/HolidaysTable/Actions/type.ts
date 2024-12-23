import { IIconAppearance } from "@inubekit/icon";
interface IAction {
  icon: React.ReactNode;
  appearance: IIconAppearance;
  label: string;
  onClick?: () => void;
}
export type { IAction };
