import { styled } from "styled-components";

const TagDisplay = ({ tags }) => {
  const getTagBackgroundColor = (tag) => {
    switch (tag.toLowerCase()) {
      case "vegan":
        return "#9ebd6e";
      case "vegetarian":
        return "#3e5622";
      case "gluten-free":
        return "#3943b7";
      case "breakfast":
        return "#ee964b";
      case "dessert":
        return "#dd5e98";
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
`;

export default TagDisplay;
