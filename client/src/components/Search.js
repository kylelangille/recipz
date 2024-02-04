import { styled } from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./UI/Button";
import LoadingCircle from "./UI/LoadingCircle";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/search?q=${query}`);
      if (!response.ok) {
        throw new Error("Could not query the database");
      }

      const data = await response.json();
      setResults(data.data);
    } catch (err) {
      console.error("Error: ", err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Wrapper>
      <Controls>
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What are you looking for?"
          onKeyDown={handleKeyPress}
        />
        <Button onClick={handleSearch}>Search</Button>
      </Controls>
      {!loading ? (
        <ResultsList>
          {results.map((result) => (
            <StyledLink to={`/all-recipes/${result._id}`}>
              <li key={result._id}>{result.formData.recipeName}</li>
            </StyledLink>
          ))}
        </ResultsList>
      ) : (
        <LoadingCircle />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  margin: 7rem auto 0 300px;
  max-width: 30rem;
  flex-direction: column;
`;

const Controls = styled.div`
  display: flex;
  margin-bottom: 12px;
`;

const Input = styled.input`
  margin-right: 0.5rem;
  width: 30rem;
  font-size: 1rem;
`;

const ResultsList = styled.ul`
  list-style-type: none;

  li {
    background: var(--main);
    margin-left: -2.5rem;
    margin-top: 2px;
    padding: 10px;
    max-width: 23.8rem;
    cursor: pointer;
    border-radius: 3px;

    &:hover {
      background: var(--secondary);
    }
  }
`;

const StyledLink = styled(Link)`
  color: var(--background);
  text-decoration: none;
`;

export default Search;
