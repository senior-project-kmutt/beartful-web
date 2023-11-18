import Link from 'next/link';
import { Navbar } from 'flowbite-react';

const NavBar = () => {
  return (
    <>
      <Navbar fluid rounded>
      <Navbar.Brand as={Link} href="https://flowbite-react.com">
        {/* <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> */}
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">BEARTFUL</span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        {/* <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link as={Link} href="#">
          About
        </Navbar.Link> */}
        {/* <Navbar.Link href="#">Services</Navbar.Link> */}
        <Navbar.Link href="#">SIGN IN</Navbar.Link>
        <Navbar.Link href="#">SIGN UP</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
    </>
  );
}

export default NavBar