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
    const { user } = useAuth();

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Get reqsponse from back-end server
            const responseCreateGroup = await fetch('http://localhost:3000/api/groups', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ groupName, groupType,selectedImage, user }),
              credentials: 'include', // Include cookies for session management
            });
            const responseCreateMemberShip= await fetch('http://localhost:3000/api/groups', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ groupName, groupType,selectedImage, user }),
                credentials: 'include', // Include cookies for session management
              });
      
            // Checking server response
            if (responseCreateGroup.ok) {
              const data = await response.json(); 
              
              alert(data.msg); 
              console.log({id: data.findUser.id, userName: data.findUser.userName, fullName : data.findUser.fullName});
              const group = 
              setUser({ id: data.findUser.id, userName: data.findUser.userName, fullName : data.findUser.fullName });
              console.log(setUser({ id: data.findUser.id, userName: data.findUser.userName, fullName : data.findUser.fullName }));
              navigate('/'); // Redirect to homepage 
            } else {
              const errorData = await response.json();
              console.error('User input Error: ', errorData);
              alert("Incorrect Username or Password, please try again."); //Invalid credentials
            }
          } catch (err) {
            console.error('Internal Error:', err);
            alert("Unable to connect to the server. Please check your network connection."); // Catching server-related errors
          }
    };

    return (
        <>
            {showCreateGroupBox && (
                <div className='containerCreateGroupBox'>
                    <div className='createGroupBoxHeader'>
                        <div className='row'>
                            <div className='col-11'>
                                <h2>Create Group</h2>
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
                        <h3>{user.name} (admin)</h3>
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
                        <button type="submit" className="btn btn-primary">Create Group</button>
                    </form>
                </div>
            )}
        </>
    );
}

export default CreateGroupBox;
