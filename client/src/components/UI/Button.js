import { styled } from "styled-components";

const Button = ({ children, ...props }) => {
  const customText = props.customText;
  const textShadow = props.textShadow;
  return (
    <Wrapper
      onClick={props.onClick}
      style={{ fontSize: customText, textShadow: textShadow }}
    >
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.button`
  background: var(--button);
  color: var(--button-text);
  transition: 0.3s all ease-in-out;
  padding: 10px 20px;
  border: 1px solid #555;
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    background: var(--button-hover);
  }
`;

export default Button;
