import { useState } from 'react';
import '../css/createGroupBox.css';
import Kaido from '../image/download.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from '../Authentication_Context/Auth_Provider';

function CreateGroupBox({ showCreateGroupBox, onClose }) {
    const [groupName, setGroupName] = useState('');
    const [groupType, setGroupType] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const { user } = useAuth();  // User is the person creating the request

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);  // Store the file object instead of the URL
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('group_name', groupName);
        formData.append('group_access_right', groupType);
        formData.append('user_id', user.id);
        
        if (selectedImage) {
            formData.append('groupPicture', selectedImage);  // Append the actual image file
        }
        
        try {
            console.log([...formData]);  // Log the entries of the FormData for debugging
            const response = await fetch('http://localhost:3000/api/group-requests', {
                method: 'POST',
                body: formData,
            });
    
            if (response.ok) {
                const data = await response.json();
                alert('Group creation request sent successfully!');
            } else {
                const errorData = await response.json();
                console.error('Error:', errorData);
                alert('Failed to send group request.');
            }
        } catch (err) {
            console.error('Error:', err);
            alert('Network error.');
        }
    };
    

    return (
        <>
            {showCreateGroupBox && (
                <div className='containerCreateGroupBox'>
                    <div className='createGroupBoxHeader'>
                        <div className='row'>
                            <div className='col-11'>
                                <h2>Request to Create Group</h2>
                            </div>
                            <div className='col-1'>
                                <button onClick={onClose}>
                                    <FontAwesomeIcon icon={faCircleXmark} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className='admin-info'>
                        <img src={Kaido} className='avatar' alt="avatar user" />
                        <h3>{user.name} (Requestor)</h3>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* Group Name Input Field */}
                        <div className="mb-3">
                            <label htmlFor="groupName" className="form-label">Group Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="groupName"
                                placeholder="Enter group name"
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                                required
                            />
                        </div>

                        {/* Group Type Dropdown */}
                        <div className="mb-3">
                            <label htmlFor="groupType" className="form-label">Group Type</label>
                            <select
                                className="form-select"
                                id="groupType"
                                value={groupType}
                                onChange={(e) => setGroupType(e.target.value)}
                                required
                            >
                                <option value="" disabled>Select group type</option>
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                            </select>
                        </div>

                        {/* Image Upload */}
                        <div className="mb-3">
                            <label htmlFor="groupImage" className="form-label">Group Image</label>
                            <input
                                type="file"
                                className="form-control"
                                id="groupImage"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                            {selectedImage && (
                                <div className="mt-3">
                                    <img src={selectedImage} alt="Selected" className="preview-img" />
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="btn btn-primary">Send Group Request</button>
                    </form>
                </div>
            )}
        </>
    );
}

export default CreateGroupBox;
