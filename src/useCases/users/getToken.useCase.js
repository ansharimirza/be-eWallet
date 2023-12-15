require('dotenv').config();
const jwt = require('jsonwebtoken');

const {
    result,
    dataToken
} = require('../../frameworks/common');

module.exports = dependencies => {
    const {usersRepository} = dependencies;

    if (!usersRepository) {
        throw new Error('The user repository should be exists in dependencies');
    }

    const execute = ({
        username,
    }) => {

        const payload = { 
            username: username,
        };

        const expiresIn = '7d';
        const refreshExpiresIn = '432000';

        const token = jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: expiresIn, 
        });

        const refreshToken = jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: refreshExpiresIn, 
        });

        let dateExp = null;
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
            dateExp = decoded.exp;
        });

        let refresDateExp = null;
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, function(err, decoded) {
            refresDateExp = decoded.exp;
        });

        const expiresAt = new Date(0);
        expiresAt.setUTCSeconds(refresDateExp);

        const refreshExpiresAt = new Date(0);
        refreshExpiresAt.setUTCSeconds(refresDateExp);
        
        let dataTokens = [];
        dataTokens.push(new dataToken({
            accessToken:token,
            accessTokenExpiresAt : expiresAt,
            accessTokenExpiresIn : expiresIn,
            refreshToken : refreshToken,
            refreshTokenExpiresAt : refreshExpiresAt,
            refreshTokenExpiresIn : refreshExpiresIn
        }))

        return new result({
            errorCode: '00',
            errorMessage: 'Success',
            data: dataTokens
        });

    }

    return {
        execute
    }
}