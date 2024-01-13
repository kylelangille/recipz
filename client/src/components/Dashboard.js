import { styled } from "styled-components";
import { Link, useLocation } from "react-router-dom";
import Button from "./UI/Button";

const Dashboard = () => {
  const currentLocation = useLocation();
  return (
    <div>
      <ButtonControl>
        <Button>
          <NavLink
            to="/add-recipe"
            active={currentLocation.pathname === "/add-recipe"}
          >
            Add New Recipe
          </NavLink>
        </Button>

        <Button>
          <NavLink to="/feed" active={currentLocation.pathname === "/feed"}>
            My Feed
          </NavLink>
        </Button>

        <Button>
          <NavLink
            to="/my-recipes"
            active={currentLocation.pathname === "/my-recipes"}
          >
            My Recipes
          </NavLink>
        </Button>

        <Button>
          <NavLink to="/random" active={currentLocation.pathname === "/random"}>
            Get Random Recipe
          </NavLink>
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
  color: ${(props) => (props.active ? "var(--heading)" : "var(--stroke)")};
  text-decoration: ${(props) => (props.active ? "underline" : "none")};
  font-weight: bold;
`;

export default Dashboard;
