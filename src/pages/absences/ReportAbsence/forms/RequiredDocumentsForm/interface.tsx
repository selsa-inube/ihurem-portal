import { Stack, Button, useMediaQuery, Text, Icon } from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { MdInfoOutline } from "react-icons/md";

import { spacing } from "@design/tokens/spacing";

import { RequiredDocumentsTable } from "./RequiredDocumentsTable";
import { IRequiredDocumentsEntry } from "./types";
import { StyledContainer, StyledEmptyMessage } from "./styles";
import { IDocument } from "./RequiredDocumentsTable/types";

interface RequiredDocumentsFormUIProps {
  formik: FormikProps<IRequiredDocumentsEntry>;
  loading?: boolean;
  withNextButton?: boolean;
  documents: IDocument[];
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  onAttachFile?: (document: IDocument, files: File[]) => void;
}

function RequiredDocumentsFormUI(props: RequiredDocumentsFormUIProps) {
  const {
    loading,
    withNextButton,
    documents,
    handleNextStep,
    handlePreviousStep,
    onAttachFile,
  } = props;
  const isMobile = useMediaQuery("(max-width: 700px)");

  return (
    <form>
      <Stack
        direction="column"
        gap={isMobile ? spacing.s300 : spacing.s400}
        justifyContent="space-between"
        height={isMobile ? "auto" : "55vh"}
      >
        <StyledContainer $isMobile={isMobile}>
          {documents && documents.length > 0 ? (
            <RequiredDocumentsTable
              documents={documents}
              onAttachFile={onAttachFile}
            />
          ) : (
            <StyledEmptyMessage>
              <Icon icon={<MdInfoOutline />} appearance="help" size="20px" />
              <Text
                type="label"
                weight="bold"
                size={isMobile ? "medium" : "large"}
              >
                Aún no se han configurado requisitos documentales para las
                condiciones de esta ausencia.
              </Text>
            </StyledEmptyMessage>
          )}
        </StyledContainer>
        {withNextButton && (
          <Stack justifyContent="flex-end" gap={spacing.s250}>
            <Button
              onClick={handlePreviousStep}
              variant="outlined"
              appearance="gray"
            >
              Anterior
            </Button>
            <Button onClick={handleNextStep} disabled={loading}>
              Siguiente
            </Button>
          </Stack>
        )}
      </Stack>
    </form>
  );
}

export { RequiredDocumentsFormUI };
