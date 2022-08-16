import React, { useState } from "react";

// services
import {
    registrationService,
    loginService,
} from "../services/IdentificationAPI";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../redux/states/userState";

// Router
import { Navigate } from "react-router-dom";

function Identification() {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const handleIdentification = async (e) => {
        e.preventDefault();

        if (isLogin) {
            const response = await loginService({
                email,
                password,
            });

            if (response.status === "error") {
                setError(response.error);
            } else {
                setError("");
                dispatch(createUser(response.data));
            }
        } else {
            const response = await registrationService({
                name,
                email,
                password,
            });

            if (response.status === "error") {
                setError(response.error);
            } else {
                setError("");
            }
        }

        setName("");
        setEmail("");
        setPassword("");
    };

    if (user.email !== "") {
        return <Navigate to="/home" replace={true} />;
    }

    return (
        <div className="w-full h-3/4 grid justify-center md:grid-cols-2 translate-y-2/4 mx-auto items-center max-w-screen-md shadow-md">
            <div className="hidden bg-primary h-full w-full rounded-l-lg p-3 md:flex md:flex-col md:gap-1 md:justify-between">
                <div>
                    <h2 className="text-white text-3xl font-semibold w-2/4 pb-2">
                        Welcome to My Personal Finances
                    </h2>
                    <p className="text-white text-sm w-3/4">
                        Log in to your account or create a new one and start
                        taking control of your finances.
                    </p>
                </div>
                <span className="text-white text-sm self-center">
                    Project created by
                    <a
                        href="https://francobaigorria.netlify.app/"
                        target="_blank"
                        rel="noreferrer"
                        className="font-bold pl-1 underline "
                    >
                        Franco Baigorria
                    </a>
                </span>
            </div>
            <form
                onSubmit={(e) => handleIdentification(e)}
                className="w-full p-10 py-20 grid gap-3 max-w-sm md:max-w-md"
            >
                <h2 className="text-xl font-medium">
                    {isLogin
                        ? "Log in to your account"
                        : "Sign up for your account"}
                </h2>
                {isLogin ? (
                    ""
                ) : (
                    <input
                        type="name"
                        placeholder="Name..."
                        value={name}
                        onChange={({ target }) => setName(target.value)}
                        className="input"
                        required
                    />
                )}
                <input
                    type="email"
                    placeholder="Email..."
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
                    className="input"
                    required
                />
                <input
                    type="password"
                    placeholder="Password..."
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                    className="input text-sm"
                    required
                />
                {error === "" ? (
                    ""
                ) : (
                    <p className="text-sm text-red-600">{error}</p>
                )}
                <button type="submit" className="btn">
                    {isLogin ? "Log in" : "Sign up"}
                </button>
                <div className="w-full h-px bg-gray-300 rounded-full"></div>
                <div className="flex gap-1">
                    <p>
                        {isLogin
                            ? "Don't have an account?"
                            : "Have an account?"}
                    </p>
                    <button
                        className="text-primary"
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? "Sign up" : "Log in"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Identification;
