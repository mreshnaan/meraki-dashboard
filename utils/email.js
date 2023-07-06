const sendgrid = require('@sendgrid/mail');
const EmailModel = require('../models/EmailModel');
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async (to, subject, title, body, actionName, actionUrl) => {
  const msg = {
    to: to,
    from: 'merakiticketing@gmail.com',
    subject: subject,
    templateId: 'd-3bc7e257855e41a3a3ff7b09a61fd738',
    dynamic_template_data: {
      title: title,
      body: body,
      actionName: actionName,
      actionUrl: actionUrl
    },
  }

  try {
    await sendgrid.send(msg);
    await EmailModel.create({
      to: to,
      dateTime: new Date().toISOString(),
      body: JSON.stringify({ to, subject, title, body, actionName, actionUrl })
    });

    return true;
  } catch (error) {
    console.error(error);
    throw new Error("Cannot send Email, please contact the support team");
  }
};
