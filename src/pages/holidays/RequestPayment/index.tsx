import { useState } from "react";

import { holidaysNavConfig } from "../config/nav.config";
import { RequestPaymentUI } from "./interface";
import { requestPaymentSteps } from "./config/assisted.config";

function RequestPayment() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    if (currentStep < requestPaymentSteps.length) {
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
    <RequestPaymentUI
      appName={holidaysNavConfig[2].label}
      appRoute={holidaysNavConfig[2].crumbs}
      navigatePage={holidaysNavConfig[2].url}
      steps={requestPaymentSteps}
      currentStep={currentStep}
      handleNextStep={handleNextStep}
      handlePreviousStep={handlePreviousStep}
      handleFinishAssisted={handleFinishAssisted}
    />
  );
}

export { RequestPayment };
