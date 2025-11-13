import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import FormComponent from "./Form";

const Landing = () => {
    
    const [formData, setFormData] = useState({ name: '', email: ''});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    /*This is an event handler used for POST request when creating a user*/
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
        const response = await fetch('http://localhost:8080/users/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: formData.name,
                email: formData.email
            })
        });

        if (!response.ok) throw new Error('Failed to create user.');

        const newUser = await response.json();

        /*This saves the userID in local storage. Temporary until I finish auth in future development*/
        localStorage.setItem('userId', newUser.id);
        localStorage.setItem('userName', newUser.name)

        window.dispatchEvent(new Event('userCreated'))

        /*This is to move the user straight to the create page after creating a user*/
        navigate('/create');

    } catch(error) {
        console.error('Error creating user:', error);
        alert('Failed to create user. Please try again');
        }
    }

    /*This is a user create form from the Form component*/
const userForm = [
    { name: "name", type: "text", placeholder: "Your Name", required: true},
    { name: "email", type: "email", placeholder: "Your Email", required: true}
];

/*This disables funtionality if the name and email fields are empty*/
const isDisabled = !formData.name.trim() || !formData.email.trim();

    return (
        <div>
            <main id="landing">
                <h1 >Need a calling card?</h1><br/>
                <p>No need to order physical cards anymore!</p>
                <p>Create a custom contact card and save it for distribution.</p>
            
        {/*This is the create user form from the Form component*/}
        <FormComponent
            fields={userForm}
            formData={formData}
            handleChange={handleChange}
            onSubmit={handleSubmit}
            submitLabel="Create User"
            isDisabled={isDisabled}
            />
            </main>
        </div>
    );
}

export default Landing

