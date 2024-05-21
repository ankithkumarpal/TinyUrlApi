
class IdGenerator {
    constructor(snowflake) {
        this.snowflake = snowflake;
    }

    getNextId() {
        return this.snowflake.generateId();
    }
}

module.exports = IdGenerator;
