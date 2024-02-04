import { styled } from "styled-components";

const Button = ({ children, ...props }) => {
  const customText = props.customText;
  const textShadow = props.textShadow;
  const customDisplay = props.customDisplay;
  const customAlign = props.customAlign;

  return (
    <Wrapper
      onClick={props.onClick}
      style={{
        fontSize: customText,
        textShadow: textShadow,
        display: customDisplay,
        alignItems: customAlign,
      }}
      type={props.type}
      disabled={props.disabled}
    >
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.button`
  background: var(--button);
  color: var(--main);
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
