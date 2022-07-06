const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');

const models = require('./models/');

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
            const user = await models.User.buscarEmail(email);
            await verifyPassword(password, user.password);
            
            done(null, user);
        } catch (error) {
            done(error);
        }
    })
)
