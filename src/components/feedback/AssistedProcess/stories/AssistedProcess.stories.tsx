import { parameters, props } from "../props";
import { AssistedProcess, IAssistedProcessProps } from "..";

const story = {
  title: "Feedback/AssistedProcess",
  component: AssistedProcess,
  parameters,
  argTypes: props,
};

const stepsMock = [
  {
    id: 1,
    label: "Solicitud enviada",
  },

  {
    id: 2,
    label: "Evaluando requisitos",
  },

  {
    id: 3,
    label: "Validando información",
  },

  {
    id: 4,
    label: "Solicitud aprobada exitosamente",
  },
];

const Default = (args: IAssistedProcessProps) => <AssistedProcess {...args} />;

Default.args = {
  steps: stepsMock,
  currentStepId: 4,
  variant: "success",
};

export default story;

export { Default };
