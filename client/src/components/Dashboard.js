import { useAuth0 } from "@auth0/auth0-react";
import { styled } from "styled-components";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import {
  FaUser,
  FaCirclePlus,
  FaNewspaper,
  FaBookOpenReader,
  FaSearchengin,
  FaCircleQuestion,
  FaArrowRightToBracket,
} from "react-icons/fa6";
import cookingEmoji from "../assets/emoji.png";

const Dashboard = () => {
  const { logout } = useAuth0();
  const { user: userFromContext } = useContext(UserContext);

  return (
    <Navigation>
      <Img src={cookingEmoji} />
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
          <StyledNavLink
            to={`/feed/${userFromContext.id}`}
            activeclassname="active"
          >
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
          <LogOutButton onClick={() => logout()} className="logout">
            <Icon>
              <FaArrowRightToBracket />
            </Icon>
            Log out
          </LogOutButton>
        </ListItem>
      </NavList>
    </Navigation>
  );
};

const Navigation = styled.nav`
  border-right: 1px solid #ffffff;
  width: 300px;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  overflow-y: auto;
  padding-top: 30px;
  z-index: 10;
`;

const Img = styled.img`
  max-width: 5rem;
  max-height: 5rem;
  margin: 0 auto;
`;

const NavList = styled.ul`
  list-style-type: none;
  margin-top: 2rem;
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
  margin-bottom: 10px;
  margin-right: 2rem;
  color: var(--main);
  padding: 5px;

  &:hover {
    color: lightgray;
  }

  &.active {
    background: #999;
    border-radius: 6px;
    color: var(--background);
  }
`;

const LogOutButton = styled.button`
  display: flex;
  align-items: center;
  color: var(--main);
  background: var(--background);
  border: none;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    color: var(--remove);
  }
`;

export default Dashboard;
