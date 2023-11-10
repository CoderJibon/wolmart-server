const createSlug = (slug) => {
  const cSlug = slug
    .toLowerCase() // Convert the title to lowercase
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with dashes
    .replace(/^-+|-+$/g, "") // Remove leading and trailing dashes
    .trim(); // Trim any extra spaces (just in case)

  return cSlug;
};

module.exports = createSlug;
