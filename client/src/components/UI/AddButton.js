import { styled } from "styled-components";

const AddButton = ({ onClick, children, ...props }) => {
  return (
    <Wrapper onClick={onClick}>
      <Button>+</Button>
      <span>{children}</span>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  cursor: pointer;
  width: 12rem;
  border-radius: 12px;
  transition: 0.3s all ease-in-out;

  &:hover {
    background: #999;
    color: var(--heading);
  }
`;

const Button = styled.button`
  background: var(--button);
  color: var(--heading);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  border: 1px solid #555;
  cursor: pointer;

  margin-right: 1rem;
`;

export default AddButton;
