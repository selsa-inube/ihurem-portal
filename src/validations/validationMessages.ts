const validationMessages = {
  maxCharacters: (count: number) => `Debe tener máximo ${count} caracteres`,
  minNumbers: (count: number) => `Debe tener al menos ${count} números`,
  maxDays: (count: number) => `Debe tener máximo ${count} dias`,
  numbers: (count: number) => `Debe tener ${count} números`,
  required: "Este campo no puede estar vacío",
  onlyLetters: "Este campo debe contener solo letras",
  onlyNumbers: "Este campo debe contener solo numeros",
  identification: "Este campo debe contener un número de identificación válido",
  email: "Este campo debe tener una dirección de correo electrónico válida",
  phone: "Este campo debe tener un número de teléfono movil válido",
  password: `Este campo debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número`,
  passwordMatch: "Las contraseñas no coinciden",
  date: "Formato de fecha incorrecto. Ejemplo de formato: 01/Ene/1990.",
  zipCode: "Este campo debe contener un código postal válido",
  landlinePhone: "Este campo debe tener un número de teléfono fijo válido",
  country: "Este campo debe contener un país válido",
  stateOrDepartment: "Este campo debe contener un estado o departamento válido",
  city: "Este campo debe contener una ciudad válida",
  notPastDate: "La fecha no puede ser anterior o igual al día actual",
};

export { validationMessages };
