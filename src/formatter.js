class Formatter {
  constructor (nickname, stats_to_format) {
    this.stats_to_format = stats_to_format
    this.nickname = nickname
  }

  format_stats () {
    let formatted_stats = `For ${this.nickname},`

    formatted_stats += (this.createStatString(this.stats_to_format))

    return formatted_stats
  }

  createStatString (object) {
    let stat_string = ''
    if (object.hasOwnProperty('hs')) {
      stat_string += (` Headshots: ${object.hs},`)
    }
    if (object.hasOwnProperty('damage')) {
      stat_string += (` Damage: ${object.damage},`)
    }

    stat_string = stat_string.slice(0, -1)

    return stat_string
  }
}
module.exports = {
  Formatter
}
