import likeIcon from '../image/like.jpg';
import sadIcon from '../image/sad.png';
import heartIcon from '../image/heart.jpg';
import angryIcon from '../image/angry.png';
import '../css/reaction.css';
function Reaction({ showReactions }) {
    return(
        <>
        {showReactions && (
                <div className="reaction-icon">
                    <div className="row">
                        <div className="col-3">
                            <button className='button-reaction'>
                                <img src = {likeIcon}/>
                            </button>
                        
                        </div>
                        <div className="col-3">
                            <button className='button-reaction'>
                                <img src = {heartIcon}/>
                            </button>
                        </div>
                        <div className="col-3">
                            <button className='button-reaction'>
                                <img src = {angryIcon}/>
                            </button>
                            
                        </div>
                        <div className="col-3">
                            <button className='button-reaction'>
                                <img src = {sadIcon}/>
                            </button>
                        </div>
                    </div>

                </div>
            )}
        </>
    )
}
export default Reaction;