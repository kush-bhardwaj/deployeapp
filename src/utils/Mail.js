const nodemailer = require('nodemailer')
const MailTransporter = nodemailer.createTransport({
    service:"gmail",
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:"kushbhardwaj8800@gmail.com",
        pass:"plezichnzrztdbce"
    }
})

async function SentMail(to,subject,text,html){
    const info   = await MailTransporter.sendMail({
        from:"MegazStroe",
        to:to,
        subject:subject,
        text:text,
        html:html
    })
}
module.exports = SentMail;