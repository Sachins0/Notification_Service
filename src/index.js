const express=require('express');
const amqplib= require('amqplib');

const {EmailService}= require('./services');
const {ServerConfig, Logger}= require('./config');
const apiRoutes= require('./routes');

async function connectQueue(){
    try {
        const connection= await amqplib.connect(ServerConfig.RabbitMQ_URI);
        const channel= await connection.createChannel();
        await channel.assertQueue(ServerConfig.queue);
        channel.consume(ServerConfig.queue,async(data)=>{
            const object= JSON.parse(Buffer.from(data.content));
            await EmailService.sendMail(ServerConfig.GMAIL_EMAIL, object.recipientEmail, object.subject, object.text);
            channel.ack(data);
        })
    } catch (error) {
        console.log(error);
    }
}

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api',apiRoutes);

app.listen(ServerConfig.PORT,()=>{
    console.log(`Successfully started the server on PORT: ${ServerConfig.PORT}`);
    connectQueue();
})