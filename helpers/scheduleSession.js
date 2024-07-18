const schedule = require('node-schedule');
const Session = require('../models/session.model');

const scheduleSessionExpiry = (sessionId, expiresAt) => {
    const job = schedule.scheduleJob(expiresAt, async () => {
        try {
            await Session.findByIdAndUpdate(sessionId, {
                expired: true
            });
            console.log(`Session ${sessionId} expired`);
        } catch (error) {
            console.error(`Error expiring session ${sessionId}:`, error);
        }
    });

    console.log(`Scheduled expiration for session ${sessionId} at ${expiresAt}`);
    return job;
};

module.exports = {
    scheduleSessionExpiry
};