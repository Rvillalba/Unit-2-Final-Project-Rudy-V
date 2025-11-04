import { useParams } from "react-router-dom";
import Button from "./Button";
import useEventHandler from "./eventHandler";
import { useState } from "react";


const Login = () => {
    
    const { Login }=useParams()
    const { formData, handleChange, clearInput} = useEventHandler();
    return(       
        <div>
            {/*This is the login form*/}
            <div id="login-form">
                    <form id="form">
                        <input id="email" type="email" name="email"  required placeholder="E-Mail" /> <br/>
                        <input id="password" type="password" name="password" required placeholder="Password" /> <br/>
                        <Button id="btn" label="Login" type="submit" />
                    </form>
            </div>
        </div>
    )

}

export default Login;