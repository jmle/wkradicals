import MiniSearch from 'minisearch';
import indexData from '../data/index.json';


const indexOpts = {
    fields: ['primaryMeaning', 'radicalNames'], // Fields to index
    storeFields: ['id', 'primaryMeaning', 'primaryReading', 'radicalNames', 'wkSlug'],
};

// Initialize MiniSearch
const miniSearch = MiniSearch.loadJSON(JSON.stringify(indexData), indexOpts);

// Search function
export function search(query: string) {
  const results = miniSearch.search(query, { combineWith: 'AND' });
  console.log(`🔍 Search results for "${query}":`, results);
  return results;
}
