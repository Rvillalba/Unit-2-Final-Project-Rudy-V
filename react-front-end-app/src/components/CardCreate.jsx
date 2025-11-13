import { useNavigate, useParams } from "react-router-dom";
import CardPreview from "./CardPreview";
import eventHandler from "./eventHandler";
import FormComponent from "./Form";
import {useState, useEffect } from "react";

const CardCreate = () => {
    
    const { create }=useParams();
    /*This part of the code uses the eventHandler component*/
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);
    const [saveMessage, setSaveMessage] = useState('');

    /*Checks for user in storage*/
    useEffect(() => {
        const existingUserId = localStorage.getItem('userId');
        if (existingUserId) {
            setUserId(existingUserId);
        }
    }, []);

    const {formData, handleChange, clearInput} = eventHandler();

    /*This code checks the values of the input fields. This part is important
    to disable the download button if there is a blank field*/
    const emptyFields = Object.values(formData).every(value => value.trim() === "");

    /*This event handler is to save card to database*/
    const handleSaveCard = async (e) => {
        e.preventDefault();

        /*This message displays if the user skips the account creation on landing*/
        if (!userId) {
            setSaveMessage('Please create a user account first');
            return;
        }

        /*Try/catch block to handle POST request with error*/
        try {
            const response = await fetch ('http://localhost:8080/saved-cards/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: parseInt(userId),
                    name: formData.name,
                    phoneNumber: formData.phone,
                    email: formData.email,
                    address1: formData.address1,
                    address2: formData.address2,
                })
            });

            if (!response.ok) throw new Error('Failed to save card');

            const savedCard = await response.json()

            setSaveMessage('Card saved successfully!');
            setTimeout(() => {
                setSavedMessage('');
                clearInput();
            }, 2000);
        } catch (error) {
            console.error('Save error:', error);
            setSaveMessage('Error saving card: ' + error.message);
        }
    };  
    
    /*Fields for the card a user creates*/
    const cardFields = [
        {name: "name", type: "text", placeholder: "Name", required: true},
        { name: "phone", type: "text", placeholder: "Phone Number", required: false },
        { name: "email", type: "text", placeholder: "E-Mail", required: false },
        { name: "address1", type: "text", placeholder: "Address Line 1", required: false },
        { name: "address2", type: "text", placeholder: "Address Line 2", required: false }     
    ];

    return(
        <div>
            <div id="create-form">
                {/*Reusable form component used for create page*/}
                <FormComponent
                title="Enter Information Below"
                fields={cardFields}
                formData={formData}
                handleChange={handleChange}
                onSubmit={handleSaveCard}
                submitLabel="Save Card"
                showClearButton={true}
                onClear={clearInput}
                isDisabled={!userId || emptyFields}
                />
                    {/*Message that displays when saving card*/}
                    {saveMessage && (
                    <p>
                        {saveMessage}
                    </p> 
                    )}   

                {/*Default message if there is no user created*/}
                {!userId && (
                    <p>Please create a user account to save cards</p>
                )}

                <CardPreview data={formData} isDisabled={emptyFields}/>
            </div>
        </div>
    )
}

export default CardCreate