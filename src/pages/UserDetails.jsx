
import { useSelector } from 'react-redux'

export function UserDetails() {
    const user = useSelector((storeState) => storeState.userModule.loggedinUser)

    return (
        <section className="user-details-page">
        <div className="user-details-container">
            <div className="user-avatar">
                <img src="avatar.jpg" alt="User Avatar" />
            </div>
            <div className="user-info">
                <h1 id="user-name">{user.username}</h1>
                <p><strong>Full Name:</strong> <span id="user-email">{user.fullname}</span></p>
                <p><strong>Reviews:</strong> <span id="user-reviews">{(user.reviews) ? user.reviews : 'None Yet!'}</span></p>
            </div>
        </div>
    </section>
    )
}