import React, { useState } from "react";

// services
import {
    registrationService,
    loginService,
} from "../services/IdentificationAPI";

function Identification() {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

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

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <form
                onSubmit={(e) => handleIdentification(e)}
                className="w-full paper p-10 grid gap-3 "
            >
                <h2 className="text-xl">
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
                    className="input"
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
