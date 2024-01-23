import { styled } from "styled-components";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";
// import Button from "./UI/Button";
import {
  FaUser,
  FaCirclePlus,
  FaNewspaper,
  FaBookOpenReader,
  FaSearchengin,
  FaCircleQuestion,
  FaArrowRightToBracket,
} from "react-icons/fa6";

const Dashboard = () => {
  const { user: userFromContext } = useContext(UserContext);

  return (
    <Navigation>
      <NavList>
        <ListItem>
          <StyledNavLink
            to={`/users/${userFromContext.id}`}
            activeclassname="active"
          >
            <Icon>
              <FaUser />
            </Icon>
            My Profile
          </StyledNavLink>
        </ListItem>

        <ListItem>
          <StyledNavLink to="/add-recipe" activeclassname="active">
            <Icon>
              <FaCirclePlus />
            </Icon>
            Add New Recipe
          </StyledNavLink>
        </ListItem>
        <ListItem>
          <StyledNavLink to="/feed" activeclassname="active">
            <Icon>
              <FaNewspaper />
            </Icon>
            My Feed
          </StyledNavLink>
        </ListItem>
        <ListItem>
          <StyledNavLink
            to={`/my-recipes/${userFromContext.id}`}
            activeclassname="active"
          >
            <Icon>
              <FaBookOpenReader />
            </Icon>
            My Recipes
          </StyledNavLink>
        </ListItem>

        <ListItem>
          <StyledNavLink to="/search" activeclassname="active">
            <Icon>
              <FaSearchengin />
            </Icon>
            Search
          </StyledNavLink>
        </ListItem>

        <ListItem>
          <StyledNavLink to="/random" activeclassname="active">
            <Icon>
              <FaCircleQuestion />
            </Icon>
            Get Random Recipe
          </StyledNavLink>
        </ListItem>

        <ListItem>
          <StyledNavLink to="/log-out" activeclassname="active">
            <Icon>
              <FaArrowRightToBracket />
            </Icon>
            Log out
          </StyledNavLink>
        </ListItem>
      </NavList>
    </Navigation>
  );
};

const Navigation = styled.nav`
  display: flex;
  flex-direction: column;
  max-width: 20rem;
  margin: 0 auto 0 auto;
  border-right: 1px solid #ffffff;
`;

const NavList = styled.ul`
  list-style-type: none;
`;

const ListItem = styled.li`
  color: #ffffff;
  margin-bottom: 10px;
`;

const Icon = styled.div`
  margin-right: 1rem;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  font-weight: bold;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  margin-bottom: 20px;
  margin-right: 2rem;
  color: var(--heading);

  &:hover {
    color: lightgray;
  }

  &:visited {
    color: var(--heading);
  }

  &.active {
    background: #999;
    border-radius: 6px;
    padding: 5px;
  }
`;

export default Dashboard;
