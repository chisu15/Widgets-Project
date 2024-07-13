const cron = require('node-cron');
const Session = require('../models/session.model');

cron.schedule('* * * * *', async () => { // Chạy mỗi phút
    try {
        const now = new Date();
        await Session.updateMany({ expireAt: { $lt: now }, expired: false }, { expired: true });
        console.log('Expired sessions updated');
    } catch (error) {
        console.error('Error updating expired sessions:', error);
    }
});
