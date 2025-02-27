import React, { useState } from "react";

import { search } from './search';

const App: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);

    // Perform search when user types
    if (value.trim().length > 0) {
      setResults(search(value));
    } else {
      setResults([]);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h3>Search by radical name</h3>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleSearch}
        style={{ width: "300px", padding: "8px", fontSize: "16px" }}
      />
      <div className="grid grid-cols-4 sm:grid-cols-8 grap-4 p-4">
        {results.map((result) => (
          <div
            key={result.id}
            className="bg-gray-200 p-4 aspect-square flex flex-col justify-center items-center rounded-lg shadow-md"
          >
            <a href={`https://www.wanikani.com/kanji/${result.wkSlug}`} target="_blank">
              <div className="sm:text-2x1 lg:text-7x1 md:text-7xl">{result.wkSlug}</div>
              <p>{result.primaryMeaning}</p>
              <p>{result.primaryReading}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
