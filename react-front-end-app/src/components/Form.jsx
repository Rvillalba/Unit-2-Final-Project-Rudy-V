import React from "react";
import Button from "./Button";

/*Resuable Form component for user create and card create or edit*/
const FormComponent = ({
    fields,
    formData,
    handleChange,
    onSubmit,
    submitLabel = "Submit",
    showClearButton = false,
    onClear,
    title,
    isDisabled = false
}) => {
    return (
        <div>
            {title && <h1 id="create-title">{title}</h1>}
            <form id="form" onSubmit={onSubmit}>
                {fields.map((field) => (

                    /*This is a React fragment which keeps the code from creating another DOM element*/
                    <React.Fragment key={field.name}>
                        <input
                            id={field.name}
                            type={field.type}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            required={field.required}
                            placeholder={field.placeholder}
                        />
                        <br/>
                    </React.Fragment>
                ))}

                {/*These are submit and clear buttons from the Button Component*/}
                <Button
                    id="submit-btn"
                    label={submitLabel}
                    type="submit"
                    disabled={isDisabled}
                    />
                {showClearButton && (
                    <Button
                    id="clear-btn"
                    label="Clear All Fields"
                    onClick={onClear}
                    type="button"
                    />
                )}
            </form>
        </div>
    )
}

export default FormComponent