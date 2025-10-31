import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { ISpinnerAppearance } from "@inubekit/inubekit";

import { ErrorModal } from "@components/modals/ErrorModal";

import {
  registerErrorModalShow,
  unregisterErrorModalShow,
  ErrorModalOptions,
} from "./errorModalService";

interface InternalOptions {
  title?: string;
  descriptionText: string;
  solutionText: string;
  buttonText?: string;
  appearance?: ISpinnerAppearance;
  redirectOnClose?: boolean;
  onSubmitButtonClick?: () => void;
}

interface ErrorModalContextType {
  showErrorModal: (
    opts: ErrorModalOptions & { redirectOnClose?: boolean },
  ) => void;
  closeErrorModal: (redirect?: boolean) => void;
}

const ErrorModalContext = createContext<ErrorModalContextType | undefined>(
  undefined,
);

interface ErrorModalProviderProps {
  children: ReactNode;
}

export const ErrorModalProvider: React.FC<ErrorModalProviderProps> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<InternalOptions | null>(null);

  const ensurePortalNode = useCallback(() => {
    const id = "portal";
    let node = document.getElementById(id);
    if (!node) {
      node = document.createElement("div");
      node.id = id;
      document.body.appendChild(node);
    }
    return node;
  }, []);

  useEffect(() => {
    ensurePortalNode();
  }, [ensurePortalNode]);

  useEffect(() => {
    registerErrorModalShow(
      (opts: ErrorModalOptions & { redirectOnClose?: boolean }) => {
        setOptions({
          title: opts.title,
          descriptionText: opts.descriptionText,
          solutionText: opts.solutionText,
          buttonText: opts.buttonText,
          appearance: opts.appearance!,
          redirectOnClose: opts.redirectOnClose ?? false,
          onSubmitButtonClick: opts.onSubmitButtonClick,
        });
        setOpen(true);
      },
    );
    return () => {
      unregisterErrorModalShow();
    };
  }, []);

  const showErrorModal = useCallback(
    (opts: ErrorModalOptions & { redirectOnClose?: boolean }) => {
      setOptions({
        title: opts.title,
        descriptionText: opts.descriptionText,
        solutionText: opts.solutionText,
        buttonText: opts.buttonText,
        appearance: opts.appearance!,
        redirectOnClose: opts.redirectOnClose ?? false,
        onSubmitButtonClick: opts.onSubmitButtonClick,
      });
      setOpen(true);
    },
    [],
  );

  const closeErrorModal = useCallback((redirect = false) => {
    setOpen(false);
    setOptions(null);
    if (redirect) window.location.assign("/logout");
  }, []);

  return (
    <ErrorModalContext.Provider value={{ showErrorModal, closeErrorModal }}>
      {children}
      {open && options && (
        <ErrorModal
          title={options.title}
          descriptionText={options.descriptionText}
          solutionText={options.solutionText}
          buttonText={options.buttonText}
          appearance={options.appearance}
          onCloseModal={() => closeErrorModal(options.redirectOnClose)}
          onSubmitButtonClick={() => {
            if (options.onSubmitButtonClick) options.onSubmitButtonClick();
            closeErrorModal(options.redirectOnClose);
          }}
        />
      )}
    </ErrorModalContext.Provider>
  );
};

export function useErrorModal(): ErrorModalContextType {
  const ctx = useContext(ErrorModalContext);
  if (!ctx) {
    throw new Error("useErrorModal must be used within ErrorModalProvider");
  }
  return ctx;
}
