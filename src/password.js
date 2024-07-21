import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validator from "validator";
import { RiLockPasswordFill } from "react-icons/ri";
import { TbPasswordMobilePhone } from "react-icons/tb";
import db from "./firebase";
import {ref, set} from "firebase/database";


function Password() {
    const rlength = useRef();
    
    const [length, setLength] = useState("");
    const [uppercase, setUppercase] = useState(false);
    const [digits, setDigits] = useState(false);
    const [special, setSpecial] = useState(false);
    const [password, setPassword] = useState("");

    const hLength = (event) => {
        setLength(event.target.value);
    };

    const hUppercase = (event) => {
        setUppercase(event.target.checked);
    };

    const hDigits = (event) => {
        setDigits(event.target.checked);
    };

    const hSpecial = (event) => {
        setSpecial(event.target.checked);
    };

    
    const save = (event) => {
        event.preventDefault();
        if (length === "") {
            alert("You did not enter the length of the password");
            rlength.current.focus();
            setPassword("");
            return;
        }

        const btnName = event.nativeEvent.submitter.name;

        if (btnName === "sub") {
            let text = "abcdefghijklmnopqrstuvwxyz";
            if (uppercase) 
              text += text.toUpperCase();
            if (digits) 
              text += "0123456789";
            if (special) 
              text += "!@#$%^&*()";

            let pw = "";
            let len = parseInt(length);
            if (isNaN(len) || len < 8) len = 8; //password should not be less than 8
            for (let i = 0; i < len; i++) {
                const r = Math.floor(Math.random() * text.length);
                pw += text[r];
            }
            setPassword(pw);
        } else if (btnName === "ctc") {
            if (password !== "") {
                navigator.clipboard.writeText(password)
                .then( () => {
                        toast.success("Copied to clipboard", {
                            autoClose: 1000,
                            position: "top-center",
                            theme: "dark",
                        });
                    },
                    () => {
                        toast.error("Failed to copy", {
                            autoClose: 1000,
                            position: "top-center",
                            theme: "dark",
                        });
                    }
                );
            }
        } else if (btnName === "ps") {
            const sp = {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 2,
            };
            if (validator.isStrongPassword(password, sp)) {
                toast.success("Strong password", {
                    autoClose: 1000,
                    position: "top-center",
                    theme: "dark",
                });
            } else {
                toast.warning("Weak password", {
                    autoClose: 1000,
                    position: "top-center",
                    theme: "dark",
                });
            }
        } 
    };

    return (
        <>
            <center>
              <div className="icon">
            <RiLockPasswordFill/>
            </div>
            <h3>Need a Unique Password ? </h3>

            <h1>Password Generator <TbPasswordMobilePhone/></h1>
            <div className ="box">
                <form onSubmit={save}>
                    <label>Enter Password Length  </label>
                    <input 
                        type="number" 
                        min={8} 
                        max={20} 
                        onChange={hLength} 
                        ref={rlength} 
                        value={length}
                    />
                    <br /><br />
                    <input 
                        type="checkbox" 
                        onChange={hUppercase} 
                        checked={uppercase}
                    /> Uppercase
                    <input 
                        type="checkbox" 
                        onChange={hDigits} 
                        checked={digits}
                    /> Digits
                    <input 
                        type="checkbox" 
                        onChange={hSpecial} 
                        checked={special}
                    /> Special Characters
                    <br /><br />
                    <input 
                        type="submit" 
                        name="sub" 
                        value="Generate Password" 
                        className="btn"
                    />
                    <input 
                        type="submit" 
                        name="ctc" 
                        value="Copy to Clipboard" 
                        className="btn"
                    />
                    <input 
                        type="submit" 
                        name="ps" 
                        value="Password Strength" 
                        className="btn"
                    />
                </form>
                <h2 id="pass">{password}</h2>
                
                </div>
                <p> &copy;  Varnika Bhoga</p>
            </center>
            <ToastContainer />
          
        </>
    );
}

export default Password;
