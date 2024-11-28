import { useState } from "react";

import { requestEnjoymentSteps } from "./config/assisted.config";
import { holidaysNavConfig } from "../config/nav.config";
import { RequestEnjoymentUI } from "./interface";

function RequestEnjoyment() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    if (currentStep < requestEnjoymentSteps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinishAssisted = () => {
    console.log("Proceso completado");
  };

  return (
    <RequestEnjoymentUI
      appName={holidaysNavConfig[1].label}
      appRoute={holidaysNavConfig[1].crumbs}
      navigatePage={holidaysNavConfig[1].url}
      steps={requestEnjoymentSteps}
      currentStep={currentStep}
      handleNextStep={handleNextStep}
      handlePreviousStep={handlePreviousStep}
      handleFinishAssisted={handleFinishAssisted}
    />
  );
}

export { RequestEnjoyment };
