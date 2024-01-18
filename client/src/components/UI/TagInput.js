import { styled } from "styled-components";

const TagInput = ({ label, id, onChange, htmlFor, checked }) => {
  return (
    <div>
      <Input id={id} onChange={onChange} type="checkbox" checked={checked} />
      <label htmlFor={htmlFor}>{label} </label>
    </div>
  );
};

const Input = styled.input`
  margin-right: 10px;
`;

export default TagInput;
