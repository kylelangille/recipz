import { styled } from "styled-components";

const TagDisplay = ({ tags }) => {
  const getTagBackgroundColor = (tag) => {
    switch (tag.toLowerCase()) {
      case "breakfast":
        return "#ee964b";
      case "lunch":
        return "#C2A878";
      case "dinner":
        return "#F34213";
      case "dessert":
        return "#632B30";
      case "chicken":
        return "#CC5803";
      case "beef":
        return "#5B2E48";
      case "seafood":
        return "#1f363d";
      case "pork":
        return "#585563";
      case "lamb":
        return "#5BC0EB";
      case "goat":
        return "#8D6A9F";
      case "pasta":
        return "#EF798A";
      case "vegan":
        return "#9ebd6e";
      case "vegetarian":
        return "#3e5622";
      case "date-night":
        return "#E574BC";
      default:
        return "lightgray";
    }
  };

  return (
    <Wrapper>
      {tags.map((tag) => (
        <Tag key={tag} backgroundcolor={getTagBackgroundColor(tag)}>
          {tag}
        </Tag>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 5px;
  gap: 5px;
  display: flex;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  padding: 5px 10px;
  background: ${(props) => props.backgroundcolor || "lightgray"};
  border-radius: 9px;
  font-weight: bold;
  text-shadow: 1px 1px 1px var(--stroke);

  @media (max-width: 1000px) {
    font-size: 12px;
    padding: 2px 5px;
  }
`;

export default TagDisplay;
