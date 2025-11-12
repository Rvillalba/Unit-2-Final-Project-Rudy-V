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
    const [saveMessage, setSavedMessage] = useState('');

    /*Checks for user in storage*/
    useEffect(() => {
        const existingUserId = localStorage.getItem('userId');
        if (existingUserId) {
            setUserId(existingUserId);
        }
    })
    const {formData, handleSubmit, handleChange, clearInput} = eventHandler();
    /*This code checks the values of the input fields. This part is important
    to disable the download button if there is a blank field*/
    const emptyFields = Object.values(formData).every(value => value.trim() === "");

    /*Saves card to database*/
    const handleSavedCard = async () => {
        if (!userId) {
            setSavedMessage('Please create a user account first');
            return;
        }

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

            setSavedMessage ('Card saved successfully!');
            setTimeout(() => setSavedMessage(''), 3000);
        } catch (error) {
            setSavedMessage('Error saving card: ' + error.message);
        }
    }
    
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
                <FormComponent
                title="Enter Information Below"
                fields={cardFields}
                formData={formData}
                handleChange={handleChange}
                onSubmit={handleSubmit}
                submitLabel="Save Card"
                showClearButton={true}
                onClear={clearInput}
                isDisabled={!userId || emptyFields}
                />

                {!userId && (
                    <p>Please create a user account to save cards</p>
                )}

                <CardPreview data={formData} isDisabled={emptyFields}/>
            </div>
        </div>
    )
}

export default CardCreate