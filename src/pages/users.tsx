import {useEffect, useRef, useState} from "react"
import user from "../services/users"
import {AiTwotoneEdit} from "react-icons/ai"
import {IoTrashOutline} from "react-icons/io5"
import toast from "react-hot-toast"

const Users = () => {
    const deleteRef = useRef<HTMLDialogElement>(null)
    const editRef = useRef<HTMLDialogElement>(null)
    const makeRecyclerRef = useRef<HTMLDialogElement>(null)

    const [admins, setAdmins] = useState([])
    const [recyclers, setRecyclers] = useState([])
    const [editedUser, setEditedUser] = useState({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: 0,
    })
    const [makeRecyclerId, setMakeRecyclerId] = useState("")
    const [deleteId, setDeleteId] = useState("")

    const fetchAdmins = async () => {
        try {
            const response = await user.getAdmins()
            setAdmins(response.data)
        } catch (error: any) {
            console.log(error.response?.data.message || error.message)
        }
    }

    const fetchRecyclers = async () => {
        try {
            const response = await user.getRecyclers()
            setRecyclers(response.data)
        } catch (error: any) {
            console.log(error.response?.data.message || error.message)
        }
    }

    useEffect(() => {
        fetchAdmins()
        fetchRecyclers()
    }, [])

    const handleDelete = async () => {
        try {
            await user.deleteUser(deleteId)
            toast.success("User deleted successfully")
            fetchAdmins()
            fetchRecyclers()
        } catch (error: any) {
            toast.error(error.response?.data.message || error.message)
        }
    }

    const handleEdit = async () => {
        try {
            await user.updateUser(editedUser)
            toast.success("User updated successfully")
            fetchAdmins()
            fetchRecyclers()
        } catch (error: any) {
            toast.error(error.response?.data.message || error.message)
        }
    }

    const handleMakeRecycler = async () => {
        try {
            await user.makeRecycler(makeRecyclerId)
            toast.success("User made Recycler successfully")
            fetchAdmins()
            fetchRecyclers()
        } catch (error: any) {
            toast.error(error.response?.data.message || error.message)
        }
    }

    return (
        <div className="px-10 py-10 h-full w-full flex flex-col gap-5">
            <dialog ref={editRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg  text-center">Edit User</h3>
                    <form
                        onSubmit={e => {
                            e.preventDefault()
                            handleEdit()
                            if (editRef.current) {
                                editRef.current.close()
                            }
                        }}
                    >
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">First Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="First Name"
                                className="input input-bordered"
                                required
                                value={editedUser.firstName}
                                onChange={e =>
                                    setEditedUser({...editedUser, firstName: e.target.value})
                                }
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Last Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="input input-bordered"
                                required
                                value={editedUser.lastName}
                                onChange={e =>
                                    setEditedUser({...editedUser, lastName: e.target.value})
                                }
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Email"
                                className="input input-bordered"
                                required
                                value={editedUser.email}
                                onChange={e =>
                                    setEditedUser({...editedUser, email: e.target.value})
                                }
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Phone Number</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Phone Number"
                                className="input input-bordered"
                                required
                                value={editedUser.phone}
                                onChange={e =>
                                    setEditedUser({
                                        ...editedUser,
                                        phone: Number(e.target.value),
                                    })
                                }
                            />
                        </div>
                        <div className="modal-action flex justify-center">
                            <button type="submit" className="btn px-10 btn-primary ">
                                Save
                            </button>
                            <button
                                className="btn px-10"
                                onClick={() => editRef.current?.close()}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
            <dialog
                ref={makeRecyclerRef}
                className="modal modal-bottom sm:modal-middle"
            >
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-center">
                        Are you Sure you want to make this user a Recycler?
                    </h3>

                    <div className="modal-action flex justify-center">
                        <button
                            className="btn btn-primary px-10"
                            onClick={() => {
                                handleMakeRecycler()
                                if (makeRecyclerRef.current) {
                                    makeRecyclerRef.current.close()
                                }
                            }}
                        >
                            Yes
                        </button>
                        <button
                            className="btn px-10"
                            onClick={() => makeRecyclerRef.current?.close()}
                        >
                            No
                        </button>
                    </div>
                </div>
            </dialog>
            <dialog ref={deleteRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-center">
                        Are you Sure you want to delete this user?
                    </h3>

                    <div className="modal-action flex justify-center gap-5">
                        <button
                            className="btn px-10 btn-primary"
                            onClick={() => {
                                handleDelete()
                                if (deleteRef.current) {
                                    deleteRef.current.close()
                                }
                            }}
                        >
                            Yes
                        </button>
                        <button
                            className="btn
              px-10"
                            onClick={() => deleteRef.current?.close()}
                        >
                            No
                        </button>
                    </div>
                </div>
            </dialog>
            <h1 className="text-3xl font-bold mb-10 text-center">Admins</h1>
            {admins.length < 1 ? (
                <p className="text-center text-2xl">No Admins found</p>
            ) : (
                <table className="table table-zebra">
                    <thead className="bg-primary-content text-primary">
                    <tr>
                        <th></th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th className="text-center">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {admins.map((user: any, index: number) => (
                        <tr tabIndex={index} key={index} className="hover">
                            <th>{index + 1}</th>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td className="flex h-full justify-center gap-3 text-lg">
                                <button
                                    className="text-green-700"
                                    onClick={() => {
                                        setEditedUser({
                                            id: user.id,
                                            firstName: user.firstName,
                                            lastName: user.lastName,
                                            email: user.email,
                                            phone: user.phone,
                                        })
                                        if (editRef.current) {
                                            editRef.current.showModal()
                                        }
                                    }}
                                >
                                    <AiTwotoneEdit/>
                                </button>
                                <button>
                                    <IoTrashOutline
                                        className="text-red-700"
                                        onClick={() => {
                                            setDeleteId(user.id)
                                            if (deleteRef.current) {
                                                deleteRef.current.showModal()
                                            }
                                        }}
                                    />
                                </button>
                                {/*<button
                                    onClick={() => {
                                        setMakeRecyclerId(user.id)
                                        if (makeRecyclerRef.current) {
                                            makeRecyclerRef.current.showModal()
                                        }
                                    }}
                                >
                                    <span>Make Recycler</span>
                                </button>*/}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            <div className="border-b-[1px] my-6"></div>
            <h1 className="text-3xl mb-10 font-bold text-center">Recyclers</h1>
            {recyclers.length < 1 ? (
                <p className="text-center text-2xl">No Recyclers found</p>
            ) : (
                <table className="table table-zebra">
                    <thead className="bg-primary-content text-primary">
                    <tr>
                        <th></th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th className="text-center">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {recyclers.map((user: any, index: number) => (
                        <tr tabIndex={index} key={index} className="hover">
                            <th>{index + 1}</th>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td className="flex h-full justify-center gap-3 text-lg">
                                <button
                                    className="text-green-700"
                                    onClick={() => {
                                        setEditedUser({
                                            id: user.id,
                                            firstName: user.firstName,
                                            lastName: user.lastName,
                                            email: user.email,
                                            phone: user.phone,
                                        })
                                        if (editRef.current) {
                                            editRef.current.showModal()
                                        }
                                    }}
                                >
                                    <AiTwotoneEdit/>
                                </button>
                                <button>
                                    <IoTrashOutline
                                        className="text-red-700"
                                        onClick={() => {
                                            setDeleteId(user.id)
                                            if (deleteRef.current) {
                                                deleteRef.current.showModal()
                                            }
                                        }}
                                    />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default Users