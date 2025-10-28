/*Resuable button*/
const Button = ({id, label, onClick, disabled = false}) => {
    return (
        <button id={id} onClick={onClick} disabled = {disabled}>
            {label}
        </button>
    )
}
export default Button