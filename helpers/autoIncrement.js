const Counter = require("../models/counter.model");

const getNextSequenceValue = async (sequenceName) => {
    try {
        const counter = await Counter.findByIdAndUpdate(
            { _id: sequenceName },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        return counter.seq;
    } catch (error) {
        throw new Error(
            `Unable to get next sequence value for ${sequenceName}: ${error.message}`
        );
    }
};

module.exports = { getNextSequenceValue };
