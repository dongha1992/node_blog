const DEFAULT_QUERY_OPTIONS = {
  deleted_at: null,
  status: "PUBLISHED",
};

const queryOptionFunction = (key, value) => {
  const mapper = {
    user_id: { [key]: Number(value) },
    comments: { [key]: { some: { body: { contains: value } } } },
  };

  const matched = mapper[key];
  if (matched) return matched;

  return { [key]: { contains: value } };
};

const queryOptionFormatter = (fields, cb) => Object.entries(fields).map(cb);

const queryOptionSet = (fields, filterOption) => {
  if (!fields) return DEFAULT_QUERY_OPTIONS;

  const defaultQueryOption = queryOptionFormatter(
    DEFAULT_QUERY_OPTIONS,
    ([key, value]) => ({
      [key]: value,
    })
  );

  const queryOption = queryOptionFormatter(fields, ([key, value]) =>
    queryOptionFunction(key, value)
  );

  const where = { [filterOption]: [...queryOption, ...defaultQueryOption] };
  return where;
};

module.exports = queryOptionSet;
