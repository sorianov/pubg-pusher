const {REGION, SEASON, MATCH} = require('pubg-api-redis');
const {InvalidRegionType, InvalidSeasonType, InvalidMatchType, InvalidStatsParametersType} = require('./pubg-pusher-errors');
const {Verify} = require('./verify');

class FetchParameters 
{
	constructor(region, season, match)
	{
		this.verify = new Verify();
		this.region = region;
		this.season = season;
		this.match = match;
		this.all_parameters = {
			region: this.region,
			season: this.season,
			match: this.match,
		};
		this.verify.verify_all_parameters(this.all_parameters);
	}

	get region() 
	{
		return this.region;
	} 

	get season() 
	{
		return this.region;
	}

	get match()
	{
		return this.match;
	}

	set region(new_region)
	{
		if (this.verify.verify_region(new_region))
			this.region = new_region;
	}
	
	set season(new_season)
	{
		if (this.verify.verify_season(new_season))
			this.season = new_season;

	}

	set match(new_match)
	{
		if (this.verify.verify_match(new_match))
			this.match = new_match
	}

}

module.exports = {
	FetchParameters,
};