import { Grid, Stack } from "@inubekit/inubekit";

import { BoxAttribute } from "@components/cards/BoxAttribute";
import { spacing } from "@design/tokens/spacing";
import { formatDate } from "@utils/date";
import { mockAlertCards } from "@mocks/requirements/requirements-2.mock";
import {
  absenceReasonLabels,
  EAbsenceReason,
  leaveReasonLabels,
  ELeaveReason,
} from "@ptypes/humanResourcesRequest.types";

import { IAbsenceMotiveEntry } from "../../forms/AbsenceMotiveForm/types";
import { IAbsenceDurationEntry } from "../../forms/AbsenceDurationForm/types";
import { IRequiredDocumentsEntry } from "../../forms/RequiredDocumentsForm/types";
import { IFormsUpdateData } from "../../types";

const getLabel = (value?: string, fallback = "N/A") => {
  if (!value) return fallback;

  if (value in absenceReasonLabels) {
    return absenceReasonLabels[value as EAbsenceReason];
  }

  if (value in leaveReasonLabels) {
    return leaveReasonLabels[value as ELeaveReason];
  }

  return value;
};

const renderRequirementsVerification = (isTablet: boolean) => {
  if (mockAlertCards.length === 0) return null;

  return (
    <Grid
      templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
      autoRows="auto"
      gap={spacing.s250}
      width="100%"
    >
      {mockAlertCards.map((alert, index) => (
        <Stack key={index} direction="column" gap={spacing.s050}>
          <BoxAttribute
            label={alert.requirement}
            value={alert.cause}
            direction="column"
          />
        </Stack>
      ))}
    </Grid>
  );
};

const renderAbsenceMotiveVerification = (
  values: IAbsenceMotiveEntry,
  isTablet: boolean,
) => {
  return (
    <>
      <Grid
        templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
        autoRows="auto"
        gap={spacing.s250}
        width="100%"
      >
        {values.motive && (
          <BoxAttribute
            label="Motivo:"
            value={getLabel(values.motive)}
            direction="column"
          />
        )}
        {values.subMotive && (
          <BoxAttribute
            label="Submotivo:"
            value={getLabel(values.subMotive)}
            direction="column"
          />
        )}
      </Grid>
      {values.motiveDetails && (
        <Stack width="100%" direction="column">
          <BoxAttribute
            label="Detalles del motivo:"
            value={values.motiveDetails || "N/A"}
            direction="column"
          />
        </Stack>
      )}
    </>
  );
};

const renderAbsenceDurationVerification = (
  values: IAbsenceDurationEntry,
  isTablet: boolean,
) => {
  const hasHoursDuration =
    values.hoursDuration && Number(values.hoursDuration) > 0;

  return (
    <>
      {values.startDate && (
        <Stack width="100%" direction="column">
          <BoxAttribute
            label="Fecha de inicio:"
            value={values.startDate ? formatDate(values.startDate) : "N/A"}
            direction="column"
          />
        </Stack>
      )}
      <Grid
        templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
        autoRows="auto"
        gap={spacing.s250}
        width="100%"
      >
        {values.daysDuration && (
          <BoxAttribute
            label="Duración en días:"
            value={values.daysDuration || "0"}
            direction="column"
          />
        )}
        {values.hoursDuration && (
          <BoxAttribute
            label="Duración en horas:"
            value={values.hoursDuration || "0"}
            direction="column"
          />
        )}
        {hasHoursDuration && (
          <BoxAttribute
            label="Hora de inicio aproximada:"
            value={values.startTime || "N/A"}
            direction="column"
          />
        )}
      </Grid>
    </>
  );
};

const renderRequiredDocumentsVerification = (
  values: IRequiredDocumentsEntry,
  isTablet: boolean,
) => {
  const documents = values.documents || [];

  if (documents.length === 0) {
    return (
      <BoxAttribute
        label="Documentos requeridos:"
        value="No hay documentos asociados"
        direction="column"
      />
    );
  }

  return (
    <Grid
      templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
      autoRows="auto"
      gap={spacing.s250}
      width="100%"
    >
      {documents.map((doc, index) => {
        const filesCount = doc.attachedFiles ? doc.attachedFiles.length : 0;
        const files =
          filesCount > 0
            ? `${filesCount} ${filesCount === 1 ? "archivo adjunto." : "archivos adjuntos."}`
            : "No adjunto.";

        return (
          <BoxAttribute
            key={index}
            label={doc.name}
            value={files}
            direction="column"
          />
        );
      })}
    </Grid>
  );
};

interface VerificationBoxesProps {
  updatedData: IFormsUpdateData;
  stepKey: number;
  isTablet: boolean;
}

function VerificationBoxes({
  updatedData,
  stepKey,
  isTablet,
}: VerificationBoxesProps) {
  return (
    <>
      {stepKey === 1 && renderRequirementsVerification(isTablet)}
      {stepKey === 2 &&
        renderAbsenceMotiveVerification(
          updatedData.absenceMotiveInformation.values,
          isTablet,
        )}
      {stepKey === 3 &&
        renderAbsenceDurationVerification(
          updatedData.absenceDurationInformation.values,
          isTablet,
        )}
      {stepKey === 4 &&
        renderRequiredDocumentsVerification(
          updatedData.requiredDocumentsInformation.values,
          isTablet,
        )}
    </>
  );
}

export { VerificationBoxes };
