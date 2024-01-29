import { useEffect, useState } from "react";
import cookie from "js-cookie";
import axios from "axios";
import "./Form.css";

function Form() {
    const [hasToken, setHasToken] = useState(false);
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");
    const [user, setUser] = useState({});
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const resetMessages = () => {
        setMsg("");
        setError("");
    };

    const setErrorMessages = (error) => {
        if (error.response) {
            setError(error.response.data.error);
        } else {
            setError(error.message);
        }
    };

    // const backendApiUrl =
    //     process.env.NODE_ENV === "development"
    //         ? "http://localhost:3005"
    //         : "https://myproject233.render.com";

    const handleSignup = async (e) => {
    console.log("handleSignup ausgefühlt");
        // const form = e.target;
        // const email = form.email.value;
        // const password = form.password.value;
        e.preventDefault();
        console.log("email in handleSignup", email)
        console.log("password in handleSignup", password)

        resetMessages();
        try {
            // const response = await axios.post(`${backendApiUrl}/signup`, { email, password });
            const response = await axios.post(`http://localhost:3005/signup`, { email, password, name: username });

            setUser(response.data.user);
            setMsg("You have successfully registered.");
            setIsLoggedIn(true);
        } catch (error) {
            setErrorMessages(error);
            console.log("error while signing up:", error);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        // const form = e.target;
        // const email = form.email.value;
        // const password = form.password.value;
        resetMessages();
        try {
            const response = await axios.post(
                // `http://localhost:3005/login?include=Todos` ,
                `http://localhost:3005/login`,

                // `${backendApiUrl}/login`,
                { email, password },
                { withCredentials: true }
            );
            setUser(response.data.user);
            setHasToken(true);
            setIsLoggedIn(true);
            setMsg(`You have successfully logged in: ${email}. JWT received.`);
        } catch (error) {
            setErrorMessages(error);
            console.log("error while logging in:", error);
        }
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        resetMessages();
        try {
            const response = await axios.post(
                `http://localhost:3005/logout`,

                // `${backendApiUrl}/logout`,
                {},
                { withCredentials: true }
            );
            setMsg("You have successfully logged out.", response.data);
            console.log("Logout successful:", response.data);
            setHasToken(false);
            setIsLoggedIn(false);
            setUser({});
        } catch (error) {
            setErrorMessages(error);
            console.log("error while logging out:", error);
        }
    };

    const handleIfUserHasToken = () => {
        let JWTinfocookie = cookie.get("JWTinfo");
        if (!JWTinfocookie) return;

        JWTinfocookie = JWTinfocookie.replace("j:", "");
        const cookieValueObj = JSON.parse(JWTinfocookie);
        console.log("cookieValueObj", cookieValueObj);

        const expirationInMs = new Date(cookieValueObj.expires) - new Date();

        if (expirationInMs <= 0) return;

        setHasToken(true);
        setUser({ email: cookieValueObj.email });
        setMsg(`Logged in user: ${cookieValueObj.email}.`);
    };

    const userInfoHandler = async () => {
        resetMessages();
        try {
            const resp = await axios.get(`http://localhost:3005/userinfo`, {
                withCredentials: true,
            });
            console.log("resp.data:", resp.data);
            setMsg(resp.data);
        } catch (error) {
            setErrorMessages(error);
        }
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        resetMessages();
        try {
            const response = await axios.put(`http://localhost:3005/update-password`, formData, {
                withCredentials: true,
            });
            console.log("Server Response:", response.data);
        } catch (error) {
            setErrorMessages(error);
            console.log("error while update-password:", error);
        }
    };

    useEffect(() => {
        handleIfUserHasToken();
        const token = cookie.get("token");
        if (token) {
            setHasToken(true);
        }
    }, []);

    return (
        <div className="container">
            <div className="form_area">
                <p className="title sub_title">SIGN UP</p>
                <h3 style={{ color: "orange" }}>
                    DEBUG-Message: {hasToken ? "User is logged in." : "Not logged in!!!"}
                </h3>
                <p className="info">
                    <span style={{ color: "red", fontSize: "0.7rem" }}>{error}</span>{" "}
                    <span>{msg}</span>
                </p>
                <div>
                    {hasToken ? (
                        <div className="form_group">
                            <p>Logged in as: {user.email}</p>
                            <button className="btn" onClick={handleLogout}>
                                Logout
                            </button>
                            <label className="sub_title" htmlFor="password">
                                New Password:
                            </label>

                            <input
                                className="form_style"
                                placeholder="Enter your password"
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button className="btn" onClick={handlePasswordUpdate}>
                                Update Password
                            </button>
                            <hr />
                            <button
                                style={{ background: "#F3B95F", margin: "0 auto" }}
                                onClick={userInfoHandler}
                            >
                                Zeige persönliche Daten
                            </button>
                        </div>
                    ) : (
                        <div className="form_group">
                            <label className="sub_title" htmlFor="username">
                                Username:
                            </label>
                            <input
                                className="form_style"
                                id="username"
                                name="username"
                                type="text"
                                placeholder="Enter your username"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <br />
                            <label className="sub_title" htmlFor="email">
                                Email:
                            </label>
                            <input
                                className="form_style"
                                placeholder="Enter your email"
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <br />
                            <label className="sub_title" htmlFor="password">
                                Password:
                            </label>
                            <input
                                className="form_style"
                                placeholder="Enter your password"
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <br />
                            <div className="btn">
                                <button onClick={(e)=> handleSignup(e)}>Signup1</button>
                                <button onClick={handleLogin}>Login</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Form;
