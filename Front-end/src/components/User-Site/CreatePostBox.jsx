import React, { useState } from 'react';
import '../../css/postBox.css';
import dogImage from '../../image/white-dog-names-1-modified.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faImage } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../Authentication_Context/Auth_Provider";

function CreatePostBox({ showCreatePostBox, closeCreatePostBox }) {
    const { user } = useAuth();

    const [statement, setStatement] = useState('');
    const [accessRight, setAccessRight] = useState('public');
    const [numberOfReaction, setNumberOfReaction] = useState(0);
    const [numberOfComment, setNumberOfComment] = useState(0);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    const handleSubmit = async () => {
        if (!statement.trim()) {
            alert("Please write something to post.");
            return;
        }

        const postData = new FormData();
        postData.append('content', statement);
        postData.append('post_access_right', accessRight);
        postData.append('user', user.id);
        postData.append('numberOfReaction', numberOfReaction);
        postData.append('numberOfComment', numberOfComment);
        if (selectedImage) {
            postData.append('imageHash', selectedImage);
        }

        try {
            const response = await fetch('http://localhost:3000/api/posts', {
                method: 'POST',
                body: postData,  // Use FormData to send the request
            });

            if (response.ok) {
                setStatement('');
                setAccessRight('public');
                setNumberOfReaction(0);
                setNumberOfComment(0);
                setSelectedImage(null);
                closeCreatePostBox();
                alert('Post created successfully');
            } else {
                console.error('Failed to create post');
            }
        } catch (error) {
            console.error('Error submitting post:', error);
        }
    };

    return (
        <>
            {showCreatePostBox && (
                <div className="container custom-container">
                    <div className="row headerBox add-border-bottom">
                        <div className='col-11'>
                            <strong>Create Post</strong>
                        </div>
                        <div className='col-1'>
                            <button style={{ backgroundColor: "transparent", border: "none" }} onClick={closeCreatePostBox}>
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </button>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-1 add-margin-right'>
                            <img className='avatar' src={`data:image/png;base64,${user.userAvatar}`} alt='avatar' />
                        </div>
                        <div className='col-6'>
                            <h2>{user.userName}</h2>
                            <select id="accessRight" name="accessRight" value={accessRight} onChange={(e) => setAccessRight(e.target.value)}>
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                            </select>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='text-area-div'>
                            <textarea className='text-area' placeholder='What are you thinking?' id="statement" name='statement' value={statement} onChange={(e) => setStatement(e.target.value)} cols="65" rows="2"></textarea>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-6'></div>
                        <div className='col-6'>
                            <nav className="nav add-border nav-insert-buttons">
                                <label className="icon-color" style={{ cursor: 'pointer' }}>
                                    <FontAwesomeIcon icon={faImage} />
                                    <input 
                                        type="file" 
                                        style={{ display: 'none' }} 
                                        onChange={handleImageUpload} 
                                        accept="image/*"
                                    />
                                </label>
                                <button type="button" className="custom-post-button" onClick={handleSubmit}>Post</button>
                            </nav>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default CreatePostBox;
