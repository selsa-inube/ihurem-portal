import { MdOutlineVisibility, MdDeleteOutline } from "react-icons/md";
import { BrowserRouter } from "react-router-dom";
import { Meta, StoryFn, StoryObj } from "@storybook/react";

import { Logger } from "@utils/logger";

import { MenuPropect, MenuPropectProps } from ".";

const meta: Meta<typeof MenuPropect> = {
  title: "components/navigation/MenuPropect",
  component: MenuPropect,
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

type Story = StoryObj<typeof MenuPropect>;

export const Default: Story = (args: MenuPropectProps) => (
  <MenuPropect {...args} />
);
Default.args = {
  options: [
    {
      title: "Option 1",
      onClick: () => Logger.info("Opción seleccionada", { option: "Option 1" }),
      icon: <MdOutlineVisibility />,
      visible: true,
    },
    {
      title: "Option 2",
      onClick: () => Logger.info("Opción seleccionada", { option: "Option 2" }),
      icon: <MdDeleteOutline />,
      visible: true,
    },
  ],
  onMouseLeave: () => Logger.info("Mouse leave en MenuPropect"),
};

export default meta;
