import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import FormComponent from "./Form";
import eventHandler from "./eventHandler";

const Landing = () => {
    const [formData, setFormData] = useState({ name: '', email: ''});
    const navigate = useNavigate();

    useEffect(() =>{
        const existingUserId = localStorage.getItem('userId');
        if (existingUserId) {
            navigate('/create');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userId = crypto.randomUUID();

        const response = await fetch('/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: userId,
                name: formData.name,
                email: formData.email
            })
        });

        localStorage.setItem('userId', userId);
        localStorage.setItem('userName', formData.name);

        navigate('/create');
    }

const userForm = [
    { name: "name", type: "text", placeholder: "Your Name", required: true},
    { name: "email", type: "email", placeholder: "Your Email", required: true}
];

const isDisabled = !formData.name.trim() || !formData.email.trim();

    return (
        <div>
            <main id="landing">
                <h1 >Need a calling card?</h1><br/>
                <p>No need to order physical cards anymore!</p>
                <p>Create a custom contact card and save it for distribution.</p>
            

        <FormComponent
            fields={userForm}
            formData={formData}
            handleChange={eventHandler}
            onSubmit={handleSubmit}
            submitLabel="Create User"
            isDisabled={isDisabled}
            />
            </main>
        </div>
    );
}

export default Landing

