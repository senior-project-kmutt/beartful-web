import Link from 'next/link';
import { Navbar } from 'flowbite-react';
import style from "@/styles/navbar/navbarLayout.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faMessage, faBell, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  return (
    <>
      <Navbar className="ml-8 mr-8 h-8 sm:h-12" fluid rounded>
        <Navbar.Brand as={Link} href="/">
          <img src="../../picture/logo.png" className="h-8 sm:h-12" alt="Beartful Logo" />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link className={style.text_menu} href="/login">SIGN IN</Navbar.Link>
          <Navbar.Link className={style.text_menu} href="/register">SIGN UP</Navbar.Link>
          <div className={style.menu}>
            <Navbar.Link href="/register">
              <FontAwesomeIcon icon={faCartShopping} className={`${style.icon}`}></FontAwesomeIcon>
              <span className={`${style.count} absolute-4 top-0 right-52`}>15</span>
            </Navbar.Link>
            <Navbar.Link href="/register">
              <FontAwesomeIcon icon={faMessage} className={style.icon}></FontAwesomeIcon>
              <span className={`${style.count} absolute top-0 right-36`}>1</span>
            </Navbar.Link>
            <Navbar.Link href="/register">
              <FontAwesomeIcon icon={faBell} className={`${style.icon}`}></FontAwesomeIcon>
              <span className={`${style.count} absolute top-0 right-20`}>21</span>
            </Navbar.Link>
            <Navbar.Link className="ml-8" >
              <img src="../../picture/user1.gif" />
            </Navbar.Link>
            <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default NavBar