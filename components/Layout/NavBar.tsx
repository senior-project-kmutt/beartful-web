import Link from 'next/link';
import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import style from "@/styles/navbar/navbarLayout.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faMessage, faHistory, faBell, faPalette, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import { SearchFreelance, Users } from '@/models/users';
import { LOGO_IMAGE } from '@/config/constants';
import { getSearchFreelance } from '@/services/user/user.api';

const NavBar = () => {
  const router = useRouter();
  const [user, setUser] = useState<Users | null>(null);
  const [keywordSearch, setKeywordSearch] = useState<string>('');
  const [searchResult, setSearchResult] = useState<SearchFreelance[]>([]);
  const [isResultEmpty, setIsResultEmpty] = useState<boolean>(false);

  useEffect(() => {
    const userSession = localStorage.getItem('user')
    if (userSession && userSession !== "undefined") {
      const user = JSON.parse(userSession);
      setUser(user)
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    setUser(null);
    router.push(`${process.env.NEXT_PUBLIC_BASEPATH}/`);
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setKeywordSearch(value);
  }

  const handleSearch = async (keyword: string) => {
    setIsResultEmpty(false)
    const token = localStorage.getItem("auth");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const result = await getSearchFreelance(keyword, headers) as SearchFreelance[];
    if (result.length === 0) {
      setIsResultEmpty(true)
    }
    setSearchResult(result);
  }

  useEffect(() => {
    if (keywordSearch) {
      handleSearch(keywordSearch)
    } else {
      setSearchResult([])
    }
  }, [keywordSearch])

  return (
    <>
      <Navbar className="space-x-6 h-8 sm:h-12 mt-3" fluid rounded>
        <Navbar.Brand as={Link} href={`${process.env.NEXT_PUBLIC_BASEPATH}/`} >
          <img src={LOGO_IMAGE} className="h-4 sm:h-6 ml-4" alt="Beartful Logo" />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          {!user ? (
            <>
              <Navbar.Link className={style.text_menu} onClick={() => router.push(`${process.env.NEXT_PUBLIC_BASEPATH}/authen?page=login`)}>เข้าสู่ระบบ</Navbar.Link>
              <Navbar.Link className={`${style.text_menu} mr-4`} onClick={() => router.push(`${process.env.NEXT_PUBLIC_BASEPATH}/authen?page=signup`)}>สมัครสมาชิก</Navbar.Link>
            </>
          ) : (
            <>
              <div className="relative -mr-8">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                </div>
                <input onChange={handleInputChange} type="search" id="search" className="block w-72 p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="ค้นหาฟรีแลนซ์" required />
                {keywordSearch && (
                  <>
                    <div className={`${style.search_result}`}>
                      {isResultEmpty && (
                        <p className='text-gray-400 font-bold p-6 text-center'>ไม่พบฟรีแลนซ์</p>
                      )}
                      {searchResult.map(item => {
                        return (
                          <>
                            <div className={`${style.result_item}`} onClick={() => router.push(`/user?username=${item.username}`)}>
                              <div className='flex items-center'>
                                <img src={item.profileImage} alt="" />
                                <div>
                                  <p className={style.username}>{item.username}</p>
                                  <p className={style.name}>{item.firstname} {item.lastname}</p>
                                </div>
                              </div>
                              <div>
                                <FontAwesomeIcon icon={faArrowRight} size='lg' />
                              </div>
                            </div>
                          </>
                        )
                      })}
                    </div>
                  </>
                )}
              </div>
              <div className={style.menu}>
                {user.role === 'customer' && (
                  <Navbar.Link onClick={() => router.push(`${process.env.NEXT_PUBLIC_BASEPATH}/cart`)}>
                    <FontAwesomeIcon icon={faCartShopping} className={`${style.icon}`}></FontAwesomeIcon>
                    {/* <span className={`${style.count} absolute-4 top-0 right-24`}>15</span> */}
                  </Navbar.Link>
                )}
                {user.role !== 'admin' && (
                  <>
                    <Navbar.Link onClick={() => router.push(`${process.env.NEXT_PUBLIC_BASEPATH}/chat`)}>
                      <FontAwesomeIcon icon={faMessage} className={style.icon}></FontAwesomeIcon>
                    </Navbar.Link>
                    <Navbar.Link onClick={() => router.push(`${process.env.NEXT_PUBLIC_BASEPATH}/profile/purchase`)}>
                      <FontAwesomeIcon icon={faHistory} className={style.icon}></FontAwesomeIcon>
                      {/* <span className={`${style.count} absolute top-0 right-12`}>1</span> */}
                    </Navbar.Link>
                  </>
                )}
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
                  <Dropdown.Item onClick={() => router.push(`${process.env.NEXT_PUBLIC_BASEPATH}/profile`)}>บัญชีของฉัน</Dropdown.Item>
                  {/* customer */}
                  {user.role === 'customer' && (
                    <Dropdown.Item onClick={() => router.push(`${process.env.NEXT_PUBLIC_BASEPATH}/profile/purchase`)}>การซื้อและการจ้างของฉัน</Dropdown.Item>
                    // {/* <Dropdown.Item onClick={() => router.push(`${process.env.NEXT_PUBLIC_BASEPATH}/purchase`)}>การกดถูกใจและบันทึก</Dropdown.Item> */}
                  )}
                  {/* freelance */}
                  {user.role === 'freelance' && (
                    <>
                      <Dropdown.Item onClick={() => router.push(`${process.env.NEXT_PUBLIC_BASEPATH}/profile/purchase`)}>ประวัติการขาย/รับงานของฉัน</Dropdown.Item>
                      <Dropdown.Item onClick={() => router.push(`${process.env.NEXT_PUBLIC_BASEPATH}/profile/review`)}>คะแนนของฉัน</Dropdown.Item>
                      <Dropdown.Item onClick={() => router.push(`${process.env.NEXT_PUBLIC_BASEPATH}/profile/transfer`)}>เงินในบัญชีของฉัน</Dropdown.Item>
                    </>
                  )}
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={logout}>ออกจากระบบ</Dropdown.Item>
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