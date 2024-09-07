import '../../css/group-box.css';
import { NavLink } from "react-router-dom";
function GroupBox({avatar,nameGroup,numberOfMembers}){
    return(
        <>
            <div className="group-box">
                
                <div className="img-representation">
                    <img src = {avatar} alt = "avatar" style={{ width: '100%', height: 'auto' }}/>
                </div>
                <div className="info-group">
                    <NavLink>
                        <h3><a href="/group">{nameGroup}</a></h3>
                    </NavLink>
                    
                    <p>{numberOfMembers} members</p>
                    <button className='btn btn-danger' onClick={()=>onClick}>Leave Group</button>
                </div>
            </div>
        </>
    )
}
export default GroupBox;