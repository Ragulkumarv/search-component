import axios from "axios";
import { useState } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const fetchWordDefinition = async () => {
    try {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`
      );
      setResult(response.data[0]);
      setError(null);
    } catch (err) {
      const errorMessage = err.response?.data?.title || "Word not found";
      setError(errorMessage);
      setResult(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchWordDefinition();
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="flex justify-center items-center text-black p-4 min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <input
          type="text"
          value={query}
          onKeyDown={(e) => handleKeyPress(e)}
          onChange={(e) => handleInputChange(e)}
          placeholder="Search for a word..."
          className="border-2 rounded-lg w-full p-2 mb-4"
        />
        <button
          onClick={() => fetchWordDefinition()}
          className="bg-blue-500 text-white rounded-lg px-4 py-2"
        >
          Search
        </button>
        {error && <h2 className="text-red-500 text-lg mt-4">{error}</h2>}
        {result && (
          <section className="mt-4">
            <h2 className="text-2xl font-bold">{result.word}</h2>
            {result.meanings.map((meaning, index) => (
              <div key={index} className="mt-2">
                <h3 className="text-xl font-semibold">
                  {meaning.partOfSpeech}
                </h3>
                <ul className="list-disc list-inside">
                  {meaning.definitions.map((definition, indx) => (
                    <li key={indx}>{definition.definition}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
