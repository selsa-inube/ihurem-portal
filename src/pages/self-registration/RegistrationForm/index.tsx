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

import { spacing } from "@design/tokens/spacing";

import { StyledContainerForm } from "./styles";
import { useIdentificationTypesForSelect } from "@hooks/enumerators/useIdentificationTypesForSelect";

interface FormValues {
  idType: string;
  idNumber: string;
}

export interface RegistrationFormProps {
  onSubmit?: (values: { idType: string; idNumber: string }) => void;
  onCloseModal?: () => void;
}

export function RegistrationForm(props: RegistrationFormProps) {
  const { onSubmit, onCloseModal } = props;

  const validationSchema = Yup.object({
    idType: Yup.string().required("El tipo de identificación es obligatorio"),
    idNumber: Yup.string()
      .matches(/^\d{6,10}$/, "Debe tener entre 6 y 10 dígitos numéricos")
      .required("El número de identificación es obligatorio"),
  });

  const isMobile = useMediaQuery("(max-width: 700px)");
  const { data } = useIdentificationTypesForSelect();
  const idTypeOptions = data;

  return (
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
        onSubmit={(values, { setSubmitting }: FormikHelpers<FormValues>) => {
          onSubmit?.(values);
          setSubmitting(false);
          onCloseModal?.();
        }}
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
                      touched.idNumber && errors.idNumber ? errors.idNumber : ""
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
                  disabled={!isValid || !touched.idType || isSubmitting}
                >
                  Enviar
                </Button>
              </Stack>
            </Stack>
          </Form>
        )}
      </Formik>
    </StyledContainerForm>
  );
}
