import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Heading,
  Text,
  Button,
  Hr,
} from "@react-email/components";


interface WelcomeEmailProps {
  name: string;
  actionUrl: string;
}

export const WelcomeEmail = ({ name, actionUrl }: WelcomeEmailProps) => {
  return (
    <Html lang="es">
      <Head />
      <Preview>¡Bienvenido a OrderFast, {name}!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>¡Hola {name}!</Heading>
          <Text style={paragraph}>
            Gracias por registrarte en nuestra plataforma. Estamos muy contentos de tenerte con nosotros.
          </Text>
          <Button style={button} href={actionUrl}>
            Comenzar ahora
          </Button>
          <Hr style={hr} />
          <Text style={footer}>OrderFast S.A. - Todos los derechos reservados.</Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const heading = {
  fontSize: "24px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#484848",
  padding: "0 48px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#484848",
  padding: "0 48px",
};

const button = {
  backgroundColor: "#5F51E8",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px 24px",
  margin: "24px 48px",
};

const hr = {
  borderColor: "#dddddd",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  padding: "0 48px",
};
