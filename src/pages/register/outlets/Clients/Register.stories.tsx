import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Client } from ".";

const storyRegister = {
  components: [Client],
  title: "register",
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

const DefaultRegister = () => <Client />;

export { DefaultRegister };
export default storyRegister;
