import { Icon, Stack, Text } from "@inubekit/inubekit";
import {
  MdOutlineDescription,
  MdOutlineDelete,
  MdOutlineVisibility,
} from "react-icons/md";

import { StyledFile } from "./styles";

import { spacing } from "@design/tokens/spacing";

interface FileUIProps {
  withBorder?: boolean;
  name: string;
  size: string;
  onDelete?: () => void;
  onView?: () => void;
}

function FileUI(props: FileUIProps) {
  const { withBorder, name, size, onDelete, onView } = props;
  return (
    <StyledFile $withBorder={withBorder}>
      <Stack gap={spacing.s100} alignItems="center">
        <Icon icon={<MdOutlineDescription />} appearance="dark" size="20px" />
        <Stack direction="column" width="130px">
          <Text type="label" size="medium" weight="bold" ellipsis>
            {name}
          </Text>
          <Text appearance="gray" size="small">
            {size}
          </Text>
        </Stack>
      </Stack>
      <Icon
        icon={<MdOutlineVisibility />}
        cursorHover
        appearance="dark"
        size="20px"
        onClick={onView}
      />
      <Icon
        icon={<MdOutlineDelete />}
        cursorHover
        appearance="danger"
        size="20px"
        onClick={onDelete}
      />
    </StyledFile>
  );
}

export { FileUI };
