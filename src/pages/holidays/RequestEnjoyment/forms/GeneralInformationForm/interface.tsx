import {
  Stack,
  Button,
  Select,
  Textarea,
  Textfield,
  useMediaQuery,
  Text,
} from "@inubekit/inubekit";
import { useEffect, useState, useMemo } from "react";
import { FormikProps } from "formik";
import * as Yup from "yup";

import { isRequired, getFieldState } from "@utils/forms/forms";
import { spacing } from "@design/tokens/spacing";
import { useAppContext } from "@context/AppContext";
import { IOption } from "@ptypes/util.type";
import { useDayOptions } from "@hooks/useDayOptions";

import { IGeneralInformationEntry } from "./types";
import { StyledContainer, StyledDateContainer } from "./styles";
import { monthAbbr, monthFull } from "./config/formConfig";

interface GeneralInformationFormUIProps {
  formik: FormikProps<IGeneralInformationEntry>;
  validationSchema: Yup.ObjectSchema<Yup.AnyObject>;
  loading?: boolean;
  withNextButton?: boolean;
  handlePreviousStep: () => void;
  handleNextStep: () => void;
}

const MONTH_OPTIONS: IOption[] = monthFull.map((label, index) => ({
  id: String(index),
  value: String(index),
  label,
}));

function GeneralInformationFormUI(props: GeneralInformationFormUIProps) {
  const {
    formik,
    loading,
    withNextButton,
    handlePreviousStep,
    handleNextStep,
  } = props;
  const isMobile = useMediaQuery("(max-width: 700px)");
  const { employees } = useAppContext();

  const [yearOptions, setYearOptions] = useState<IOption[]>([]);
  const [monthOptions, setMonthOptions] = useState<IOption[]>([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const { dayOptions, selectedDay, setSelectedDay } = useDayOptions(
    selectedYear,
    selectedMonth,
    "",
  );

  const contractOptions = useMemo(
    () =>
      (employees.employmentContracts ?? []).map((c) => ({
        id: c.contractId,
        value: `${c.businessName} - ${c.contractType}`,
        label: `${c.businessName} - ${c.contractType}`,
      })),
    [employees.employmentContracts],
  );

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const opts = [currentYear, currentYear + 1].map((y) => ({
      id: String(y),
      value: String(y),
      label: String(y),
    }));
    setYearOptions(opts);
  }, []);

  useEffect(() => {
    const sd = formik.values.startDate;
    if (sd) {
      const [d, mName, y] = sd.split("/");
      const mIdx = monthAbbr.indexOf(mName);
      setSelectedYear(y);
      setSelectedMonth(String(mIdx));
      setSelectedDay(d);
    }
  }, [formik.values.startDate, setSelectedDay]);

  useEffect(() => {
    if (!selectedYear) {
      setMonthOptions([]);

      return;
    }
    const current = new Date();
    const yearNum = parseInt(selectedYear, 10);
    const available =
      yearNum > current.getFullYear()
        ? MONTH_OPTIONS
        : MONTH_OPTIONS.filter((_, idx) => idx >= current.getMonth());
    setMonthOptions(available);
  }, [selectedYear]);

  useEffect(() => {
    if (selectedYear && selectedMonth && selectedDay) {
      const formatted = `${selectedDay}/${monthAbbr[parseInt(selectedMonth, 10)]}/${selectedYear}`;
      formik.setFieldValue("startDate", formatted);
    } else {
      formik.setFieldValue("startDate", "");
    }
  }, [selectedYear, selectedMonth, selectedDay]);

  useEffect(() => {
    if (contractOptions.length === 1 && !formik.values.contract) {
      const opt = contractOptions[0];
      formik.setFieldValue("contract", opt.value);
      formik.setFieldValue("contractDesc", opt.label);
    }
  }, [contractOptions]);

  return (
    <form>
      <Stack direction="column" gap={isMobile ? spacing.s300 : spacing.s400}>
        <StyledContainer $isMobile={isMobile}>
          <Stack direction="column" width="100%" gap={spacing.s200}>
            <Stack direction={isMobile ? "column" : "row"} gap={spacing.s200}>
              <Textfield
                label="Días de disfrute"
                placeholder="Ej: 2"
                name="daysOff"
                id="daysOff"
                type="number"
                value={formik.values.daysOff}
                status={getFieldState(formik, "daysOff")}
                message={formik.errors.daysOff}
                disabled={loading}
                size="compact"
                fullwidth
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required={isRequired(props.validationSchema, "daysOff")}
              />
              <Stack direction="column" gap={spacing.s050} width="100%">
                <Text
                  type="label"
                  weight="bold"
                  size="medium"
                  padding={`${spacing.s0} ${spacing.s200}`}
                >
                  Fecha de inicio
                </Text>
                <StyledDateContainer>
                  <Select
                    name="startDateYear"
                    id="startDateYear"
                    placeholder={isMobile ? "Año" : "Selecciona año"}
                    options={yearOptions}
                    value={selectedYear}
                    disabled={loading}
                    size="compact"
                    onChange={(_, v) => setSelectedYear(v)}
                    required={isRequired(props.validationSchema, "startDate")}
                  />
                  <Select
                    name="startDateMonth"
                    id="startDateMonth"
                    placeholder={isMobile ? "Mes" : "Selecciona mes"}
                    options={monthOptions}
                    value={selectedMonth}
                    disabled={!selectedYear || loading}
                    size="compact"
                    onChange={(_, v) => setSelectedMonth(v)}
                    required={isRequired(props.validationSchema, "startDate")}
                  />
                  <Select
                    name="startDateDay"
                    id="startDateDay"
                    placeholder={isMobile ? "Día" : "Selecciona día"}
                    options={dayOptions}
                    value={selectedDay}
                    disabled={!selectedMonth || !selectedYear || loading}
                    message={formik.errors.startDate}
                    size="compact"
                    onChange={(_, v) => setSelectedDay(v)}
                    required={isRequired(props.validationSchema, "startDate")}
                  />
                </StyledDateContainer>
              </Stack>
            </Stack>
            {contractOptions.length > 1 && (
              <Select
                label="Contrato"
                name="contract"
                options={contractOptions}
                placeholder="Selecciona de la lista"
                value={formik.values.contract}
                message={formik.errors.contract}
                disabled={loading}
                size="compact"
                fullwidth
                onChange={(_, v) => {
                  formik.setFieldValue("contract", v);
                  const lbl =
                    contractOptions.find((o) => o.value === v)?.label ?? "";
                  formik.setFieldValue("contractDesc", lbl);
                }}
                required={isRequired(props.validationSchema, "contract")}
              />
            )}
            <Textarea
              label="Observaciones"
              placeholder="Detalles a tener en cuenta."
              name="observations"
              id="observations"
              value={formik.values.observations}
              maxLength={1000}
              disabled={loading}
              status={getFieldState(formik, "observations")}
              message={formik.errors.observations}
              fullwidth
              required={isRequired(props.validationSchema, "observations")}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
          </Stack>
        </StyledContainer>
        {withNextButton && (
          <Stack justifyContent="flex-end" gap={spacing.s250}>
            <Button
              appearance="gray"
              variant="outlined"
              onClick={handlePreviousStep}
            >
              Anterior
            </Button>
            <Button
              onClick={handleNextStep}
              disabled={loading ?? !formik.isValid}
            >
              Siguiente
            </Button>
          </Stack>
        )}
      </Stack>
    </form>
  );
}

export { GeneralInformationFormUI };
