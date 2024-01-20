import { styled } from "styled-components";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Button from "./UI/Button";

const Dashboard = () => {
  const { user: userFromContext } = useContext(UserContext);

  return (
    <div>
      <ButtonControl>
        <Button>
          <StyledNavLink
            to={`/users/${userFromContext.id}`}
            activeclassname="active"
          >
            My Profile
          </StyledNavLink>
        </Button>

        <Button>
          <StyledNavLink to="/add-recipe" activeclassname="active">
            Add New Recipe
          </StyledNavLink>
        </Button>

        <Button>
          <StyledNavLink to="/feed" activeclassname="active">
            My Feed
          </StyledNavLink>
        </Button>

        <Button>
          <StyledNavLink
            to={`/my-recipes/${userFromContext.id}`}
            activeclassname="active"
          >
            My Recipes
          </StyledNavLink>
        </Button>

        <Button>
          <StyledNavLink to="/search" activeclassname="active">
            Search
          </StyledNavLink>
        </Button>

        <Button>
          <StyledNavLink to="/random" activeclassname="active">
            Get Random Recipe
          </StyledNavLink>
        </Button>
      </ButtonControl>
    </div>
  );
};

const ButtonControl = styled.div`
  display: flex;
  justify-content: space-between;
  width: 40rem;
`;

const StyledNavLink = styled(NavLink)`
  color: var(--stroke);
  text-decoration: none;
  font-weight: bold;

  &.active {
    color: var(--heading);
    text-decoration: underline;
    text-underline-offset: 4px;
  }
`;

export default Dashboard;
