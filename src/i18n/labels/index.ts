import { absences } from "./absences";
import { certifications } from "./certifications";
import { home } from "./home";
import { holidays } from "./holidays";
import { modals } from "./modals";
import { layout } from "./layout";
import { data } from "./data";
import { selfRegistrationLabels } from "./self-registration";
import { protectedRouteLabels } from "./protectedRoute";
import { loginLabels } from "./login";
import { config } from "./config";

export const labels = {
  absences,
  certifications,
  home,
  holidays,
  modals,
  layout,
  data,
  selfRegistrationLabels,
  protectedRouteLabels,
  loginLabels,
  config,
};

export type Labels = typeof labels;
