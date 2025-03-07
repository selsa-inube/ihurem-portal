import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Clients } from ".";

const story = {
  components: [Clients],
  title: "layouts/login/outlets/clients",
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

const Default = () => <Clients />;

export { Default };
export default story;
