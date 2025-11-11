import React from "react";
import Button from "./Button";

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

                <Button
                    id="submit-btn"
                    label={submitLabel}
                    type="submit"
                    disbaled={isDisabled}
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