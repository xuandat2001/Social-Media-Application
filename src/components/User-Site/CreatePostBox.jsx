import React from 'react';
import '../../css/postBox.css';
import dogImage from '../../image/white-dog-names-1-modified.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faImage, faFaceSmile, faLocationDot, faEllipsis } from "@fortawesome/free-solid-svg-icons";


function CreatePostBox(){
    return (
        <>
            <div className="container custom-container">
                
                <div className="row headerBox add-border-bottom">
                    <div className='col-11'>
                        <strong>Create Post</strong>
                    </div>
                    <div className='col-1'>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </div>
                </div>

                <div className='row'>
                    <div className='col-1 add-margin-right'>
                        <img className='avatar' src={dogImage} alt='avatar'/>
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
                        <textarea className='text-area' placeholder='What are you thinking?' id="statement" name='statement' cols="65" rows="2" ></textarea>
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
                            <button type='button' className='custom-post-button'>Post</button>                
                        </nav>
                    </div>

                </div>
                 
            </div>
        </>
    )
}

export default CreatePostBox;