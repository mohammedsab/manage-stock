import nodemailer from "nodemailer";
import Mailgen from "mailgen";

export default (user, product, lowQuantity = false) => {
  let config = {
    service: "gmail",
    auth: {
      user: "mo7ammedsab@gmail.com",
      pass: process.env.GMAIL_PASS,
    },
  };

  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: product.name,
      link: product.urls.admin,
    },
  });

  let respose = {
    body: {
      name: user.name,
      intro: lowQuantity
        ? "We notify you your product is low"
        : "You do not make notify quantity for product",
      table: {
        data: [
          {
            item: product.name,
            quatity: product.quantity,
            notify_quantity: product.notify_quantity,
          },
        ],
      },
      action: {
        instructions: lowQuantity
          ? "We notify you your product is low"
          : "To get notification about product quantity status update notify quantity",
        button: {
          color: lowQuantity ? "#f00" : "#22BC66",
          text: product.name,
          link: product.urls.admin,
        },
      },
      outro: "Looking forword to update this value.",
    },
  };

  let mail = MailGenerator.generate(respose);

  let message = {
    from: "mo7ammedsab@gmail.com",
    to: "mo7ammedfci@gmail.com",
    subject: "Updata product notify quantity",
    html: mail,
  };

  transporter
    .sendMail(message)
    .then(() => {
      console.log("you should receive an email!");
    })
    .catch((error) => console.log(error));
};
