import { Icon, Text } from "@inubekit/inubekit";

import { StyledButton } from "./styles";

interface IButtonRequirementsProps {
  counter: number;
  buttonText?: string;
  buttonIcon?: React.JSX.Element;
  isMobile?: boolean;
  onClick: () => void;
}

export function ButtonRequirements(props: IButtonRequirementsProps) {
  const { counter, buttonIcon, buttonText, isMobile, onClick } = props;

  const dataCount = counter;

  return (
    <StyledButton onClick={onClick} $data={dataCount}>
      <Icon icon={buttonIcon} appearance="gray" size="18px" />
      {!isMobile && (
        <Text type="label" weight="bold" appearance="gray">
          {buttonText}
        </Text>
      )}
    </StyledButton>
  );
}
