import * as Yup from "yup";

import { validationMessages } from "./validationMessages";

const validationRules = {
  daysOff: Yup.number()
    .min(1, validationMessages.minNumbers(1))
    .max(15, validationMessages.maxDays(15))
    .required(validationMessages.required),

  startDate: Yup.date()
    .required(validationMessages.required)
    .typeError(validationMessages.date)
    .min(new Date(), validationMessages.notPastDate),

  observations: Yup.string().max(1000, validationMessages.maxCharacters(1000)),

  certification: Yup.string()
    .required(validationMessages.required)
    .max(100, validationMessages.maxCharacters(100)),

  addressee: Yup.string()
    .required(validationMessages.required)
    .max(100, validationMessages.maxCharacters(100)),

  contract: Yup.string()
    .required(validationMessages.required)
    .max(100, validationMessages.maxCharacters(100)),
};

export { validationRules };
