class Formatter {
  constructor (nickname, stats_to_format) {
    this.stats_to_format = stats_to_format
    this.nickname = nickname
  }

  format_stats() {
    // Do something to make stats look nice
    let formatted_stats = this.stats_to_format;

    return formatted_stats;
  }


}
module.exports = {
  Formatter
};

