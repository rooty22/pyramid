const bodyParser = require("body-parser")
const express = require("express")
const nodemailer = require("nodemailer")

const app = express()
app.use(bodyParser.urlencoded())

const contactAddress = "hey@yourwebsite.com"

const mailer = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "625fb9e62f59f9",
    pass: "b9677f49fab02f",
  },
})

app.post("/send-contact", function (req, res) {
  mailer.sendMail(
    {
      from: req.body.from,
      to: [contactAddress],
      subject: req.body.subject || "[No subject]",
      html: req.body.message || "[No message]",
    },
    function (err, info) {
      if (err) return res.status(500).send(err)
      res.json({ success: true })
    }
  )
})

app.listen(3000)
