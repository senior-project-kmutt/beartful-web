import Link from 'next/link';
import { Navbar } from 'flowbite-react';
import style from "@/styles/navbar/navbarLayout.module.scss"
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

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
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default NavBar