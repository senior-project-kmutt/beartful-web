import Link from 'next/link';
import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import style from "@/styles/navbar/navbarLayout.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faMessage, faBell, faPalette } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  return (
    <>
      <Navbar className="space-x-6 h-8 sm:h-12" fluid rounded>
        <Navbar.Brand as={Link} href="/">
          <img src="../../picture/logo.png" className="h-4 sm:h-6 ml-4" alt="Beartful Logo" />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link className={style.text_menu} href="/login">SIGN IN</Navbar.Link>
          <Navbar.Link className={style.text_menu} href="/register">SIGN UP</Navbar.Link>
          <div className={style.menu}>
            <Navbar.Link href="/register">
              <FontAwesomeIcon icon={faCartShopping} className={`${style.icon}`}></FontAwesomeIcon>
              <span className={`${style.count} absolute-4 top-0 right-24`}>15</span>
            </Navbar.Link>
            <Navbar.Link href="/register">
              <FontAwesomeIcon icon={faMessage} className={style.icon}></FontAwesomeIcon>
              <span className={`${style.count} absolute top-0 right-12`}>1</span>
            </Navbar.Link>
            <Navbar.Link href="/register">
              <FontAwesomeIcon icon={faBell} className={`${style.icon}`}></FontAwesomeIcon>
              <span className={`${style.count} absolute top-0 -right-2`}>21</span>
            </Navbar.Link>
          </div>
          <div className="flex md:order-2 right-0">
            <Dropdown
              arrowIcon={true}
              inline
              label={
                <Avatar alt="User settings" img="../../picture/user1.gif" rounded />
              }
            >
              <Dropdown.Header>
                <span className="block text-md">naphattt</span>
                <span className="block truncate text-xs font-medium text-gray-600">maewzommm@gmail.com</span>
              </Dropdown.Header>
              <Dropdown.Item>Profile</Dropdown.Item>
              <Dropdown.Item>My Shop</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>Sign out</Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle />
          </div>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default NavBar