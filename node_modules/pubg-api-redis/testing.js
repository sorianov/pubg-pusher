const {PubgAPI} = require('./');

const api = new PubgAPI({apikey: process.env.PUBG_APIKEY});

api.getProfileByNickname('fak3zito')
  .then((profile) => {
    const stats = profile.getFullStats();
    console.log(profile.stats);
  });
