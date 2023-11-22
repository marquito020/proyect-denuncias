import { createTransport } from "nodemailer";

// Ingresar al dashboard de Mailtrap, entrar a la sección de "Email Testing --> Imboxes",
// luego entrar a "My inbox", dirigirse a la pestana de "SMTP Settings"
// y por ultimo dar click en "Integrations" y elegir "Nodejs (Nodemailer)"
// copiar su contenido y remplazarlo por lo de abajo
const transport = createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "d95dba990663a3",
    pass: "bf8de2d3da745a"
  }
});

export { transport };
