import React from 'react';
import { useDispatch } from 'react-redux';
import likeIcon from "../image/like.jpg";
import sadIcon from "../image/sad.png";
import heartIcon from "../image/heart.jpg";
import angryIcon from "../image/angry.png";
import "../css/reaction.css";
import { likeChoice, heartChoice, sadChoice, angryChoice } from '../Redux/ReactionSlice';

function Reaction({ showReactions, setShowReactions }) {
  const dispatch = useDispatch();

  const handleReactionClick = (action) => {
    console.log("Dispatching action:", action.type);
    dispatch(action);
    setTimeout(() => {
      setShowReactions(false);
    }, 200);
     
  };

  return (
    <>
      {showReactions && (
        <div className="reaction-icon">
          <div className="row">
            <div className="col-3">
              <button className="button-reaction"
                      onClick={() => handleReactionClick(likeChoice())}>
                <img src={likeIcon} alt="Like" />
              </button>
            </div>
            <div className="col-3">
              <button className="button-reaction"
                      onClick={() => handleReactionClick(heartChoice())}>
                <img src={heartIcon} alt="Heart" />
              </button>
            </div>
            <div className="col-3">
              <button className="button-reaction"
                      onClick={() => handleReactionClick(angryChoice())}>
                <img src={angryIcon} alt="Angry" />
              </button>
            </div>
            <div className="col-3">
              <button className="button-reaction"
                      onClick={() => handleReactionClick(sadChoice())}>
                <img src={sadIcon} alt="Sad" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Reaction;
