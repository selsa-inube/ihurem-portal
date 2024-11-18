import styled from "styled-components";
import { inube } from "@inubekit/foundations";

interface StyledHolidaysContainerProps {
  $isMobile: boolean;
}

const StyledHolidaysContainer = styled.div<StyledHolidaysContainerProps>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 8px;
  border: 1px solid
    ${({ theme }) =>
      theme?.color?.stroke.dark.regular || inube.palette.neutral.N30};

  padding: ${({ $isMobile }) => ($isMobile ? "24px 12px" : "24px")};
`;

export { StyledHolidaysContainer };
