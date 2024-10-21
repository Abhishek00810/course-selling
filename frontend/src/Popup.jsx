import React from 'react';
import './Popup.css'; // Assuming we will have some styles for the popup

const Popup = ({ show, onClose, children }) => {
    if (!show) {
        return null; // Don't render anything if `show` is false
    }
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                {children}
            </div>
        </div>
    );
};

export default Popup;
