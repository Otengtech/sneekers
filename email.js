import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json())


app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    })

    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: "otengebenezer326@gmail.com",
      subject: `Message from ${name}`,
      text: `Email ${email} \n ${message}`
    }

    await transporter.sendMail(mailOptions)
    res.status(200).json({ message: "Email successfully sent" })
  }
  catch (error) {
    console.log("Error sending email", error);
    res.status(500).json({ message: "Error sending email" })
  }
})

app.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: "otengebenezer326@gmail.com",
      subject: "New Newsletter Subscriber",
      text: `A new user has subscribed to your newsletter: ${email}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Subscribed successfully!" });
  } catch (error) {
    console.log("Newsletter subscription error:", error);
    res.status(500).json({ message: "Subscription failed." });
  }
});


app.listen(PORT, () => console.log(`listening to port ${PORT}`))

