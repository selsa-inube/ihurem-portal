interface IOptions {
  title: string;
  onClick: () => void;
  icon: JSX.Element;
  visible: boolean;
  appearance?:
    | "gray"
    | "dark"
    | "danger"
    | "primary"
    | "success"
    | "warning"
    | "help"
    | "light";
}

export type { IOptions };
