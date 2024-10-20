const {EmailService}= require('../services');
const { StatusCodes } = require('http-status-codes');
const {SuccessResponse,ErrorResponse} = require('../utils/common');

async function create(req, res){
    try {
        const response= await EmailService.createTicket({
            subject: req.body.subject,
            content: req.body.content,
            recipientEmail: req.body.recipientEmail
        });
        SuccessResponse.data=response;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error=error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse)
    }
}

module.exports= {
    create
}