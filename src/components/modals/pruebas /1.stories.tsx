import type { Meta, StoryObj } from "@storybook/react";
import { RiskScoreGauge, RiskScoreGaugeProps } from "./index";
import type { StoryFn } from "@storybook/react";
const meta: Meta<typeof RiskScoreGauge> = {
  component: RiskScoreGauge,
  title: "Data Display/RiskScoreGauge",
  tags: ["autodocs"],
  argTypes: {
    score: {
      control: { type: "range", min: 150, max: 950, step: 1 },
      description: "El valor actual del score de riesgo a mostrar.",
    },
    minScore: {
      control: "number",
      description: "El valor mínimo del rango del score.",
      table: { disable: true },
    },
    maxScore: {
      control: "number",
      description: "El valor máximo del rango del score.",
      table: { disable: true },
    },
    reportDate: {
      control: "text",
      description: "La fecha de reporte del score.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof RiskScoreGauge>;

const Template: StoryFn<RiskScoreGaugeProps> = (args) => (
  <RiskScoreGauge {...args} />
);

export const Default: Story = Template.bind({});
Default.args = {
  score: 650,
  minScore: 150,
  maxScore: 950,
  reportDate: "15/JUN/2023",
};

export const HighRisk: Story = Template.bind({});
HighRisk.args = {
  score: 410,
  minScore: 150,
  maxScore: 950,
  reportDate: "15/JUN/2023",
};

export const LowRisk: Story = Template.bind({});
LowRisk.args = {
  score: 850,
  minScore: 150,
  maxScore: 950,
  reportDate: "15/JUN/2023",
};
