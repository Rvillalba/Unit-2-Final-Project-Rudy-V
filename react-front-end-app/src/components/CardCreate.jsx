import { useParams } from "react-router-dom";
import CardPreview from "./CardPreview";
import Button from "./Button";
import useEventHandler from "./eventHandler";

const CardCreate = () => {
    
    const { create }=useParams();
    /*This part of the code uses the eventHandler component*/
    const {formData, handleChange, clearInput} = useEventHandler();
    /*This code checks the values of the input fields. This part is important
    to disable the download button if there is a blank field*/
    const emptyFields = Object.values(formData).every(value => value.trim() === "");
    return(       
        <div>
            {/*This is the form used to populate the live preview*/}
            <div id="create-form">
                <h1 id="create-title">Enter Information Below</h1>            
                    <form id="form">
                        <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Name" /> <br/>
                        <input id="phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="Phone Number" /> <br/>
                        <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="E-Mail" /> <br/>
                        <input id="address1" type="text" name="address1" value={formData.address1} onChange={handleChange} placeholder="Address Line 1" /> <br/>
                        <input id="address2" type="text" name="address2" value={formData.address2} onChange={handleChange} placeholder="Address Line 2" /> <br/>
                        <Button id="btn" label="Clear All Fields" onClick={clearInput} />
                    </form>
                {/*This is the child component that shows what the card looks like*/}
                <CardPreview data={formData} isDisabled={emptyFields}/>  
            </div>
            <div>
            </div>
        </div>
    )
}

export default CardCreate