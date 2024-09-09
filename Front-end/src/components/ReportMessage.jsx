import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../Authentication_Context/Auth_Provider';
function MessageInput({ onClose, postId}) {
    const {user} = useAuth();
    const [message, setMessage] = useState("");

    const handleSend = async () => {
        if (message.trim()) {
            // Send the report details to the server
            try {
                const response = await fetch(`http://localhost:3000/report-post/${postId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        reportReason: message,
                        reportedBy: user.id, // Pass the user ID of the person reporting the post
                    }),
                });

                if (response.ok) {
                    alert("Post reported successfully");
                    setMessage(""); // Clear input after sending
                    onClose(); // Close the report message box after success
                } else {
                    console.error("Error reporting post");
                }
            } catch (error) {
                console.error("Error:", error);
            }
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
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Write your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={handleSend}
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default MessageInput;
