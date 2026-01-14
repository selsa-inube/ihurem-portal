import {
  Textarea,
  Icon,
  Stack,
  Text,
  Button,
  useMediaQuery,
  Blanket,
  Divider,
  IButtonAppearance,
} from "@inubekit/inubekit";
import { createPortal } from "react-dom";
import { Formik, Form, Field, FieldProps, FormikHelpers } from "formik";
import * as Yup from "yup";
import { MdClear } from "react-icons/md";

import { labels } from "@i18n/labels";
import { spacing } from "@design/tokens/spacing";

import { StyledModal, StyledContainerClose } from "./styles";

interface FormValues {
  textarea: string;
}

export interface TextAreaModalProps {
  title: string;
  buttonText: string;
  inputLabel: string;
  inputPlaceholder: string;
  maxLength?: number;
  portalId?: string;
  readOnly?: boolean;
  hideCharCount?: boolean;
  disableTextarea?: boolean;
  secondaryButtonText?: string;
  description?: string;
  submitButtonAppearance?: IButtonAppearance;
  onSubmit?: (values: { textarea: string }) => void;
  onCloseModal?: () => void;
  onSecondaryButtonClick?: () => void;
}

export function TextAreaModal(props: TextAreaModalProps) {
  const {
    title,
    buttonText,
    inputLabel,
    inputPlaceholder,
    maxLength = 200,
    portalId = labels.modals.portalId,
    readOnly = false,
    disableTextarea = false,
    secondaryButtonText = labels.modals.textAreaModal.cancel,
    description,
    submitButtonAppearance,
    onSubmit,
    onCloseModal,
    onSecondaryButtonClick,
  } = props;

  const validationSchema = Yup.object({
    textarea: readOnly
      ? Yup.string()
      : Yup.string()
          .max(maxLength, labels.modals.textAreaModal.charCountError)
          .required(labels.modals.textAreaModal.requiredError),
  });

  const isMobile = useMediaQuery("(max-width: 700px)");
  const portalNode = document.getElementById(portalId);

  if (!portalNode) {
    throw new Error(
      "The portal node is not defined. Ensure the specific node exists in the DOM.",
    );
  }

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Stack alignItems="center" justifyContent="space-between">
          <Text type="headline" size="small">
            {title}
          </Text>
          <StyledContainerClose onClick={onCloseModal}>
            <Stack alignItems="center" gap="8px">
              <Text>{labels.modals.textAreaModal.close}</Text>
              <Icon
                icon={<MdClear />}
                size="24px"
                cursorHover
                appearance="dark"
              />
            </Stack>
          </StyledContainerClose>
        </Stack>
        <Divider />
        <Text>{description}</Text>
        <Formik
          initialValues={{ textarea: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }: FormikHelpers<FormValues>) => {
            onSubmit?.(values);
            setSubmitting(false);
            onCloseModal?.();
          }}
        >
          {({ errors, touched, values }) => {
            const submitAppearance = values.textarea
              ? (submitButtonAppearance ?? "danger")
              : "gray";
            return (
              <Form>
                <Field name="textarea">
                  {({ field }: FieldProps) => (
                    <Textarea
                      {...field}
                      id="textarea"
                      label={inputLabel}
                      placeholder={inputPlaceholder}
                      maxLength={maxLength}
                      status={
                        touched.textarea && errors.textarea
                          ? "invalid"
                          : "pending"
                      }
                      message={
                        touched.textarea && errors.textarea
                          ? errors.textarea
                          : ""
                      }
                      fullwidth
                      disabled={disableTextarea}
                    />
                  )}
                </Field>
                <Stack
                  justifyContent="end"
                  margin={`${spacing.s150} ${spacing.s0}`}
                  gap={spacing.s250}
                >
                  <Button
                    type="button"
                    variant="outlined"
                    appearance="gray"
                    onClick={() => {
                      onSecondaryButtonClick?.();
                      onCloseModal?.();
                    }}
                  >
                    {secondaryButtonText}
                  </Button>
                  <Button
                    type="submit"
                    disabled={!values.textarea || disableTextarea}
                    appearance={submitAppearance}
                  >
                    {buttonText}
                  </Button>
                </Stack>
              </Form>
            );
          }}
        </Formik>
      </StyledModal>
    </Blanket>,
    portalNode,
  );
}
