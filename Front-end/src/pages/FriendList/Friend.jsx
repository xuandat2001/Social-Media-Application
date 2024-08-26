import '../../css/friend.css';
function Friend ({avatar, userName, numberOfFriends, onClick}){
    return(
        <>
            
            <div className="friend-box">
                
                <div className="img-representation">
                    <img src = {avatar} alt = "avatar" style={{ width: '100%', height: 'auto' }}/>
                </div>
                <div className="info-user">
                    <h3><a href='#'>{userName}</a></h3>
                    <p>{numberOfFriends} friends</p>
                    <button className='btn btn-danger' onClick={()=>onClick}>Delete</button>
                </div>
            </div>
        </>
    )
}
export default Friend;