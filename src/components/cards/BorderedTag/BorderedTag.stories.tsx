import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import { inube } from "@inubekit/inubekit";

import { BorderedTag } from "./index";

const meta: Meta<typeof BorderedTag> = {
  title: "components/cards/BorderedTag",
  component: BorderedTag,
  tags: ["autodocs"],
  argTypes: {
    appearance: {
      control: "select",
      options: ["success", "danger", "warning"],
    },
    children: {
      control: "text",
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={inube}>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BorderedTag>;

export const Success: Story = {
  args: {
    appearance: "success",
    children: "Etiqueta de Éxito",
  },
};

export const Danger: Story = {
  args: {
    appearance: "danger",
    children: "Etiqueta de Peligro",
  },
};

export const Warning: Story = {
  args: {
    appearance: "warning",
    children: "Etiqueta de Advertencia",
  },
};
