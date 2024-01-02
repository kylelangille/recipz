import { styled } from "styled-components";

const Input = ({ label, id, ...props }) => {
  return (
    <Wrapper>
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} {...props} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 0.5rem 0;
  display: flex;
  flex-direction: column;

  label {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  input {
    width: 100%;
    max-width: 20rem;
    font: inherit;
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid var(--stroke);
  }
`;

export default Input;
