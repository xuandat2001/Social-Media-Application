
import { useState } from 'react';
import '../css/createGroupBox.css';
import Kaido from '../image/download.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";


function CreateGroupBox({showCreateGroupBox, onClose}){
    const [groupName, setGroupName] = useState('');
    const [groupType, setGroupType] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // You can handle the form submission logic here
      console.log(`Group Name: ${groupName}, Group Type: ${groupType}`);
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
                                <img src = {Kaido} className='avatar' alt = "avatar user"/>
                                <h3>Kaido (admin)</h3>
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
            
                                {/* Submit Button */}
                                <button type="submit" className="btn btn-primary">Create Post</button>
                            </form>
                        </div>
            )}

        </>
    )
}

export default CreateGroupBox;