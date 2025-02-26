import * as fs from 'fs';
import * as path from 'path';
import MiniSearch from 'minisearch';
import { SearchResult } from './search-results';

// Directory containing JSON files
const directoryPath = './data/kanji';

const indexOpts = {
    fields: ['primaryMeaning', 'radicalNames'], // Fields to index
    storeFields: ['id', 'primaryMeaning', 'primaryReading', 'radicalNames', 'wkSlug'],
};

// Initialize MiniSearch
var miniSearch: MiniSearch<SearchResult>


// Load and index JSON files
function loadAndIndexFiles(dir: string) {
  miniSearch = new MiniSearch<SearchResult>(indexOpts);

  try {
    const files = fs.readdirSync(dir).filter(file => file.endsWith('.json'));

    console.log(`📂 Found ${files.length} JSON files. Indexing...`);

    let idCounter = 1;
    for (const file of files) {
      const filePath = path.join(dir, file);
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(content);

        // Index document
        miniSearch.add({
          id: idCounter,
          primaryMeaning: jsonData.primaryMeaning,
          primaryReading: jsonData.primaryReading,
          radicalNames: jsonData.radicalNames,
          wkSlug: jsonData.wkSlug
        });
        idCounter++;
      } catch (error) {
        console.error(`❌ Error processing ${file}:`, error.message);
      }
    }

    saveIndex();

    console.log(`✅ Indexing complete - ${miniSearch.documentCount} indexed documents`);
  } catch (err) {
    console.error('❌ Error reading directory:', err.message);
  }
}


// Save the index to a file
function saveIndex() {
    const json = JSON.stringify(miniSearch.toJSON());
    fs.writeFileSync('./data/index.json', json, 'utf8');
    console.log('💾 Index saved.');
  }
  
// Load index from file if it exists
function loadIndex() {
  if (fs.existsSync('./data/index.json')) {
    console.log('🔄 Loading saved index...');
    const json = fs.readFileSync('./data/index.json', 'utf8');
    miniSearch = MiniSearch.loadJSON(json, indexOpts);
    console.log('✅ Index loaded.');
  } else {
    console.log('⚠️ No saved index found. Rebuilding index...');
    loadAndIndexFiles(directoryPath);
  }
}

// Search function
function search(query: string) {
  const results = miniSearch.search(query, { combineWith: 'AND' });
  console.log(`🔍 Search results for "${query}":`, results);
}

// Run indexing and perform a sample search
loadIndex();
search('fire few'); // Change this query to test
