import React from 'react';
import { useState } from 'react';
import '../../css/postBox.css';
import dogImage from '../../image/white-dog-names-1-modified.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faImage, faFaceSmile, faLocationDot, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../Authentication_Context/Auth_Provider";



function CreatePostBox({showCreatePostBox, closeCreatePostBox}){
    const {user} = useAuth();
    console.log(user);

        // Add state for the form inputs
    const [statement, setStatement] = useState('');
    const [accessRight, setAccessRight] = useState('public');
    const [numberOfReaction, setNumberOfReaction] = useState(0);
    const [numberOfComment, setNumberOfComment] = useState(0);

    // Function to handle post submission
    const handleSubmit = async () => {
        if (!statement.trim()) {
          alert("Please write something to post.");
          return;
        }
      
        const postData = {
          content: statement,            // Maps to "content" in the backend
          post_access_right: accessRight, // Maps to "post_access_right"
          user: user.id,                   // Use user ID for the reference
          numberOfReaction: numberOfReaction,  
          numberOfComment: numberOfComment             
        };
      
        try {
          const response = await fetch('http://localhost:3000/api/posts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
          });
      
          if (response.ok) {
            // Handle successful post creation, clear the form and close the box
            setStatement('');
            setAccessRight('public');
            setNumberOfReaction(0);
            setNumberOfComment(0);
            closeCreatePostBox();
            console.log('Post created successfully');
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
                    <button style={{ backgroundColor: "transparent", border: "none" }} onClick={closeCreatePostBox}> <FontAwesomeIcon icon={faCircleXmark} /></button>
                 </div>
             </div>

             <div className='row'>
                 <div className='col-1 add-margin-right'>
                     <img className='avatar' src={dogImage} alt='avatar'/>
                 </div>
                 <div className='col-6'>
                     <h2>{user.userName}</h2>
                     <select id = "accessRight" name="accessRight" value={accessRight} onChange={(e) => setAccessRight(e.target.value)}>
                         <option value="public">Public</option>
                         <option value="friend">Friend</option>
                         <option value="private">Private</option>
                     </select>
                 </div>
             </div>

             <div className='row'>
                 <div className='text-area-div'>
                     <textarea className='text-area' placeholder='What are you thinking?' id="statement" name='statement' value={statement} onChange={(e) => setStatement(e.target.value)} cols="65" rows="2" ></textarea>
                 </div>
             </div>
             
             <div className='row'>
                 <div className='col-6'></div>
                 <div className='col-6'>
                     <nav className="nav add-border nav-insert-buttons" >
                         <a className=" icon-color" href="#"><FontAwesomeIcon icon={faImage}/></a>
                         <a className="icon-color" href="#"><FontAwesomeIcon icon={faFaceSmile} /></a>
                         <a className="icon-color" href="#"><FontAwesomeIcon icon={faLocationDot} /></a>
                         <a className="icon-color" href="#"><FontAwesomeIcon icon={faEllipsis} /></a>
                         <button type='button' className='custom-post-button' onClick={handleSubmit}>Post</button>                
                     </nav>
                 </div>

             </div>
              
         </div>
        )}
           
        </>
    )
}

export default CreatePostBox;