import algoliasearch from "algoliasearch"
import aa from "search-insights"

export const searchClient = algoliasearch("NF05OPFGOI", "355573a0e08e7cedf8525aa3d4466162")
export const initSearchInsight = () =>
  aa("init", {
    appId: "NF05OPFGOI",
    apiKey: "355573a0e08e7cedf8525aa3d4466162",
  })
