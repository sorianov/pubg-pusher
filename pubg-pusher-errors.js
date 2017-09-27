class InvalidFetchType extends Error 
{
	constructor(msg) 
	{
	  super(msg || 'A string or array of strings must be passed');
	  this.name = this.constructor.name;
	}
}

class InvalidRegionType extends Error 
{
	constructor(msg) 
	{
	  super(msg || 'Region does not exist');
	  this.name = this.constructor.name;
	}
}

class InvalidSeasonType extends Error 
{
	constructor(msg) 
  	{
    	super(msg || 'Season value does not exist');
    	this.name = this.constructor.name;
	}
}

class InvalidMatchType extends Error
{
	constructor(msg)
	{
		super(msg || 'Match type does not exist');
		this.name = this.constructor.name;
	}
}

class InvalidStatsParametersType extends Error 
{
	constructor(msg) 
	{
		super(msg || 'Not and object');
		this.name = this.constructor.name;
	}
}

module.exports = {
  InvalidFetchType,
  InvalidRegionType,
  InvalidSeasonType,
  InvalidMatchType,
  InvalidStatsParametersType,
};
