import algoliasearch from "algoliasearch"
import aa from "search-insights"

export const searchClient = algoliasearch("NF05OPFGOI", "6c67068b71b6533274ae1a44496e2e44")
export const initSearchInsight = () =>
  aa("init", {
    appId: "NF05OPFGOI",
    // apiKey: "355573a0e08e7cedf8525aa3d4466162",
    apiKey: "6c67068b71b6533274ae1a44496e2e44",
  })
