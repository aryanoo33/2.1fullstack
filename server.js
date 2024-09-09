const express = require('express');
const bodyParser = require('body-parser');
const mailgun = require('mailgun-js');
require('dotenv').config();

// Initialize Mailgun
const api_key = '2ac91ccec89d5098463c384f00404d22-826eddfb-e4fffe49';
const domain = 'sandbox79cdf07b571045ed872daf282e4bfdea.mailgun.org';
const mg = mailgun({ apiKey: api_key, domain: domain });

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Handle form submission
app.post('/', (req, res) => {
    const email = req.body.email;

    const data = {
        from: 'aryan4768.be23@chitkara.edu.in',
        to: email,
        subject: 'Welcome to Deakin!',
        text: 'Welcome to Deakin subscription',
    };

    mg.messages().send(data, (error, body) => {
        if (error) {
            console.error("Error sending email:", error);
            res.status(500).send("Error sending email");
        } else {
            console.log("Email sent:", body);
            res.send("Your email was sent successfully");
        }
    });
});

const port = process.env.PORT || 8050;
app.listen(port, () => {
    console.log(`Server is running at port ${port}!!!`);
});
