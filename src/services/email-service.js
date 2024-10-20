const {TicketRepository}= require('../repositories');
const {Mailer}= require('../config');

const TicketRepo= new TicketRepository();

async function sendMail(mailFrom, mailTo, subject, text){
    try {
        const response= await Mailer.sendMail({
            from: mailFrom,
            to: mailTo,
            subject: subject,
            text: text
        });

        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function createTicket(data){
    try {
        const response= await TicketRepo.create(data);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getPendingEmails(){
    try {
        const response= await TicketRepo.getPendingTickets();
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports= {
    sendMail,
    createTicket,
    getPendingEmails
}
