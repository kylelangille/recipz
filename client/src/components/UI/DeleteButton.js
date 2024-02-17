import { styled } from "styled-components";

const DeleteButton = ({ children, ...props }) => {
  return <StyledButton onClick={props.onClick}>{children}</StyledButton>;
};

const StyledButton = styled.button`
  border: 1px solid var(--stroke);
  border-radius: 12px;
  background-color: var(--remove);
  font-weight: bold;
  padding: 5px 10px;
  transition: 0.3s all ease-in-out;
  cursor: pointer;

  @media (max-width: 1000px) {
    font-size: 12px;
  }

  &:hover {
    background: #ab3337;
  }
`;

export default DeleteButton;
