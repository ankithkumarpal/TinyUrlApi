// Snowflake.js
const bigInt = require('big-integer');

class Snowflake {
    constructor(workerId, datacenterId, sequence = 0) {
        this.workerId = workerId;
        this.datacenterId = datacenterId;
        this.sequence = sequence;

        this.twepoch = 1609459200000; // 2021-01-01T00:00:00Z in milliseconds
        this.timestampBits = 41;
        this.workerIdBits = 10; // Increased for larger range
        this.datacenterIdBits = 10; // Increased for larger range
        this.sequenceBits = 12;

        this.maxWorkerId = bigInt(-1).xor(bigInt(-1).shiftLeft(this.workerIdBits));
        this.maxDatacenterId = bigInt(-1).xor(bigInt(-1).shiftLeft(this.datacenterIdBits));
        this.sequenceMask = bigInt(-1).xor(bigInt(-1).shiftLeft(this.sequenceBits));

        this.workerIdShift = this.sequenceBits;
        this.datacenterIdShift = this.sequenceBits + this.workerIdBits;
        this.timestampLeftShift = this.sequenceBits + this.workerIdBits + this.datacenterIdBits;

        this.lastTimestamp = -1;
    }

    _genTimestamp() {
        return Date.now();
    }

    generateId() {
        console.log("generating id......")
        const timestamp = this._genTimestamp();

        if (timestamp < this.lastTimestamp) {
            throw new Error(`Clock moved backwards. Refusing to generate id for ${this.lastTimestamp - timestamp} milliseconds`);
        }

        if (timestamp === this.lastTimestamp) {
            this.sequence = bigInt(this.sequence).and(this.sequenceMask).add(1);
            if (this.sequence.equals(0)) {
                throw new Error('Sequence overflow');
            }
        } else {
            this.sequence = bigInt(0);
        }

        this.lastTimestamp = timestamp;

        const newId = bigInt(timestamp - this.twepoch).shiftLeft(this.timestampLeftShift)
            .or(bigInt(this.datacenterId).shiftLeft(this.datacenterIdShift))
            .or(bigInt(this.workerId).shiftLeft(this.workerIdShift))
            .or(this.sequence);

        console.log("id generation completed....")
        console.log(newId.toString());
        return newId.toString();
    }
}

module.exports = Snowflake;
