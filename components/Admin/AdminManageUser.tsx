import { formatDateTime } from "@/core/tranform";
import { UserPagination } from "@/models/users";
import { getUsers } from "@/services/user/user.api";
import style from "@/styles/admin/adminManageUser.module.scss";
import { faBarsStaggered, faChevronDown, faFilter, faReply, faUsersGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
const AdminManageUser = () => {
    const [role, setRole] = useState<string>('')
    const [user, setUser] = useState<UserPagination>()
    const [page, setPage] = useState<number>(1)
    const [totalPage, setTotalPage] = useState<number>(5)

    const columnName = ['Username', 'Email', 'Last Updated', 'Type', 'Action']
    const roleSelect = ['ทั้งหมด', 'customer', 'freelance', 'admin']

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await getUsers(page, 9, role).toPromise();
                setUser(res.data);
                setTotalPage(res.data.totalPages);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, [page, role]);

    return (
        <div className={style.container}>
            <div className={style.heading}>จัดการผู้ใช้งาน</div>
            <div className={style.box}>
                <div className={style.sidebar}>
                    <div className={style.bar}>.</div>
                    <button className={style.icon}>
                        <FontAwesomeIcon icon={faUsersGear} color="white" size="xl" />
                        <p className={style.title}>จัดการผู้ใช้งาน</p>
                    </button>
                </div>
                <div className={style.user}>
                    <div className={style.filterUser}>
                        <FontAwesomeIcon icon={faFilter} color="white" className="mt-3 ml-3 mr-3" />
                        <select value={role} onChange={(event) => { setRole(event.target.value); setPage(1); }}>
                            <option value="" disabled selected hidden>ประเภทผู้ใช้งาน</option>
                            {roleSelect.map((name, index) => (
                                <option key={index} value={name === 'ทั้งหมด' ? '' : name}>
                                    {name}
                                </option>
                            ))}
                        </select>

                        <div className={style.reset}>
                            <FontAwesomeIcon icon={faReply} color="white" className="mt-3 ml-3" />
                            <div className="text-white ml-2 mt-2" onClick={() => { setRole(''); setPage(1); }}>Reset Filter</div>
                        </div>

                    </div>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs h-14 text-white uppercase bg-[#E16428]">
                                <tr>
                                    {columnName.map((name, index) => (
                                        <th key={index} scope="col" className="px-6 py-3">
                                            {name}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {user?.users.map((item, index) => (
                                    <tr key={index} className="odd:bg-white even:bg-[#FFFAF7] border-b">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {item.username}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            {formatDateTime(item.updatedAt)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.role}
                                        </td>
                                        <td className="px-6 py-4">
                                            <FontAwesomeIcon icon={faBarsStaggered} style={{ cursor: 'pointer' }} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="text-sm text-gray-500 mt-5">{user && `แสดง ${((page - 1) * 9) + 1}-${Math.min(page * 9, user.count)} จาก ${user.count} รายการ`}</div>
                    <div className={style.paginate}>
                        <FontAwesomeIcon icon={faChevronDown} rotation={90} className="w-1/4 mt-2" color="white" onClick={() => setPage(Math.max(page - 1, 1))} />
                        {totalPage &&
                            <input type="text" min={1} max={totalPage} className="w-2/4" value={page} disabled={true} />
                        }
                        <FontAwesomeIcon icon={faChevronDown} rotation={270} className="w-1/4 mt-2" color="white" onClick={() => setPage(Math.min(page + 1, totalPage))} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminManageUser;