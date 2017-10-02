const {PubgAPI, PubgAPIErrors, REGION, SEASON, MATCH} = require('pubg-api-redis');
const {InvalidFetchType} = require('./pubg-pusher-errors');

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
  }

  fetch (){
    console.log("fetch()")
    let stats = {};
    API.getProfileByNickname(this.nickname).then((o) => {
      try {
        stats = o.getMatchHistory();
      } catch (e) {
        console.log(e);
        return e;
        // TODO: Add Discord reply for stats not found
      }

      let parsed_stats = this.parse_result(stats);
    }, (r) => {
      console.log("Something went wrong...\n", r);
    })
  }
  
  fetcher(name, specific_stats) {
    results = fetch_decision(name)
    final_results = parse_result(specific_stats)
  }  
  parse_result(stats, requested_stats=[]) {
    if (stats.hasOwnProperty('MatchHistory')) {
      let last_match_history = stats.MatchHistory[0];
      console.log(last_match_history['Updated']);

      let interesting_stats = { Updated: last_match_history['Updated'],
                                MatchDisplay: last_match_history['MatchDisplay'],
                                Kills: last_match_history['Kills'],
                                Assists: last_match_history['Assists'],
                                Headshots: last_match_history['Headshots'],
                                Damage: last_match_history['Damage'] }

      console.log(interesting_stats);

    }

    // return parsed_stats;
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