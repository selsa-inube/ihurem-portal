import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Client } from ".";

const story = {
  components: [Client],
  title: "layouts/register/outlets/clients",
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story: React.ElementType) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

const Default = () => <Client />;

export { Default };
export default story;
