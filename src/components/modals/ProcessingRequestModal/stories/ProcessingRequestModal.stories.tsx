import { useState, useEffect } from "react";
import { StoryFn, Meta } from "@storybook/react";
import { Button } from "@inubekit/inubekit";

import { ProcessingRequestModal, ProcessingRequestModalProps } from "..";
import { props } from "./props";
import { processingRequestMock } from "../config/config";

const story: Meta<typeof ProcessingRequestModal> = {
  component: ProcessingRequestModal,
  title: "components/modals/ProcessingRequestModal",
  argTypes: props,
};

const DefaultTemplate: StoryFn<ProcessingRequestModalProps> = (args) => {
  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleShowModal = () => {
    if (!showModal) {
      setCurrentStep(1);
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showModal) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < 4) {
            return prev + 1;
          }

          clearInterval(interval);
          return prev;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [showModal]);

  return (
    <>
      <Button onClick={handleShowModal}>Open Modal</Button>
      {showModal && (
        <ProcessingRequestModal
          {...args}
          currentStepId={currentStep}
          onCloseModal={handleShowModal}
        />
      )}
    </>
  );
};

export const Default = DefaultTemplate.bind({});
Default.args = {
  title: "Procesando solicitud",
  description:
    "Hemos recibido tu solicitud y se encuentra en proceso. Por favor, espera mientras la gestionamos.",
  steps: processingRequestMock,
};

export default story;
