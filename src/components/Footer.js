import styled from "styled-components";

const Container = styled.div`
  background-color: beige;
`;

const FooterCom = styled.footer``;

const Column = styled.div``;

function Footer() {
  return (
    <Container>
      <FooterCom>
        <Column></Column>
        <Column></Column>
      </FooterCom>
    </Container>
  );
}

export default Footer;
