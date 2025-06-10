const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const whatsappFrom = 'whatsapp:' + (process.env.TWILIO_WHATSAPP_FROM || '+14155238886'); // fallback

const client = twilio(accountSid, authToken);

const sendWhatsapp = async (to, message) => {
  try {
    const response = await client.messages.create({
      body: message,
      from: whatsappFrom,
      to: 'whatsapp:' + to,
    });
    console.log('✅ WhatsApp message sent:', response.sid);
  } catch (err) {
    console.error('❌ WhatsApp send error:', err.message);
  }
};

module.exports = sendWhatsapp;
