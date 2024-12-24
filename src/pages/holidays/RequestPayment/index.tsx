import { useRef, useState } from "react";
import { FormikProps } from "formik";

import { IGeneralInformationEntry } from "./forms/GeneralInformationForm/types";
import { holidaysNavConfig } from "../config/nav.config";
import { RequestPaymentUI } from "./interface";
import { requestPaymentSteps } from "./config/assisted.config";

function RequestPayment() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formValues, setFormValues] = useState<IGeneralInformationEntry>({
    id: "",
    daysToPay: "",
    contract: "",
    contractDesc: "",
    observations: "",
  });
  const generalInformationRef =
    useRef<FormikProps<IGeneralInformationEntry>>(null);
  const [isCurrentFormValid, setIsCurrentFormValid] = useState(false);

  const handleNextStep = () => {
    if (currentStep < requestPaymentSteps.length) {
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
    <RequestPaymentUI
      appName={holidaysNavConfig[2].label}
      appRoute={holidaysNavConfig[2].crumbs}
      navigatePage={holidaysNavConfig[2].url}
      steps={requestPaymentSteps}
      currentStep={currentStep}
      setCurrentStep={setCurrentStep}
      handleNextStep={handleNextStep}
      handlePreviousStep={handlePreviousStep}
      handleFinishAssisted={handleFinishAssisted}
      generalInformationRef={generalInformationRef}
      initialGeneralInformationValues={formValues}
      isCurrentFormValid={isCurrentFormValid}
      setIsCurrentFormValid={setIsCurrentFormValid}
    />
  );
}

export { RequestPayment };
