import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";
import { useMediaQuery } from "@inubekit/hooks";

interface PageTitleProps {
  title: string;
  icon?: JSX.Element;
  description?: string;
  navigatePage?: string;
}

function PageTitle(props: PageTitleProps) {
  const { title, description, navigatePage } = props;

  const smallScreen = useMediaQuery("(max-width:880px)");
  const navigate = useNavigate();

  return (
    <>
      <Stack gap="8px" direction="column">
        <Stack gap="8px" alignItems="center">
          <Icon
            appearance="dark"
            cursorHover={true}
            icon={<MdArrowBack />}
            size="20px"
            onClick={() =>
              navigatePage ? navigate(navigatePage) : navigate(-1)
            }
          />
          <Text as="h1" type="title">
            {title}
          </Text>
        </Stack>
        <Text appearance="gray" size={smallScreen ? "small" : "medium"}>
          {description}
        </Text>
      </Stack>
    </>
  );
}

export { PageTitle };
export type { PageTitleProps };
