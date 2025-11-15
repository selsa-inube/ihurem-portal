import { FileUI } from "./interface";

interface FileProps {
  withBorder?: boolean;
  name: string;
  size: string;
  onDelete?: () => void;
  onView?: () => void;
}

function File(props: FileProps) {
  const { withBorder = true, name, size, onDelete, onView } = props;
  return (
    <FileUI
      withBorder={withBorder}
      name={name}
      size={size}
      onDelete={onDelete}
      onView={onView}
    />
  );
}

export { File };
