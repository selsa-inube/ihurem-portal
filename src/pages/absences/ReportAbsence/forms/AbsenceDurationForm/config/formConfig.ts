import { IOption } from "@inubekit/inubekit";

const absenceDurationFormRequiredFields = {
  startDate: true,
  daysDuration: true,
  hoursDuration: false,
  startTime: false,
};

const fullDayMotives = [
  "personal_illness",
  "personal_accident",
  "unpaid_leave",
  "mourning",
];

const startTimeSelectMock: IOption[] = [
  { id: "9", label: "08:00", value: "08:00" },
  { id: "10", label: "09:00", value: "09:00" },
  { id: "11", label: "10:00", value: "10:00" },
  { id: "12", label: "11:00", value: "11:00" },
  { id: "13", label: "12:00", value: "12:00" },
  { id: "14", label: "13:00", value: "13:00" },
  { id: "15", label: "14:00", value: "14:00" },
  { id: "16", label: "15:00", value: "15:00" },
  { id: "17", label: "16:00", value: "16:00" },
  { id: "18", label: "17:00", value: "17:00" },
  { id: "19", label: "18:00", value: "18:00" },
];

export {
  absenceDurationFormRequiredFields,
  startTimeSelectMock,
  fullDayMotives,
};
