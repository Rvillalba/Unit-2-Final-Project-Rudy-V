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

    useEffect(() => {
        const existingUserId = localStorage.getItem('userId');
        if (existingUserId) {
            setUserId(existingUserId);
            fetchSavedCards(existingUserId);
        } else {
            setLoading(false);
        }
    }, []);

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

    if (!userId) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h2>No User Account</h2>
                <p>Please create a user account first to view saved cards.</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1>My Saved Cards</h1>
            
            {message && (
                <p style={{ 
                    color: message.includes('Error') ? 'red' : 'green',
                    fontWeight: 'bold',
                    marginBottom: '20px'
                }}>
                    {message}
                </p>
            )}

            {savedCards.length === 0 ? (
                <p>No saved cards yet. Create and save your first card!</p>
            ) : (
                <div style={{ display: 'grid', gap: '20px' }}>
                    {savedCards.map((card) => (
                        <div 
                            key={card.id} 
                            style={{ 
                                border: '1px solid #ccc', 
                                padding: '20px', 
                                borderRadius: '8px',
                                backgroundColor: '#f9f9f9'
                            }}
                        >
                            {editingCard === card.id ? (
                                <div>
                                    <h3>Edit Card</h3>
                                    <input
                                        type="text"
                                        name="name"
                                        value={editFormData.name}
                                        onChange={handleEditChange}
                                        placeholder="Name"
                                        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        value={editFormData.email}
                                        onChange={handleEditChange}
                                        placeholder="Email"
                                        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                                    />
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={editFormData.phoneNumber}
                                        onChange={handleEditChange}
                                        placeholder="Phone"
                                        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                                    />
                                    <input
                                        type="text"
                                        name="address1"
                                        value={editFormData.address1}
                                        onChange={handleEditChange}
                                        placeholder="Address Line 1"
                                        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                                    />
                                    <input
                                        type="text"
                                        name="address2"
                                        value={editFormData.address2}
                                        onChange={handleEditChange}
                                        placeholder="Address Line 2"
                                        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                                    />
                                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                        <Button
                                            label="Save"
                                            onClick={() => handleUpdate(card.id)}
                                        />
                                        <Button
                                            label="Cancel"
                                            onClick={() => setEditingCard(null)}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    {/* Card Preview - Styled like CardPreview component */}
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
                                    
                                    <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
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
};

export default CardWallet;