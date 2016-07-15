var config = {};

config.mongoURI = {
    development: 'mongodb://localhost/node-testing',
    test: 'mongodb://localhost/node-test'
};

config.facebookAuth = {
    'clientID': '1749818951928316',
    'clientSecret': '67520dbfe8487e12419f17d88c47b76e',
    'callbackURL': 'http://localhost:3000/auth/facebook/callback'
}
config.linkedinAuth = {
    'clientAPIKey': '77a1t5ys0dfnji',
    'callbackURL': "http://127.0.0.1:3000/auth/linkedin/callback"
}

module.exports = config;