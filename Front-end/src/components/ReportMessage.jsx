import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

function MessageInput({ onClose }) {
    const [message, setMessage] = useState("");

    const handleSend = () => {
        if (message.trim()) {
            console.log("Message sent:", message);
            setMessage(""); // Clear input after sending
        }
    };

    return (
        <div className="container mt-3">
            <div className='row'>
                <div className='col-11'>
                    <h2>Report Detail</h2>
                </div>
                <div className='col-1'>
                    <button className="btn" onClick={onClose}>
                        <FontAwesomeIcon icon={faCircleXmark} size="lg" />
                    </button>
                </div>
            </div>
            


            {/* Message Input and Send Button Row */}
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Write your message"/>
                <button class="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
            </div>
        </div>
    );
}

export default MessageInput;
