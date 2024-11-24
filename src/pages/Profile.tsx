import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Authcontext from "../utils/context";
import User from "../services/users";
import toast from "react-hot-toast";

interface UserWithId {
    id: string;
    name: string;
    role: string;
    isAuth: boolean;
}

const Profile = () => {
    const context = useContext(Authcontext);
    const user = context.user as UserWithId;
    useNavigate();
    const [firstName, setFirstName] = useState(user.name.split(" ")[0]);
    const [lastName, setLastName] = useState(user.name.split(" ")[1]);
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [walletPoints, setWalletPoints] = useState(0);

    useEffect(() => {
        const fetchUserData = async () => {
            const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
            if (!storedUser.id) {
                console.error("User ID is undefined");
                return;
            }
            try {
                const userData = await User.getUserById(storedUser.id);
                setFirstName(userData.firstName);
                setLastName(userData.lastName);
                setPhone(userData.phone);
                setEmail(userData.email);
                setWalletPoints(userData.walletPoints);
            } catch (error) {
                console.error("Error fetching user data:", error);
                toast.error("Failed to fetch user data");
            }
        };
        fetchUserData();
    }, []);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const updatedUser = {
                id: user.id,
                firstName,
                lastName,
                phone,
                email,
                name: `${firstName} ${lastName}`,
                role: user.role,
                isAuth: user.isAuth,
            };
            await User.updateUser(updatedUser);
            toast.success("Profile updated successfully");
            context.login(updatedUser);
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile");
        }
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
                    <form className="card-body !gap-0" onSubmit={handleUpdate}>
                        <h2 className="text-3xl text-center font-bold mb-6">Profile</h2>
                        <div className="flex gap-2">
                            <div className="form-control">
                                <label className="label !pb-[0.25rem]">
                                    <span className="label-text">First Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    className="input input-bordered w-full"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label !pb-[0.25rem]">
                                    <span className="label-text">Last Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    className="input input-bordered w-full"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label !pb-[0.25rem]">
                                <span className="label-text">Phone</span>
                            </label>
                            <input
                                type="text"
                                placeholder="123 456 7890"
                                className="input input-bordered"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label !pb-[0.25rem]">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="email"
                                className="input input-bordered"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label !pb-[0.25rem]">
                                <span className="label-text">Wallet Points</span>
                            </label>
                            {walletPoints}
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary" type="submit">
                                Update Profile
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;