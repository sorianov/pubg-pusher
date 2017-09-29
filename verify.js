const {InvalidFetchType,
  InvalidRegionType,
  InvalidSeasonType,
  InvalidMatchType,
  InvalidStatsParametersType} = require('./pubg-pusher-errors');

class Verify 
{
	constructor(stats_parameters)
	{
		this.region = stats_parameters['region'];
		this.season = stats_parameters['season'];
		this.match = stats_parameters['match'];
	}

	verify_region (region=this.region) 
	{
		switch (region) 
		{
			case 'na':
			case 'as':
			case 'eu':
			case 'oc':
			case 'sa':
			case 'sea':
				return true;
			case 'all':
				this.region = REGION.ALL;
				return true;
			default:
				throw new InvalidRegionType();
				return false;

		}
	}

	verify_seasion (season=this.season) 
	{
		switch (season) 
		{
			case 'current':
			case '4':
				this.season = SEASON.EA2017pre4;
				return true;
			case 'last':
			case '3':
				this.season = SEASON.EA2017pre3;
				return true;
			case '2':
				this.season = SEASON.EA2017pre2;
				return true;
			case '1':
				this.season = SEASON.EA2017pre1;
				return true;
			default:
				throw new InvalidSeasonType(season);
				return false;
		}
	}

	verify_match (match=this.match) 
	{
		switch (match) 
		{
			case 's':
			case 'solo':
				this.match = MATCH.SOLO;
				return true;
			case 'd':
			case 'duo':
				this.match = MATCH.DUO;
				return true;
			case 'sq':
			case 'squad':
				this.match = MATCH.SQUAD;
				return true;
			case 'sf':
			case 'sfp':
			case 'solofpp':
			case 'solo-fpp':
				this.match = MATCH.SOLOFPP;
				return true;
			case 'df':
			case 'dfp':
			case 'duofpp':
			case 'duo-fpp':
				this.match = MATCH.DUOFPP;
				return true;
			case 'sqf':
			case 'sqfpp': 
			case 'squadfpp':
			case 'squad-fpp': 
				this.match = MATCH.SQUADFPP;
				return true;
			default:
				throw new InvalidMatchType(match);
				return false;


		}
	}

	verify_all_parameters(stats_parameters=this.stats_parameters)
	{
		if (typeof stats_parameters === 'object')
		{
			this.verify_region(stats_parameters['region']);
			this.verify_seasion(stats_parameters['season']);
			this.verify_match(stats_parameters['match']);
		}
		else
			throw new InvalidStatsParametersType(stats_parameters);
	}
}

module.exports = {
	Verify,
}
