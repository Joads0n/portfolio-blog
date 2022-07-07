const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const BearerStrategy = require('passport-http-bearer');

const models = require('./models/');

async function verifyUser(email) {
    const user = await models.User.buscarEmail(email);
    if (user === null) {
        throw new Error("Email não localizado na base de dados");
    }
    return user;
}

async function verifyPassword(password, passwordHash) {
    const validPassword = await bcrypt.compare(password, passwordHash);

    if (!validPassword) {
        throw new Error('E-mail ou senha inválidos');
    }
}

passport.use(
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: false
    }, async (email, password, done) => {
        try {
            const user = await verifyUser(email);
            await verifyPassword(password, user.password);
            
            done(null, user);
        } catch (error) {
            done(error);
        }
    })
)

passport.use(
    new BearerStrategy(async (token, done) => {
        try {
            const payload = jwt.verify(token, process.env.KEY_JWT);
            const user = await models.User.getUserById(payload.id);
            
            done(null, user);
        } catch (error) {
            done(error);
        }
    })
)