import styled from "styled-components";

const StyledClients = styled.div`
  & form {
    & > div {
      margin: 48px auto 0px;
      width: 500px;
      @media screen and (max-width: 532px) {
        width: auto;
      }
    }
  }

  & button {
    margin-top: 24px;
  }
`;

export { StyledClients };
