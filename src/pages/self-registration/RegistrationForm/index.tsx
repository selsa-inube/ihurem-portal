import {
  Stack,
  Text,
  Button,
  useMediaQuery,
  Divider,
  Select,
  Textfield,
} from "@inubekit/inubekit";
import { Formik, Form, Field, FieldProps, FormikHelpers } from "formik";
import { MdTag } from "react-icons/md";
import * as Yup from "yup";
import { useState } from "react";

import { spacing } from "@design/tokens/spacing";
import { useIdentificationTypesForSelect } from "@hooks/enumerators/useIdentificationTypesForSelect";
import { useSelfRegistrationAPI } from "@hooks/useSelfRegistrationAPI";

import { ResponseModal } from "../modals/ResponseModal";
import { StyledContainerForm } from "./styles";

interface FormValues {
  idType: string;
  idNumber: string;
}

export interface RegistrationFormProps {
  onSuccess?: (humanResourceRequestId: string) => void;
}

export function RegistrationForm(props: RegistrationFormProps) {
  const { onSuccess } = props;

  const [showModal, setShowModal] = useState(false);
  const [isRequestSuccessful, setIsRequestSuccessful] = useState(false);

  const validationSchema = Yup.object({
    idType: Yup.string().required("El tipo de identificación es obligatorio"),
    idNumber: Yup.string()
      .matches(/^\d{6,10}$/, "Debe tener entre 6 y 10 dígitos numéricos")
      .required("El número de identificación es obligatorio"),
  });

  const isMobile = useMediaQuery("(max-width: 700px)");
  const { data } = useIdentificationTypesForSelect();
  const idTypeOptions = data;

  const { submitSelfRegistration, humanResourceRequestId, isLoading, error } =
    useSelfRegistrationAPI();

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>,
  ) => {
    const requestBody = {
      identificationDocumentNumber: values.idNumber,
      identificationType: values.idType,
    };

    const result = await submitSelfRegistration(requestBody);

    if (result.success) {
      setIsRequestSuccessful(true);
      setShowModal(true);

      if (humanResourceRequestId) {
        onSuccess?.(humanResourceRequestId);
      }
    } else {
      setIsRequestSuccessful(false);
      setShowModal(true);
    }

    setSubmitting(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <StyledContainerForm $smallScreen={isMobile}>
        <Stack alignItems="center" justifyContent="space-between">
          <Text type="title" size="medium" appearance="gray">
            Para registrarte debes suministrar la siguiente información.
          </Text>
        </Stack>
        <Divider dashed />

        <Formik
          initialValues={{ idType: "", idNumber: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            errors,
            values,
            setFieldValue,
            isValid,
            isSubmitting,
            touched,
          }) => (
            <Form>
              <Stack gap={spacing.s250} direction="column">
                <Field name="idType">
                  {({ field }: FieldProps) => (
                    <Select
                      {...field}
                      id="idType"
                      name="idType"
                      label="Tipo de Identificación"
                      placeholder="Selecciona de la lista"
                      options={idTypeOptions}
                      value={values.idType}
                      onChange={(name: string, value: string) => {
                        setFieldValue(name, value);
                      }}
                      fullwidth
                      size="compact"
                    />
                  )}
                </Field>
                <Field name="idNumber">
                  {({ field }: FieldProps) => (
                    <Textfield
                      {...field}
                      id="idNumber"
                      name="idNumber"
                      iconBefore={<MdTag />}
                      label="Número de Identificación"
                      placeholder="No. de identificación"
                      value={values.idNumber}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue("idNumber", e.target.value);
                      }}
                      status={
                        touched.idNumber && errors.idNumber
                          ? "invalid"
                          : "pending"
                      }
                      message={
                        touched.idNumber && errors.idNumber
                          ? errors.idNumber
                          : ""
                      }
                      fullwidth
                      type="number"
                      size="compact"
                    />
                  )}
                </Field>
                <Divider dashed />
                <Stack justifyContent="end">
                  <Button
                    type="submit"
                    disabled={
                      !isValid || !touched.idType || isSubmitting || isLoading
                    }
                    loading={isLoading}
                  >
                    {isLoading ? "Enviando..." : "Enviar"}
                  </Button>
                </Stack>
              </Stack>
            </Form>
          )}
        </Formik>
      </StyledContainerForm>

      {showModal && !error && !isLoading && (
        <ResponseModal
          isRequestSent={isRequestSuccessful}
          onCloseModal={handleCloseModal}
          description="En breve, enviaremos un correo con la información necesaria para continuar con el registro o las instrucciones pertinentes."
        />
      )}
    </>
  );
}
