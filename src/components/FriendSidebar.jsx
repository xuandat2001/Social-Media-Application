import '../css/FriendSidebar.css'
import testImage from '../image/Screenshot 2024-08-12 000128.png'
const FriendSidebar = () => (
    <>
        <div className="friend-sidebar">
            <h2>Contacts</h2>
            <ul>
                <p className='friend'><img className="avatar me-3" src={testImage} alt="User avatar" />Friend 1</p>
                <p className='friend'><img className="avatar me-3" src={testImage} alt="User avatar" />Friend 2</p>
                <p className='friend'><img className="avatar me-3" src={testImage} alt="User avatar" />Friend 3</p>
            </ul>
        </div>
    </>
)

export default FriendSidebar