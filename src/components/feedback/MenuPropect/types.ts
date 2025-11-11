import type { IButtonAppearance } from "@inubekit/inubekit";

export interface IOptions {
  title: string;
  onClick: () => void;
  icon: JSX.Element;
  visible: boolean;
  appearance?: IButtonAppearance;
}
