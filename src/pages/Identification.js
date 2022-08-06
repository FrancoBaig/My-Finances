import React, { useState } from "react";

function Identification() {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleIdentification = (e) => {
        e.preventDefault();

        // reset
        setName("");
        setEmail("");
        setPassword("");
    };

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <form
                onSubmit={handleIdentification}
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
                    />
                )}
                <input
                    type="email"
                    placeholder="Email..."
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
                    className="input"
                />
                <input
                    type="password"
                    placeholder="Password..."
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                    className="input"
                />
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
