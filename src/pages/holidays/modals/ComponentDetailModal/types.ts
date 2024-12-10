export interface ModalContent {
  label: string;
  value: string;
}

export interface RequestComponentDetailProps {
  title: string;
  handleClose: () => void;
  buttonLabel: string;
  modalContent: ModalContent[];
  portalId?: string;
}
