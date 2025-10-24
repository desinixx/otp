// server.js
import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "desinix0@gmail.com",
    pass: "umjh yndq qgtb peba"
  }
});

const otps = {};

app.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);
  otps[email] = otp;

  try {
    await transporter.sendMail({
      from: '"Neecogreen" <desinix0@gmail.com>',
      to: email,
      subject: "Your Neecogreen OTP",
      text: `Your Neecogreen verification code is ${otp}. It expires in 5 minutes.`
    });
    res.json({ ok: true });
  } catch (e) {
    res.json({ ok: false, error: e.message });
  }
});

app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  if (otps[email] && otps[email] == otp) {
    delete otps[email];
    res.json({ ok: true });
  } else res.json({ ok: false });
});

app.listen(3000, () => console.log("Neecogreen OTP server running on port 3000"));
