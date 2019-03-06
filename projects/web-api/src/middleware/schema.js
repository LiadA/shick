const { superstruct } = require('superstruct');
const { enums } = require('db');

const struct = superstruct({
  // types: {
  //   headLine: v => typeof v === 'string' && v.length >= 8 && v.length <= 20,
  // },
});

const gossipSchema = struct({
  headLine: 'string',
  description: 'string',
});

const seriesSchema = struct({
  name: 'string',
  source: struct.enum(enums.sourceOptions),
  type: 'array',
  rank: struct.enum(enums.rankOptions),
});

module.exports = {
  gossipSchema,
  seriesSchema,
};
