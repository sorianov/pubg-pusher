const {PubgAPI, PubgAPIErrors, REGION, SEASON, MATCH} = require('pubg-api-redis');
const {InvalidFetchType} = require('./pubg-pusher-errors');
const {FetchParameters} = require('./fetchparameters');

const API = new PubgAPI({
  apikey: process.env.PUBGTRACKER_API_KEY,
  redisConfig: false
  // redisConfig: {
  //   host: 'localhost',
  //   port: 6379,
  //   expiration: 300, // Optional - defaults to 300.
  // },
});

class Fetch {
  constructor(nickname,region='na',season='current',match='squadfpp'){
    this.nickname = nickname;
    this.fetch_parameters = new FetchParameters(
      region,
      season,
      match 
      );

  }

  fetch (){
    API.getProfileByNickname(this.nickname).then(
     profile => {
      profile.getStats(this.fetch_parameters).then(
        stats => {
          console.log(stats);
        })

     } )

  }
  
  fetcher(name, specific_stats) {
    results = fetch_decision(name)
    final_results = parse_result(specific_stats)
  }  

  parse_result(specific_stats) {
    //TODO: ADD FUNCTIONALITY
    return specific_stats;
  }
  

  fetch_decision(name) {
    result = () => {
    if (typeof name === 'string')
      fetch_single(name);
    else if (Array.isArray(name))
      fetch_multi(name);
    else
      throw new InvalidFetchType(name)
    };
    return result
  }
  

  fetch_single(name) {
    API.getProfileByNickname(name).then(
      profile => {
        const stats = profile.getStats({
          region: REGION.NA,
          season: SEASON.EA2017pre4,
          match: MATCH.SQUADFPP
        })}).then( 
        stats => {
          if (stats.ok)
            return stats;
          else
            throw new StatsNotFound();
      });
  }
  

  fetch_multi(name) {
    let fetch_results = [];

    name.foreach( nickname => {
      fetch_results.push(fetch_single(nickname));
    });
  }

};

module.exports = {
  Fetch
};