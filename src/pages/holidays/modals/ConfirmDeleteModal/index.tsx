import {
  TextAreaModal,
  TextAreaModalProps,
} from "@components/modals/TextAreaModal";
import { labels } from "@i18n/labels";

interface ConfirmDeleteModalProps
  extends Omit<
    TextAreaModalProps,
    "title" | "buttonText" | "inputLabel" | "inputPlaceholder" | "maxLength"
  > {
  onConfirmDelete: (justification: string) => void;
}

export function ConfirmDeleteModal(props: ConfirmDeleteModalProps) {
  const { onConfirmDelete, onCloseModal, ...rest } = props;

  return (
    <TextAreaModal
      {...rest}
      title={labels.holidays.deleteModal.title}
      buttonText={labels.holidays.deleteModal.buttonText}
      inputLabel={labels.holidays.deleteModal.inputLabel}
      inputPlaceholder={labels.holidays.deleteModal.inputPlaceholder}
      maxLength={120}
      secondaryButtonText={labels.holidays.deleteModal.cancelButtonText}
      onSubmit={(values) => {
        onConfirmDelete(values.textarea);
      }}
      onCloseModal={onCloseModal}
    />
  );
}
