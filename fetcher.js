const {PubgAPI, PubgAPIErrors, REGION, SEASON, MATCH} = require('pubg-api-redis');
import {InvalidFetchType} from './pubg-pusher-errors'

const api = new PubgAPI({
  apikey: process.env.PUBGTRACKER_API_KEY,
  redisConfig: false
  // redisConfig: {
  //   host: 'localhost',
  //   port: 6379,
  //   expiration: 300, // Optional - defaults to 300.
  // },
});

fetcher(name, [specific_fields]) {
  results = fetch_decision(name)
  final_results = parse_result([specific_fields])
}

parse_result([specific_fields]) {

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
  api.getProfileByNickname(name)
    .then((profile) => {
      const stats = profile.getStats({
        region: REGION.NA,
        season: SEASON.EA2017pre4,
        match: MATCH.SQUADFPP
      })
    .then( stats => {
      if (stats.ok)
        return stats;
      else
        throw new StatsNotFound();
    });
  });
}

fetch_multi(name) {
  let fetch_results = []

  name.foreach(function(nickname) => {
    fetch_results.push(fetch_single(nickname);)
  })

}

// api.getProfileByNickname('just____')
//   .then((profile) => {
//     const data = profile.content;
//     const stats = profile.getStats({
//       region: REGION.NA, // defaults to profile.content.selectedRegion
//       season: SEASON.EA2017pre4, // defaults to profile.content.defaultSeason
//       match: MATCH.SQUADFPP // defaults to SOLO
//     });
//     console.log(stats);
//   });
