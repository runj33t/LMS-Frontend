import { useState, useEffect } from 'react';
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
              <NavItem>
                <NavLinks href={"/login"} onClick={closeMobileMenu}>
                  Account
                </NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks href={"/register"} onClick={closeMobileMenu}>
                  Register
                </NavLinks>
              </NavItem>
            </NavMenu>
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;