import React from "react";
import '../../css/Post.css'
import dogImage from '../../image/white-dog-names-1-modified.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

function SharePost(){
    return(
            <>
            <div className="container custom-container">
                
                <div className="row header add-border-bottom">
                    <div className='col-11'>
                        <strong>Share Post</strong>
                    </div>
                    <div className='col-1'>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </div>
                </div>

                <div className='row'>
                    <div className='col-1 add-margin-right'>
                        <img className='avatar' src={dogImage} alt="avatar" />
                    </div>
                    <div className='col-6'>
                        <h2>Quang Huy</h2>
                        <select id = "accessRight" name="accessRight">
                            <option value="public">Public</option>
                            <option value="friend">Friend</option>
                            <option value="private">Private</option>
                        </select>
                    </div>
                </div>

                <div className='row'>
                    <div className='text-area-div'>
                        <textarea className='text-area' placeholder='Say something about this content...' id="statement" name='statement' cols="65" rows="2" ></textarea>
                    </div>
                </div>
                
                <div className='row'>
                    <div className="custom-share-button-container">  
                            <button type='button' className='custom-share-button'>Share Now</button>                
                    </div>
                </div>
                 
            </div>
        </>
    )
}


export default SharePost