import { useRef, useState } from "react";
import { FormikProps } from "formik";

import { IGeneralInformationEntry } from "./forms/GeneralInformationForm/types";
import { RequestEnjoymentUI } from "./interface";
import { requestEnjoymentSteps } from "./config/assisted.config";
import { holidaysNavConfig } from "../config/nav.config";

function RequestEnjoyment() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formValues, setFormValues] = useState<IGeneralInformationEntry>({
    id: "",
    daysOff: "",
    startDate: "",
    observations: "",
  });
  const generalInformationRef =
    useRef<FormikProps<IGeneralInformationEntry>>(null);

  const [isCurrentFormValid, setIsCurrentFormValid] = useState(false);

  const handleNextStep = () => {
    if (currentStep < requestEnjoymentSteps.length) {
      if (generalInformationRef.current) {
        setFormValues(generalInformationRef.current.values);
        setIsCurrentFormValid(generalInformationRef.current.isValid);
      }
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
      setIsCurrentFormValid={setIsCurrentFormValid}
      setCurrentStep={setCurrentStep}
      isCurrentFormValid={isCurrentFormValid}
      generalInformationRef={generalInformationRef}
      initialGeneralInformationValues={formValues}
    />
  );
}

export { RequestEnjoyment };
