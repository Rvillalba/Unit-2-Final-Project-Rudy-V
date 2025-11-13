import { useState, useEffect, useRef } from "react";
import Button from "./Button";
import html2canvas from "html2canvas";

const CardWallet = () => {
    const [savedCards, setSavedCards] = useState([]);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [editingCard, setEditingCard] = useState(null);
    const [editFormData, setEditFormData] = useState({});
    const cardRefs = useRef({});

    /*This React hook is used to check local storage for a created user*/
    useEffect(() => {
        const existingUserId = localStorage.getItem('userId');
        if (existingUserId) {
            setUserId(existingUserId);
            fetchSavedCards(existingUserId);
        } else {
            setLoading(false);
        }
    }, []);

    /*This variable and try/catch block looks for the user id to pull the appropriate cards (GET request)*/
    const fetchSavedCards = async (userId) => {
        try {
            const response = await fetch(`http://localhost:8080/users/${userId}/cards`);
            if (!response.ok) throw new Error('Failed to fetch cards');
            
            const userCards = await response.json();
            setSavedCards(userCards);

        } catch (error) {
            setMessage('Error loading cards: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    /*This variable and try/catch block is used for the DELETE request*/
    const handleDelete = async (cardId) => {
        if (!window.confirm('Are you sure you want to delete this card?')) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/saved-cards/delete/${cardId}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) throw new Error('Failed to delete card');
            
            setSavedCards(savedCards.filter(card => card.id !== cardId));
            setMessage('Card deleted successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            setMessage('Error deleting card: ' + error.message);
        }
    };
    /*This event handler is used for the Edit button*/
    const handleEditClick = (card) => {
        setEditingCard(card.id);
        setEditFormData({
            name: card.name,
            email: card.email,
            phoneNumber: card.phoneNumber,
            address1: card.address1 || '',
            address2: card.address2 || ''
        });
    };

    const handleEditChange = (e) => {
        setEditFormData({
            ...editFormData,
            [e.target.name]: e.target.value
        });
    };

    /*This variable and try/catch block is for the PUT Request */
    const handleUpdate = async (cardId) => {
        try {
            const response = await fetch(`http://localhost:8080/saved-cards/${cardId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: parseInt(userId),
                    name: editFormData.name,
                    email: editFormData.email,
                    phoneNumber: editFormData.phoneNumber,
                    address1: editFormData.address1,
                    address2: editFormData.address2
                })
            });

            if (!response.ok) throw new Error('Failed to update card');
            
            const updatedCard = await response.json();
            setSavedCards(savedCards.map(card => 
                card.id === cardId ? updatedCard : card
            ));
            setEditingCard(null);
            setMessage('Card updated successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            setMessage('Error updating card: ' + error.message);
        }
    };

   /*This React hook and code is used for the download function for the cards*/
    const handleDownload = (cardId) => {
        const elementRef = cardRefs.current[cardId];
        if (!elementRef) return;

        html2canvas(elementRef).then(canvas => {
            const dataUrl = canvas.toDataURL('image/png');
            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = "calling-card.png";
            link.click();
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    /*This is the default state if the user does not create an account and navigates to the wallet page*/
    if (!userId) {
        return (
            <div className="card-wallet-no-account">
                <h2>No User Account</h2>
                <p>Please create a user account first to view saved cards.</p>
            </div>
        );
    }

    /*This creates the containers for the saved cards and has a default message if no card has been saved */
    return (
        <div className="card-wallet-container">
            <h1>My Saved Cards</h1>
            
            {message && (
                <p className={`card-wallet-message ${message.includes('Error') ? 'error' : 'success'}`}>
                    {message}
                </p>
            )}

            {savedCards.length === 0 ? (
                <p>No saved cards yet. Create and save your first card!</p>
            ) : (
                <div className="card-wallet-grid">
                    {savedCards.map((card) => (
                        <div key={card.id} className="card-wallet-item">
                            {editingCard === card.id ? (
                                /*This div is for the edit fields*/
                                <div className="card-wallet-edit-form">
                                    <h3>Edit Card</h3>
                                    <input
                                        type="text"
                                        name="name"
                                        value={editFormData.name}
                                        onChange={handleEditChange}
                                        placeholder="Name"
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        value={editFormData.email}
                                        onChange={handleEditChange}
                                        placeholder="Email"
                                    />
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={editFormData.phoneNumber}
                                        onChange={handleEditChange}
                                        placeholder="Phone"
                                    />
                                    <input
                                        type="text"
                                        name="address1"
                                        value={editFormData.address1}
                                        onChange={handleEditChange}
                                        placeholder="Address Line 1"
                                    />
                                    <input
                                        type="text"
                                        name="address2"
                                        value={editFormData.address2}
                                        onChange={handleEditChange}
                                        placeholder="Address Line 2"
                                    />
                                    {/*This is the resuable Button used for the save button*/}
                                    <div className="card-wallet-edit-buttons">
                                        <Button
                                            label="Save"
                                            onClick={() => handleUpdate(card.id)}
                                        />
                                        {/*This is the resuable Button used to cancel changes*/}
                                        <Button
                                            label="Cancel"
                                            onClick={() => setEditingCard(null)}
                                        />
                                    </div>
                                    {/*This is a ternary operator to render a div accordingly*/}
                                </div>) : (
                                    
                                    <div>
                                    
                                    <div 
                                        id="business-card"
                                        ref={(el) => cardRefs.current[card.id] = el}
                                    >
                                        <p>{card.name}</p>
                                        <p>{card.phoneNumber}</p>
                                        <p>{card.email}</p>
                                        <p>{card.address1}</p>
                                        <p>{card.address2}</p>
                                    </div>
                                    
                                    <div className="card-wallet-button-group">
                                        {/*These are the edit, delete, and download button from the Button component*/}
                                        <Button
                                            label="Edit"
                                            onClick={() => handleEditClick(card)}
                                        />
                                        <Button
                                            label="Delete"
                                            onClick={() => handleDelete(card.id)}
                                        />
                                        <Button
                                            label="Download"
                                            onClick={() => handleDownload(card.id)}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CardWallet;