import { useState, useEffect, useContext } from 'react';
import { Context } from "../../context";
import {
  Nav,
  NavbarContainer,
  NavLogo,
  NavIcon,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks,
} from "./Navbar.elements";

import { IconContext } from "react-icons";

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Navbar = () => {
  const { state, dispatch } = useContext(Context);
  // destructuring the user from the global state
  const { user } = state;
  // console.log(user);

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();

    // below code is put inside useEffect just to make it work in nextjs project else
    // we can have only window.addEventListener('resize', showButton);
    // outside of useEffect in ReactJs projects and that would work fine

    window.addEventListener('resize', showButton);
    return () => window.removeEventListener('resize', showButton);
  }, []);

  // for nextjs window is undefined so to make it work add it inside useEffect
  // // window.addEventListener('resize', showButton);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav>
          <NavbarContainer>
            <NavLogo href={"/"} onClick={closeMobileMenu}>
              MyDemy
            </NavLogo>
            <MobileIcon onClick={handleClick}>
              {click ? <CloseIcon /> : <MenuIcon />}
            </MobileIcon>
            <NavMenu onClick={handleClick} click={click}>
              <NavItem>
                <NavLinks href={"/"} onClick={closeMobileMenu}>
                  Home
                </NavLinks>
              </NavItem>
              {
                // below is an example of how to render conditionally
                // if user if logged in i.e. user in global state is null then show register and log in links 
              }
              {
                user === null && (
                  <>
                    <NavItem>
                      <NavLinks href={"/login"} onClick={closeMobileMenu}>
                        LogIn
                      </NavLinks>
                    </NavItem>
                    <NavItem>
                      <NavLinks href={"/register"} onClick={closeMobileMenu}>
                        Register
                      </NavLinks>
                    </NavItem>
                  </>
                )
              }

              {
                // if user is not null in global state that means someone is logged in then show MyAccount link 
              }
              {
                user !== null && (
                  <>
                    <NavItem>
                      <NavLinks href={"/userprofile"} onClick={closeMobileMenu}>
                        MyAccount
                      </NavLinks>
                    </NavItem>
                  </>
                )
              }
            </NavMenu>
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;