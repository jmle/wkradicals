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
      <h1>MiniSearch Example</h1>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleSearch}
        style={{ width: "300px", padding: "8px", fontSize: "16px" }}
      />
      <ul>
        {results.map((result) => (
          <li key={result.id}>
            <strong>{result.wkSlug}</strong>
            <p>{result.primaryMeaning}</p>
            <p>{result.primaryReading}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
