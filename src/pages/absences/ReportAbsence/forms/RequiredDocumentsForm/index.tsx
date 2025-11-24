import { FormikProps, useFormik } from "formik";
import { object } from "yup";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useFlag } from "@inubekit/inubekit";

import { IRequiredDocumentsEntry } from "./types";
import { RequiredDocumentsFormUI } from "./interface";
import { IDocument } from "./RequiredDocumentsTable/types";

const createValidationSchema = () => object().shape({});

const validationSchema = createValidationSchema();

interface RequiredDocumentsFormProps {
  initialValues: IRequiredDocumentsEntry;
  loading?: boolean;
  withNextButton?: boolean;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IRequiredDocumentsEntry) => void;
}

const RequiredDocumentsForm = forwardRef<
  FormikProps<IRequiredDocumentsEntry>,
  RequiredDocumentsFormProps
>(
  (
    {
      initialValues,
      loading,
      withNextButton = false,
      onFormValid,
      onSubmit,
      handleNextStep,
      handlePreviousStep,
    },
    ref,
  ) => {
    const [documents, setDocuments] = useState<IDocument[]>(() => {
      return initialValues.documents && initialValues.documents.length > 0
        ? initialValues.documents
        : [];
    });

    const [lastAttachedInfo, setLastAttachedInfo] = useState<{
      docId: number;
      previousCount: number;
      newCount: number;
    } | null>(null);

    const { addFlag } = useFlag();

    const formik = useFormik<IRequiredDocumentsEntry>({
      initialValues: { documents },
      validationSchema,
      validateOnBlur: false,
      onSubmit: onSubmit ?? (() => true),
    });

    useImperativeHandle(ref, () => formik);

    const handleAttachFile = (document: IDocument, files: File[]) => {
      setDocuments((prevDocs) => {
        const prevDoc = prevDocs.find((d) => d.id === document.id);
        const previousFilesCount = prevDoc?.attachedFiles?.length ?? 0;
        const updatedDocs = prevDocs.map((doc) => {
          if (doc.id === document.id) {
            return { ...doc, attachedFiles: files };
          }
          return doc;
        });
        const newFilesCount = files.length;
        if (newFilesCount > previousFilesCount) {
          setLastAttachedInfo({
            docId: document.id,
            previousCount: previousFilesCount,
            newCount: newFilesCount,
          });
        }
        return updatedDocs;
      });
    };

    useEffect(() => {
      formik.setFieldValue("documents", documents);
    }, [documents]);

    useEffect(() => {
      if (lastAttachedInfo) {
        addFlag({
          title: "Documento cargado",
          description: "¡El documento se adjuntó con éxito!",
          appearance: "success",
          duration: 5000,
        });
        setLastAttachedInfo(null);
      }
    }, [lastAttachedInfo, addFlag]);

    useEffect(() => {
      if (onFormValid) {
        onFormValid(true);
      }
    }, [documents, onFormValid]);

    return (
      <RequiredDocumentsFormUI
        loading={loading}
        formik={formik}
        withNextButton={withNextButton}
        documents={documents}
        handleNextStep={handleNextStep}
        handlePreviousStep={handlePreviousStep}
        onAttachFile={handleAttachFile}
      />
    );
  },
);

RequiredDocumentsForm.displayName = "RequiredDocumentsForm";

export { RequiredDocumentsForm };
export type { RequiredDocumentsFormProps };
