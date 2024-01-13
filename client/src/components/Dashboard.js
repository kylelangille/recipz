import { styled } from "styled-components";
import { Link } from "react-router-dom";
import Button from "./UI/Button";

const Dashboard = () => {
  return (
    <div>
      <ButtonControl>
        <Button>
          <NavLink to="/add-recipe">Add New Recipe</NavLink>
        </Button>
        <Button>
          <NavLink to="/feed">My Feed</NavLink>
        </Button>
        <Button>
          <NavLink to="/random">Get Random Recipe</NavLink>
        </Button>
      </ButtonControl>
    </div>
  );
};

const ButtonControl = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NavLink = styled(Link)`
  color: var(--stroke);
  text-decoration: none;
  font-weight: bold;
`;

export default Dashboard;
