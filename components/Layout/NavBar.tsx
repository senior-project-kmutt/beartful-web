import Link from 'next/link';
import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import style from "@/styles/navbar/navbarLayout.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faMessage, faBell, faPalette } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Users } from '@/models/users';

const NavBar = () => {
  const router = useRouter();
  const [user, setUser] = useState<Users | null>(null);

  useEffect(() => {
    const userSession = localStorage.getItem('user')
    if(userSession) {
      const user = JSON.parse(userSession);
      setUser(user)
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  }

  return (
    <>
      <Navbar className="space-x-6 h-8 sm:h-12" fluid rounded>
        <Navbar.Brand as={Link} href="/">
          <img src="/ssi1/picture/logo.png" className="h-4 sm:h-6 ml-4" alt="Beartful Logo" />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          {!user ? (
            <>
              <Navbar.Link className={style.text_menu} onClick={() => router.push('/authen')}>SIGN IN</Navbar.Link>
              <Navbar.Link className={`${style.text_menu} mr-4`} onClick={() => router.push('/register')}>SIGN UP</Navbar.Link>
            </>
          ) : (
            <>
              <div className={style.menu}>
                <Navbar.Link>
                  <FontAwesomeIcon icon={faCartShopping} className={`${style.icon}`}></FontAwesomeIcon>
                  <span className={`${style.count} absolute-4 top-0 right-24`}>15</span>
                </Navbar.Link>
                <Navbar.Link onClick={() => router.push('/chat')}>
                  <FontAwesomeIcon icon={faMessage} className={style.icon}></FontAwesomeIcon>
                  <span className={`${style.count} absolute top-0 right-12`}>1</span>
                </Navbar.Link>
                <Navbar.Link>
                  <FontAwesomeIcon icon={faBell} className={`${style.icon}`}></FontAwesomeIcon>
                  <span className={`${style.count} absolute top-0 -right-2`}>21</span>
                </Navbar.Link>
              </div>
              <div className="flex md:order-2 right-0">
                <Dropdown
                  arrowIcon={true}
                  inline
                  label={
                    <Avatar alt="User settings" img={user.profileImage} rounded />
                  }
                >
                  <Dropdown.Header>
                    <span className="block text-md">{user.username}</span>
                    <span className="block truncate text-xs font-medium text-gray-600">{user.email}</span>
                  </Dropdown.Header>
                  <Dropdown.Item>Profile</Dropdown.Item>
                  <Dropdown.Item>My Shop</Dropdown.Item>
                  <Dropdown.Item>Settings</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={logout}>Sign out</Dropdown.Item>
                </Dropdown>
                <Navbar.Toggle />
              </div>
            </>
          )}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default NavBar