const API = new PubgAPI({
  apikey: process.env.PUBGTRACKER_API_KEY,
  redisConfig: false
  // redisConfig: {
  //   host: 'localhost',
  //   port: 6379,
  //   expiration: 300, // Optional - defaults to 300.
  // },
});
const {PubgAPI, PubgAPIErrors, REGION, SEASON, MATCH} = require('pubg-api-redis')
const {InvalidFetchType} = require('./custom_errors')

// class PubgAPIMock {
//   getProfileByNickname(nickname) {
//     let json_raw = require ('./json_structure_notes.json');
//     let json_stats = new Promise((resolve, reject) => {
//       console.log(typeof json_raw);
//       resolve("Success");
//     })
//   }
// }

// const API = new PubgAPIMock();


class Fetcher {
  constructor (nickname, requested_stats = []) {
    this.nickname = nickname
    this.requested_stats = requested_stats
    this.fetch()
  }

  fetch () {
    let stats = {}

    // let json_file = require ('./json_structure_notes.json')
    // let parsed_stats = this.parse_result(json_file);
    try {
      API.getProfileByNickname(this.nickname).then((full_stats) => {
        try {
          stats = full_stats.getMatchHistory();
        } catch (e) {
        console.log(e)
        return e
          // TODO: Add Discord reply for stats not found
    } catch(e) {
      console.log("PUBG BOT: Error fetching stats because PUBGTRACKER.COM is updating or API is down.", e);
      return e;
    }
      }
    })

    let parsed_stats = this.parse_result(stats)

    return parsed_stats
  }


  parse_result (stats) {
    let last_match_history
    let default_stats = {}
    let desired_stats = {}
    if (stats.hasOwnProperty('matchHistory')) {
      last_match_history = stats.MatchHistory[0]
    } else {
      throw new MalformedStats('Stats do not include MatchHistory')
    }

    if (this.requested_stats.length > 0) {
      for (let i = 0; i < this.requested_stats.length; i++) {
        if (this.requested_stats[i] === 'lm') {
          desired_stats.push({ Updated: last_match_history['Updated'],
            MatchDisplay: last_match_history['MatchDisplay'],
            Kills: last_match_history['Kills'],
            Assists: last_match_history['Assists'],
            Headshots: last_match_history['Headshots'],
            Damage: last_match_history['Damage'] })
        }
      };
      return desired_stats
    } else {
      return parse_default_stats(last_match_history)
    }
  }

  parse_default_stats (last_match_history) {
    let default_stats = { Updated: last_match_history['Updated'],
      MatchDisplay: last_match_history['MatchDisplay'],
      Kills: last_match_history['Kills'],
      Assists: last_match_history['Assists'],
      Headshots: last_match_history['Headshots'],
      Damage: last_match_history['Damage'] }
    return default_stats
  }

  fetch_decision (name) {
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

  fetch_single (name) {
    API.getProfileByNickname(name).then(
      profile => {
        const stats = profile.getStats({
          region: REGION.NA,
          season: SEASON.EA2017pre4,
          match: MATCH.SQUADFPP
        })
      }).then(
        stats => {
          if (stats.ok) { return stats } else { throw new StatsNotFound() }
        })
  }

  fetch_multi (name) {
    let fetch_results = []

    name.foreach(nickname => {
      fetch_results.push(fetch_single(nickname))
    })
  }
};

module.exports = {
  Fetcher
}
