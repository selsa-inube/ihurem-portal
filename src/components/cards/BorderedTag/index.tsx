import React from "react";
import { Text } from "@inubekit/inubekit";

import { StyledBorderedTag } from "./styles";

export interface BorderedTagProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  appearance: "success" | "danger" | "warning";
  children: React.ReactNode;
}

function BorderedTag(props: BorderedTagProps): JSX.Element {
  const { appearance, children, ...rest } = props;

  return (
    <StyledBorderedTag $color={appearance} {...rest}>
      <Text type="label" weight="bold" size="medium" appearance={appearance}>
        {children}
      </Text>
    </StyledBorderedTag>
  );
}

export { BorderedTag };
