import { useParams } from "react-router-dom";
import CardPreview from "./CardPreview";
import Button from "./Button";
import eventHandler from "./eventHandler";
import FormComponent from "./Form";

const CardCreate = () => {
    
    const { create }=useParams();
    /*This part of the code uses the eventHandler component*/
    const {formData, handleSubmit, handleChange, clearInput} = eventHandler();
    /*This code checks the values of the input fields. This part is important
    to disable the download button if there is a blank field*/
    const emptyFields = Object.values(formData).every(value => value.trim() === "");
    
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
                submitLabel="Create Card"
                showClearButton={true}
                onClear={clearInput}
                isDisabled={emptyFields}
                />

                <CardPreview data={formData} isDisabled={emptyFields}/>
            </div>
        </div>
    )
}

export default CardCreate