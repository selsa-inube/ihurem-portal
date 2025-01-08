import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormikProps } from "formik";

import { SendRequest } from "@components/modals/SendRequestModal";

import { IGeneralInformationEntry } from "./forms/GeneralInformationForm/types";
import { RequestEnjoymentUI } from "./interface";
import { requestEnjoymentSteps } from "./config/assisted.config";
import { holidaysNavConfig } from "../config/nav.config";
import { ModalState } from "./types";

function RequestEnjoyment() {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [formValues, setFormValues] = useState<IGeneralInformationEntry>({
    id: "",
    daysOff: "",
    startDate: "",
    observations: "",
  });

  const [isCurrentFormValid, setIsCurrentFormValid] = useState(false);

  const [modalState, setModalState] = useState<ModalState>({
    isSendModalVisible: false,
    isRequestInfoModalVisible: false,
  });

  const generalInformationRef =
    useRef<FormikProps<IGeneralInformationEntry>>(null);

  const updateFormValues = () => {
    if (generalInformationRef.current) {
      setFormValues(generalInformationRef.current.values);
      setIsCurrentFormValid(generalInformationRef.current.isValid);
    }
  };

  const handleNextStep = () => {
    if (currentStep < holidaysNavConfig.length) {
      updateFormValues();
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinishAssisted = () => {
    setModalState((prev) => ({ ...prev, isSendModalVisible: true }));
  };

  const handleCloseSendModal = () => {
    setModalState((prev) => ({ ...prev, isSendModalVisible: false }));
  };

  const handleSubmitRequestInfoModal = () => {
    setModalState((prev) => ({ ...prev, isRequestInfoModalVisible: false }));
    navigate("/holidays");
  };

  const {
    label: appName,
    crumbs: appRoute,
    url: navigatePage,
  } = holidaysNavConfig[1];

  return (
    <>
      <RequestEnjoymentUI
        appName={appName}
        appRoute={appRoute}
        navigatePage={navigatePage}
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
      {modalState.isSendModalVisible && (
        <SendRequest
          title="Confirmar Envío"
          message="¿Realmente deseas enviar la solicitud de disfrute de vacaciones?"
          buttonText="Enviar"
          secondaryButtonText="Cancelar"
          onCloseModal={handleCloseSendModal}
          onSubmitButtonClick={handleSubmitRequestInfoModal}
          onSecondaryButtonClick={handleSubmitRequestInfoModal}
        />
      )}
    </>
  );
}

export { RequestEnjoyment };
