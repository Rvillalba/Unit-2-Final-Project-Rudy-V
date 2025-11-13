/*Resuable button. These cover all the parameters each button should need*/
const Button = ({id, label, onClick, disabled = false, type = "button"}) => {
    return (
        <button id={id} 
        onClick={onClick} 
        disabled = {disabled}
        type={type}
        style={{
            opacity: disabled ? 0.5 : 1,
            cursor: disabled ? 'not-allowed' : 'pointer'
        }}
        >
            {label}
        </button>
    )
}
export default Button