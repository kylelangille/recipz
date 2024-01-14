import { styled, keyframes } from "styled-components";

const LoadingCircle = () => {
  const radius = (100 - 10) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (50 / 100) * circumference;

  return (
    <Svg width={100} height={100}>
      <Circle
        stroke="var(--highlight)"
        strokeWidth={10}
        fill="transparent"
        r={radius}
        cx={100 / 2}
        cy={100 / 2}
        style={{
          strokeDasharray: circumference,
          strokeDashoffset: offset,
        }}
      />
    </Svg>
  );
};

const rotate = keyframes` 
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  `;

const Svg = styled.svg`
  display: block;
  margin: 20px auto;
  animation: ${rotate} 2s linear infinite;
`;

const Circle = styled.circle`
  transition: stroke-dashoffset 0.3s;
`;

export default LoadingCircle;
