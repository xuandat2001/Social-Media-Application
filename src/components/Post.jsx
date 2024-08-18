import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear,faThumbsUp,faShare,faComment } from '@fortawesome/free-solid-svg-icons';
import '../css/post.css';
function Post ({avatar,userName,content,logo, image,numberOfReaction, numberOfComment}){
    return (
        <>
            <div className="container container-post">
                <div className="row">

                    <div className="col-11 d-flex align-items-center">
                        <img className="avatar me-3" src={avatar} alt="User avatar" />
                        <div className="post-info">
                            <h3>{userName}</h3>
                            <p className="time-post"><span className="authorization-icon">{logo}</span>1p</p>
                        </div>
                    </div>
                    <div className="col-1">
                        <button className="btn float-end"><FontAwesomeIcon icon={faGear} /></button>
                    </div>
                </div>
                <div className='row'>
                    <div className='post-content'>
                        <p>{content}</p>
                    </div>
                </div>
                <div className='row'>
                    <div className='post-image '>
                        <img className="main-image d-block mx-auto rounded-circle" src={image} alt="User Content image" />
                    </div>
                </div>
                <div className='row number-of-interaction'>
                    <div className='col-6'>
                        <p><FontAwesomeIcon icon={faThumbsUp} />{numberOfReaction} likes</p>
                    </div>
                    <div className='col-6'>
                        <p className='number-comment float-end'>{numberOfComment} comments</p>
                    </div>
                    
                </div>
                <div className='line '></div>
                <div className='row reaction justify-content-between'>
                    <div className='col-4 d-flex justify-content-start'>
                        <button><FontAwesomeIcon icon={faThumbsUp} /> Likes</button>
                    </div>
                    <div className='col-4 d-flex justify-content-center'>
                        <button><FontAwesomeIcon icon={faComment} /> Comment</button>
                    </div>
                    <div className='col-4 d-flex justify-content-end'>
                        <button><FontAwesomeIcon icon={faShare} /> Share</button>
                    </div>
                </div>


            </div>
        </>
    )
}
export default Post;