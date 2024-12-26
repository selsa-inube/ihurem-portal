import { useRef, useState } from "react";
import { FormikProps } from "formik";

import { newCCertificationApplication } from "./config/assisted.config";
import { certificationsNavConfig } from "../config/nav.config";
import { NewCertificationUI } from "./interface";
import { IGeneralInformationEntry } from "./forms/GeneralInformationForm/types";

function NewCertification() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formValues, setFormValues] = useState<IGeneralInformationEntry>({
    id: "",
    certification: "",
    addressee: "",
    observations: "",
    contractDesc: "",
    contract: "",
  });

  const generalInformationRef =
    useRef<FormikProps<IGeneralInformationEntry>>(null);

  const [isCurrentFormValid, setIsCurrentFormValid] = useState(false);

  const handleNextStep = () => {
    if (currentStep < newCCertificationApplication.length) {
      if (generalInformationRef.current) {
        setFormValues(generalInformationRef.current.values);
        setIsCurrentFormValid(generalInformationRef.current.isValid);
      }
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
    console.log("Proceso de certificación completado");
  };

  return (
    <NewCertificationUI
      appName={certificationsNavConfig[1].label}
      appRoute={certificationsNavConfig[1].crumbs}
      navigatePage={certificationsNavConfig[1].url}
      steps={newCCertificationApplication}
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

export { NewCertification };
