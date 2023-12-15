module.exports.Response = class Response {
    constructor({
        statusCode = null,
        statusMessage = null,
        statusDescription = null,
        result = [],
    }){
        this.statusCode = statusCode;
        this.statusMessage = statusMessage;
        this.statusDescription = statusDescription;
        this.result = result;
    }
}

module.exports.ResponseError = class ResponseError {
    constructor({
        statusCode = null,
        statusMessage = null,
        statusDescription = null,
    }){
        this.statusCode = statusCode;
        this.statusMessage = statusMessage;
        this.statusDescription = statusDescription;
    }
}

module.exports.result = class result {
    constructor({
        errorCode,
        errorMessage,
        data
    }){
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
        this.data = data;
    }
}

module.exports.dataToken = class dataToken {
    constructor({
        accessToken,
        accessTokenExpiresAt,
        accessTokenExpiresIn,
        refreshToken,
        refreshTokenExpiresAt,
        refreshTokenExpiresIn,
    }){
        this.accessToken = accessToken;
        this.accessTokenExpiresAt = accessTokenExpiresAt;
        this.accessTokenExpiresIn = accessTokenExpiresIn;
        this.refreshToken = refreshToken;
        this.refreshTokenExpiresAt = refreshTokenExpiresAt;
        this.refreshTokenExpiresIn = refreshTokenExpiresIn;
    }
}

module.exports.dataBalance = class dataBalance {
    constructor({
        balance,
    }){
        this.balance = balance;
    }
}
