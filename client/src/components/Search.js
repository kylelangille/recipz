import { styled } from "styled-components";
import Button from "./UI/Button";

const Search = () => {
  return (
    <Wrapper>
      <Input type="text" placeholder="What are you looking for?" />
      <Button>Search</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  margin: 7rem auto 0 auto;
  max-width: 30rem;
`;

const Input = styled.input`
  margin-right: 0.5rem;
  width: 30rem;
  font-size: 1rem;
`;

export default Search;
