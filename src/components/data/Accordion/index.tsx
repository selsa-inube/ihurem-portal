import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useMediaQuery, Divider, Icon, Text, Button } from "@inubekit/inubekit";

import { StyledContainer, StyledHead } from "./styles";

interface AccordionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  withButton?: boolean;
  buttonText?: string;
  onClickButton?: () => void;
}

function Accordion(props: AccordionProps) {
  const {
    title,
    defaultOpen = true,
    children,
    withButton = false,
    buttonText = "",
    onClickButton,
  } = props;

  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggleOpen = () => {
    if (!withButton) {
      setIsOpen(!isOpen);
    }
  };

  const isMobile = useMediaQuery("(max-width: 450px)");

  return (
    <StyledContainer $isMobile={isMobile}>
      <StyledHead onClick={handleToggleOpen}>
        <Text type="label" size={isMobile ? "medium" : "large"} weight="bold">
          {title}
        </Text>

        {!withButton ? (
          isOpen ? (
            <Icon
              icon={<MdKeyboardArrowUp />}
              appearance="dark"
              spacing="compact"
              cursorHover={true}
              size="20px"
            />
          ) : (
            <Icon
              icon={<MdKeyboardArrowDown />}
              appearance="dark"
              spacing="compact"
              cursorHover={true}
              size="20px"
            />
          )
        ) : (
          <Button spacing="compact" variant="none" onClick={onClickButton}>
            {buttonText}
          </Button>
        )}
      </StyledHead>

      {(isOpen || withButton) && (
        <>
          <Divider dashed />
          {children}
        </>
      )}
    </StyledContainer>
  );
}

export { Accordion };
export type { AccordionProps };
