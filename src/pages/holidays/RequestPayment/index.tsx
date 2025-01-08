import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormikProps } from "formik";

import { SendRequest } from "@components/modals/SendRequestModal";

import { IGeneralInformationEntry } from "./forms/GeneralInformationForm/types";
import { holidaysNavConfig } from "../config/nav.config";
import { RequestPaymentUI } from "./interface";
import { requestPaymentSteps } from "./config/assisted.config";
import { ModalState } from "./types";

function RequestPayment() {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [formValues, setFormValues] = useState<IGeneralInformationEntry>({
    id: "",
    daysToPay: "",
    contract: "",
    contractDesc: "",
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
    if (currentStep < requestPaymentSteps.length) {
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
  } = holidaysNavConfig[2];

  return (
    <>
      <RequestPaymentUI
        appName={appName}
        appRoute={appRoute}
        navigatePage={navigatePage}
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

      {modalState.isSendModalVisible && (
        <SendRequest
          title="Confirmar Envío"
          message="¿Realmente deseas enviar la solicitud de pago de vacaciones?"
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

export { RequestPayment };
