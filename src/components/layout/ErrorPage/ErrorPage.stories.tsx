import { Meta } from "@storybook/react";

import selsaLogo from "@assets/images/logoInube.png";
import errorImage from "@assets/images/img-team-building-68.png";

import { ErrorPage, ErrorPageProps } from "./index";

const meta: Meta<typeof ErrorPage> = {
  title: "layout/Error",
  component: ErrorPage,
};

export const Default = (args: ErrorPageProps) => <ErrorPage {...args} />;

Default.args = {
  logo: selsaLogo,
  logoAlt: "Sistemas Enlinea",
  heading: "¡Ups! Algo salió mal...",
  description:
    "No estás registrado(a) o las atribuciones utilizadas no corresponden con las registradas.",
  image: errorImage,
  imageAlt: "Ha surgido un error. Revisa la descripción",
};

export default meta;
