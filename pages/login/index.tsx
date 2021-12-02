import {
    faFacebookF,
    faGooglePlusG,
    faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import jwt from "jsonwebtoken";
import { useSession, signIn, signOut } from "next-auth/react";
import styles from "../../styles/Login.module.css";

type Props = {};

const Login: React.FC<Props> = ({}) => {
    const classContainer = useRef<HTMLElement | null>(null);
    const [formName, setFormName] = useState("");
    const [formEmail, setFormEmail] = useState("");
    const [formPassword, setFormPassword] = useState("");
    const [formLoginEmail, setFormLoginEmail] = useState("");
    const [formLoginPassword, setFormLoginPassword] = useState("");

    const sideSignUp = () => {
        const ref = classContainer.current; // corresponding DOM node
        {
            ref !== null ? ref.classList.add("right-panel-active") : null;
        }
    };

    const sideSignIn = () => {
        const ref = classContainer.current; // corresponding DOM node
        {
            ref !== null ? ref.classList.remove("right-panel-active") : null;
        }
    };

    const signUp = async (e: any) => {
        e.preventDefault();
        const response = await fetch("/api/register", {
            method: "POST",
            body: JSON.stringify({
                password: formPassword,
                email: formEmail,
                name: formName,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        console.log(data);
    };

    const logIn = async (e: any) => {
        e.preventDefault();
        // const response = await fetch("/api/auth/login", {
        //     method: "POST",
        //     body: JSON.stringify({
        //         password: formLoginPassword,
        //         email: formLoginEmail,
        //     }),
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        // });

        const status = await signIn("credentials", {
            redirect: true,
            email: formLoginEmail,
            password: formLoginPassword,
            callbackUrl: "http://localhost:3000/",
        });
        console.log(status);

        // const data = await response.json();
        // console.log(data);

        // const json = jwt.decode(data.token);
        // console.log("data", json);
    };

    return (
        <>
            <div className="body">
                <h2>SHOPIT Sign in/up</h2>
                <div
                    ref={classContainer as any}
                    className="container"
                    id="container"
                >
                    <div className="form-container sign-up-container">
                        <form onSubmit={signUp}>
                            <h1>Create Account</h1>
                            <div className="social-container">
                                <a href="#" className="social">
                                    {/* <i className="fab fa-facebook-f" /> */}
                                    <FontAwesomeIcon
                                        icon={faFacebookF}
                                        className="fab"
                                    />
                                </a>
                                <a href="#" className="social">
                                    {/* <i className="fab fa-google-plus-g" /> */}
                                    <FontAwesomeIcon
                                        icon={faGooglePlusG}
                                        className="fab"
                                    />
                                </a>
                                <a href="#" className="social">
                                    {/* <i className="fab fa-linkedin-in" /> */}
                                    <FontAwesomeIcon
                                        icon={faLinkedinIn}
                                        className="fab"
                                    />
                                </a>
                            </div>
                            <span>or use your email for registration</span>
                            <input
                                type="text"
                                placeholder="Name"
                                onChange={(e: any) => {
                                    setFormName(e.target.value);
                                    console.log(formName);
                                }}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                onChange={(e: any) => {
                                    setFormEmail(e.target.value);
                                    console.log(formEmail);
                                }}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                onChange={(e: any) => {
                                    setFormPassword(e.target.value);
                                    console.log(formPassword);
                                }}
                            />
                            <button>Sign Up</button>
                        </form>
                    </div>
                    <div className="form-container sign-in-container">
                        <form onSubmit={logIn}>
                            <h1>Sign in</h1>
                            <div className="social-container">
                                <a href="#" className="social">
                                    {/* <i className="fab fa-facebook-f" /> */}
                                    <FontAwesomeIcon
                                        icon={faFacebookF}
                                        className="fab"
                                    />
                                </a>
                                <a className="social">
                                    {/* <i className="fab fa-google-plus-g" /> */}
                                    <FontAwesomeIcon
                                        icon={faGooglePlusG}
                                        className="fab"
                                        onClick={() => {
                                            console.log("clicked");
                                            signIn("google", {
                                                callbackUrl:
                                                    "http://localhost:3000/",
                                            });
                                        }}
                                    />
                                </a>
                                <a href="#" className="social">
                                    {/* <i className="fab fa-linkedin-in" /> */}
                                    <FontAwesomeIcon
                                        icon={faLinkedinIn}
                                        className="fab"
                                        onClick={() => {
                                            console.log("clicked");
                                            signIn("linkedin", {
                                                callbackUrl:
                                                    "http://localhost:3000/",
                                            });
                                        }}
                                    />
                                </a>
                            </div>
                            <span>or use your account</span>
                            <input
                                type="email"
                                placeholder="Email"
                                value={formLoginEmail}
                                onChange={(e: any) => {
                                    setFormLoginEmail(e.target.value);
                                    console.log(formLoginEmail);
                                }}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={formLoginPassword}
                                onChange={(e: any) => {
                                    setFormLoginPassword(e.target.value);
                                    console.log(formLoginPassword);
                                }}
                            />
                            <a href="#">Forgot your password?</a>
                            <button>Sign In</button>
                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1>Welcome Back!</h1>
                                <p>
                                    To keep connected with us please login with
                                    your personal info
                                </p>
                                <button
                                    className="ghost"
                                    id="signIn"
                                    onClick={sideSignIn}
                                >
                                    Sign In
                                </button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>Hello, Friend!</h1>
                                <p>
                                    Enter your personal details and start
                                    journey with us
                                </p>
                                <button
                                    className="ghost"
                                    id="signUp"
                                    onClick={sideSignUp}
                                >
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <footer>
                    <p>Welcome To SHOPIT</p>
                </footer>
                <style jsx>{`
                    @import url("https://fonts.googleapis.com/css?family=Montserrat:400,800");

                    * {
                        box-sizing: border-box;
                    }

                    body {
                        background: #f6f5f7;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                        font-family: "Montserrat", sans-serif;
                        height: 100vh;
                        margin: -20px 0 50px;
                    }
                    .body {
                        background: #f6f5f7;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                        font-family: "Montserrat", sans-serif;
                        height: 96vh;
                        margin: -20px 0 50px;
                    }

                    h1 {
                        font-weight: bold;
                        margin: 0;
                    }

                    h2 {
                        text-align: center;
                    }

                    p {
                        font-size: 14px;
                        font-weight: 100;
                        line-height: 20px;
                        letter-spacing: 0.5px;
                        margin: 20px 0 30px;
                    }

                    span {
                        font-size: 12px;
                    }

                    a {
                        color: #333;
                        font-size: 14px;
                        text-decoration: none;
                        margin: 15px 0;
                    }

                    button {
                        border-radius: 20px;
                        border: 1px solid #ff4b2b;
                        background-color: #ff4b2b;
                        color: #ffffff;
                        font-size: 12px;
                        font-weight: bold;
                        padding: 12px 45px;
                        letter-spacing: 1px;
                        text-transform: uppercase;
                        transition: transform 80ms ease-in;
                    }

                    button:active {
                        transform: scale(0.95);
                    }

                    button:focus {
                        outline: none;
                    }

                    button.ghost {
                        background-color: transparent;
                        border-color: #ffffff;
                    }

                    form {
                        background-color: #ffffff;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                        padding: 0 50px;
                        height: 100%;
                        text-align: center;
                    }

                    input {
                        background-color: #eee;
                        border: none;
                        padding: 12px 15px;
                        margin: 8px 0;
                        width: 100%;
                    }

                    .container {
                        background-color: #fff;
                        border-radius: 10px;
                        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
                            0 10px 10px rgba(0, 0, 0, 0.22);
                        position: relative;
                        overflow: hidden;
                        width: 768px;
                        max-width: 100%;
                        min-height: 480px;
                    }

                    .form-container {
                        position: absolute;
                        top: 0;
                        height: 100%;
                        transition: all 0.6s ease-in-out;
                    }

                    .sign-in-container {
                        left: 0;
                        width: 50%;
                        z-index: 2;
                    }

                    .container.right-panel-active .sign-in-container {
                        transform: translateX(100%);
                    }

                    .sign-up-container {
                        left: 0;
                        width: 50%;
                        opacity: 0;
                        z-index: 1;
                    }

                    .container.right-panel-active .sign-up-container {
                        transform: translateX(100%);
                        opacity: 1;
                        z-index: 5;
                        animation: show 0.6s;
                    }

                    @keyframes show {
                        0%,
                        49.99% {
                            opacity: 0;
                            z-index: 1;
                        }

                        50%,
                        100% {
                            opacity: 1;
                            z-index: 5;
                        }
                    }

                    .overlay-container {
                        position: absolute;
                        top: 0;
                        left: 50%;
                        width: 50%;
                        height: 100%;
                        overflow: hidden;
                        transition: transform 0.6s ease-in-out;
                        z-index: 100;
                    }

                    .container.right-panel-active .overlay-container {
                        transform: translateX(-100%);
                    }

                    .overlay {
                        background: #ff416c;
                        background: -webkit-linear-gradient(
                            to right,
                            #ff4b2b,
                            #ff416c
                        );
                        background: linear-gradient(to right, #ff4b2b, #ff416c);
                        background-repeat: no-repeat;
                        background-size: cover;
                        background-position: 0 0;
                        color: #ffffff;
                        position: relative;
                        left: -100%;
                        height: 100%;
                        width: 200%;
                        transform: translateX(0);
                        transition: transform 0.6s ease-in-out;
                    }

                    .container.right-panel-active .overlay {
                        transform: translateX(50%);
                    }

                    .overlay-panel {
                        position: absolute;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                        padding: 0 40px;
                        text-align: center;
                        top: 0;
                        height: 100%;
                        width: 50%;
                        transform: translateX(0);
                        transition: transform 0.6s ease-in-out;
                    }

                    .overlay-left {
                        transform: translateX(-20%);
                    }

                    .container.right-panel-active .overlay-left {
                        transform: translateX(0);
                    }

                    .overlay-right {
                        right: 0;
                        transform: translateX(0);
                    }

                    .container.right-panel-active .overlay-right {
                        transform: translateX(20%);
                    }

                    .social-container {
                        margin: 20px 0;
                    }

                    .social-container a {
                        border: 1px solid #dddddd;
                        border-radius: 50%;
                        display: inline-flex;
                        justify-content: center;
                        align-items: center;
                        margin: 0 5px;
                        height: 40px;
                        width: 40px;
                    }

                    footer {
                        background-color: #222;
                        color: #fff;
                        font-size: 14px;
                        bottom: 0;
                        position: fixed;
                        left: 0;
                        right: 0;
                        text-align: center;
                        z-index: 999;
                    }

                    footer p {
                        margin: 10px 0;
                    }

                    footer i {
                        color: red;
                    }

                    footer a {
                        color: #3c97bf;
                        text-decoration: none;
                    }
                `}</style>
            </div>
        </>
    );
};

export default Login;