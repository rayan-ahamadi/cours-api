// helpers/omdbMapper.ts
function normalizeOmdbData(data) {
  const normalized = {};

  Object.keys(data).forEach((key) => {
    const camelKey = key.charAt(0).toLowerCase() + key.slice(1);
    normalized[camelKey] = data[key];
  });

  delete normalized.Response;
  delete normalized.Error;
  delete normalized.ratings;
  delete normalized.totalSeasons;

  return normalized;
}

module.exports = {
  normalizeOmdbData,
};
