const nodemailer = require('nodemailer')
require('dotenv').config();

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use TLS
    auth: {
        user: process.env.SMTP_TO_EMAIL,
        pass: process.env.SMTP_TO_PASSWORD,
    },
})

exports.sendMail = async (req, res) => {
    try {
        await transport.sendMail({
            from: `"Gala CPE" <${process.env.SMTP_TO_EMAIL}>`, // sender address
            to: req.mail, // list of receivers
            subject: "Votre demande de réservation pour le repas", // Subject line
            text: `${req.name} \n Voici votre récapitulatif pour votre repas de gala \n ${req.text} 
                Rendez-vous le 29 Novembre 2024 à l'adresse suivante : 1 quai Charles de Gaulle, 69006 Lyon 6e\n `, // plain text body
            html: `
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        color: #333;
                        margin: 0;
                        padding: 0;
                    }
                    .email-container {
                        width: 100%;
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #ffffff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    }
                    h1 {
                        font-size: 24px;
                        color: hsl(230, 50%, 5%);
                    }
                    h2 {
                        font-size: 20px;
                        color: #333;
                    }
                    p {
                        font-size: 16px;
                        line-height: 1.6;
                    }
                    b {
                        color: red;
                    }
                    .footer {
                        font-size: 12px;
                        color: #777;
                        margin-top: 20px;
                        text-align: center;
                    }
                    .cta {
                        display: inline-block;
                        background-color: hsl(230, 50%, 5%);
                        color: #ffffff;
                        padding: 10px 20px;
                        border-radius: 4px;
                        text-decoration: none;
                        margin-top: 20px;
                    }
                </style>

                <div class="email-container">
                    <h1>${req.name}</h1>
                    <h2>Voici le récapitulatif pour votre repas de gala</h2>
                    <p><b>Attention : </b>votre numéro de table pourrait changer, vous serez prévenus le cas échéant.</p>
                    <p>${req.text}</p>
                    <p>Rendez-vous le <b>29 Novembre 2024</b> à l'adresse suivante :</p>
                    <a href="https://maps.app.goo.gl/cdUDxC3NMKi5LVjD9">1 quai Charles de Gaulle, 69006 Lyon 6e</a>

                    <div class="footer">
                        <p>Si vous avez des questions, contactez-nous à <a href="mailto:gala.cpe@gmail.com">gala.cpe@gmail.com</a></p>
                    </div>
                </div>
            ` // html body
        });

        return "Message sent";
    } catch (error) {
        return error.message
    }

}

exports.sendFinalMail = async (bookings) => {
    for(const booking of bookings){
        try {
            await transport.sendMail({
                from: `"Gala CPE" <${process.env.SMTP_TO_EMAIL}>`, // sender address
                to: booking.person.email, // list of receivers
                subject: "Votre réservation pour le repas", // Subject line
                text: `Bonjour ${booking.person.first_name} ${booking.person.last_name} \n Voici votre table pour le repas de gala \n 
                    Vous avez ${booking.seats_booked} place(s) et êtes placés à la table numéro ${booking.table.number} : ${booking.table.name} 
                    Rendez-vous le 29 Novembre 2024 à l'adresse suivante : 1 quai Charles de Gaulle, 69006 Lyon 6e\n `, // plain text body
                html: `
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f4;
                            color: #333;
                            margin: 0;
                            padding: 0;
                        }
                        .email-container {
                            width: 100%;
                            max-width: 600px;
                            margin: 0 auto;
                            background-color: #ffffff;
                            padding: 20px;
                            border-radius: 8px;
                            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                        }
                        h1 {
                            font-size: 24px;
                            color: hsl(230, 50%, 5%);
                        }
                        h2 {
                            font-size: 20px;
                            color: #333;
                        }
                        p {
                            font-size: 16px;
                            line-height: 1.6;
                        }
                        b {
                            color: red;
                        }
                        .footer {
                            font-size: 12px;
                            color: #777;
                            margin-top: 20px;
                            text-align: center;
                        }
                        .cta {
                            display: inline-block;
                            background-color: hsl(230, 50%, 5%);
                            color: #ffffff;
                            padding: 10px 20px;
                            border-radius: 4px;
                            text-decoration: none;
                            margin-top: 20px;
                        }
                    </style>
    
                    <div class="email-container">
                        <h1>${booking.person.first_name} ${booking.person.last_name}</h1>
                        <h2>Voici le récapitulatif pour votre repas du gala</h2>
                        <p>Vous avez ${booking.seats_booked} place(s) et êtes placés à la table numéro ${booking.table.number} : ${booking.table.name} </p>
                        <p>Rendez-vous le <b>29 Novembre 2024</b> à l'adresse suivante :</p>
                        <a href="https://maps.app.goo.gl/cdUDxC3NMKi5LVjD9">1 quai Charles de Gaulle, 69006 Lyon 6e</a>
    
                        <div class="footer">
                            <p>Si vous avez des questions, contactez-nous à <a href="mailto:gala.cpe@gmail.com">gala.cpe@gmail.com</a></p>
                        </div>
                    </div>
                ` // html body
            });

        } catch (error) {
            return error.message
        }
    }

    return "Message sent";

}