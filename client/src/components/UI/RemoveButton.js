import { styled } from "styled-components";

const RemoveButton = ({ onClick, children, ...props }) => {
  return <Button onClick={onClick}>{children}</Button>;
};

const Button = styled.button`
  background: var(--remove);
  color: var(--stroke);
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s all ease-in-out;
  border: 1px solid var(--stroke);
  margin-top: 3rem;

  &:hover {
    background: #ab3337;
    color: var(--heading);
  }
`;

export default RemoveButton;
