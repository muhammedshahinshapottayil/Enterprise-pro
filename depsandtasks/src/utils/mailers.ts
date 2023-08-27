import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "muhammedshahinshap07@gmail.com",
    pass: "ayujkizpxqdyqpok",
  },
});

const verificationEmail = async (mail: string, id: string) => {
  const info = await transporter.sendMail({
    from: `muhammedshahinshap07@gmail.com`,
    to: `${mail}`,
    subject: `Guarenteed verification mail`,
    text: `please click on the link to confirm`,
    html: `This is a verification process from guarenteed please click the link to verify <a href='http://localhost:3000/verify/${id}' >Click Here</a>`,
  });
};

export { verificationEmail };
