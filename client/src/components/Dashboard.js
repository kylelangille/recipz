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
            <span>My Profile</span>
          </StyledNavLink>
        </ListItem>

        <ListItem>
          <StyledNavLink to="/add-recipe" activeclassname="active">
            <Icon>
              <FaCirclePlus />
            </Icon>
            <span>Add New Recipe</span>
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
            <span>My Feed</span>
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
            <span>My Recipes</span>
          </StyledNavLink>
        </ListItem>

        <ListItem>
          <StyledNavLink to="/search" activeclassname="active">
            <Icon>
              <FaSearchengin />
            </Icon>
            <span>Search</span>
          </StyledNavLink>
        </ListItem>

        <ListItem>
          <StyledNavLink to="/random" activeclassname="active">
            <Icon>
              <FaCircleQuestion />
            </Icon>
            <span>Get Random Recipe</span>
          </StyledNavLink>
        </ListItem>

        <ListItem>
          <LogOutButton onClick={() => logout()} className="logout">
            <Icon>
              <FaArrowRightToBracket />
            </Icon>
            <span>Log out</span>
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

  @media (max-width: 1000px) {
    width: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
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

  @media (max-width: 1000px) {
    span {
      display: none;
    }
  }
`;

const Icon = styled.div`
  margin-right: 1rem;

  @media (max-width: 1000px) {
    margin-bottom: 10px;
  }
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

    @media (max-width: 1000px) {
      background: var(--background);
      color: var(--main);
    }
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
