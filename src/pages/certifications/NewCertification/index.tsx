import { useState } from "react";
import { newCCertificationApplication } from "./config/assisted.config";
import { certificationsNavConfig } from "../config/nav.config";
import { NewCertificationUI } from "./interface";

function NewCertification() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    if (currentStep < newCCertificationApplication.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinishAssisted = () => {
    console.log("Proceso de certificación completado");
  };

  return (
    <NewCertificationUI
      appName={certificationsNavConfig[1].label}
      appRoute={certificationsNavConfig[1].crumbs}
      navigatePage={certificationsNavConfig[1].url}
      steps={newCCertificationApplication}
      currentStep={currentStep}
      setCurrentStep={setCurrentStep} // Asegúrate de pasar setCurrentStep aquí
      handleNextStep={handleNextStep}
      handlePreviousStep={handlePreviousStep}
      handleFinishAssisted={handleFinishAssisted}
    />
  );
}

export { NewCertification };
