import { Meta } from "@storybook/react";

import { Tooltip, TooltipProps } from "./index";

const meta: Meta<typeof Tooltip> = {
  title: "overlay/Tooltip",
  component: Tooltip,
};

export const Default = (args: TooltipProps) => <Tooltip {...args} />;

Default.args = {
  text: "Ver detalles",
};

export default meta;
