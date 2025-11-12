import { useState } from "react";

const eventHandler = () => {
    const [formData, setFormData] = useState({
        name:"",
        phone:"",
        email:"",
        address1:"",
        address2:"",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
    } 
    /*Handles change in inputs*/
    const handleChange = (e) => {
        const { name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    /*Handles the clear input button*/
    const clearInput = () => {
        setFormData({
        name:"",
        phone:"",
        email:"",
        address1:"",
        address2:"",
        });
    };
        return {formData, handleSubmit, handleChange, clearInput}
}

export default eventHandler