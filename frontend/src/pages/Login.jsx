import axios from "axios"
import { useState } from "react"
import { Button } from "../components/Button.jsx"
import { Heading } from "../components/Heading.jsx"
import { InputBox } from "../components/InputBox.jsx"
import { BACKEND_URL } from "../utils/config.js"
import Proptypes from "prop-types";

export default function Login({onLogin}) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(email && password) {
            const credentials = await validateUser();
            console.log(credentials.message, credentials.message == "Login successful")

            if(credentials.message == "Login successful") {
                onLogin();
            } else {
                alert("Invalid credentials")
            }
        } else {    
            alert("Please fill in both fields");
        }
      };

    async function validateUser() {
        const response = await axios.post(`${BACKEND_URL}/login`, {
            email: email,
            password: password
        })
        const data = response.data;
        console.log(data);
        return data;
    }
    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                        <Heading title = "Login Page"/> <br/>
                        <InputBox label="Email" placeholder="user@gmail.com" onChange={e =>  setEmail(e.target.value)} className="text-box"/> <br /><br />
                        <InputBox label="Password" placeholder="password" onChange={e => setPassword(e.target.value)}/><br /><br />
                        <Button label="Login" onClick={handleSubmit} />  
                </div>
            </div>
        </div>
    )
}


Login.propTypes = {
    onLogin: Proptypes.func,
};