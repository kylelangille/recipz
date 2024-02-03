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
      case "vegan":
        return "#9ebd6e";
      case "vegetarian":
        return "#3e5622";
      case "gluten-free":
        return "#3943b7";
      case "peanut-free":
        return "#E6AF2E";
      case "shellfish-free":
        return "#0B7189";
      case "one-pot":
        return "#6b7780";
      case "air-fryer":
        return "#AAADC4";
      case "keto":
        return "#DCDBA8";
      case "high-protein":
        return "#75DBCD";
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
`;

const Tag = styled.span`
  padding: 5px 10px;
  background: ${(props) => props.backgroundcolor || "lightgray"};
  border-radius: 9px;
  font-weight: bold;
  text-shadow: 1px 1px 1px var(--stroke);
`;

export default TagDisplay;
