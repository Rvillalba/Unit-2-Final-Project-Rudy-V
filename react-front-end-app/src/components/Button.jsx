/*Resuable button*/
const Button = ({id, label, onClick, disabled = false, type = "button"}) => {
    return (
        <button id={id} onClick={onClick} disabled = {disabled}>
            {label}
        </button>
    )
}
export default Button