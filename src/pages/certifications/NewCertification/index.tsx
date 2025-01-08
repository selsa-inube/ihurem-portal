import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormikProps } from "formik";

import { SendRequestModal } from "@components/modals/SendRequestModal";

import { newCCertificationApplication } from "./config/assisted.config";
import { certificationsNavConfig } from "../config/nav.config";
import { NewCertificationUI } from "./interface";
import { IGeneralInformationEntry } from "./forms/GeneralInformationForm/types";
import { RequestInfoModal } from "./modals/RequestInfoModal";
import { ModalState } from "./types";

function NewCertification() {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [formValues, setFormValues] = useState<IGeneralInformationEntry>({
    id: "",
    certification: "",
    addressee: "",
    observations: "",
    contractDesc: "",
    contract: "",
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
    if (currentStep < newCCertificationApplication.length) {
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

  const handleConfirmSendModal = () => {
    setModalState({
      isSendModalVisible: false,
      isRequestInfoModalVisible: true,
    });
  };

  const handleSubmitRequestInfoModal = () => {
    setModalState((prev) => ({ ...prev, isRequestInfoModalVisible: false }));
    navigate("/certifications");
  };

  const {
    label: appName,
    crumbs: appRoute,
    url: navigatePage,
  } = certificationsNavConfig[1];

  return (
    <>
      <NewCertificationUI
        appName={appName}
        appRoute={appRoute}
        navigatePage={navigatePage}
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

      {modalState.isSendModalVisible && (
        <SendRequestModal
          descriptionText="¿Realmente deseas enviar la solicitud de certificación?"
          onSubmitButtonClick={handleConfirmSendModal}
          onCloseModal={handleCloseSendModal}
          onSecondaryButtonClick={handleCloseSendModal}
        />
      )}

      {modalState.isRequestInfoModalVisible && (
        <RequestInfoModal
          requestId="#45678822"
          staffName="Nombre Nombre Apellido Apellido"
          onCloseModal={handleSubmitRequestInfoModal}
          onSubmitButtonClick={handleSubmitRequestInfoModal}
        />
      )}
    </>
  );
}

export { NewCertification };
