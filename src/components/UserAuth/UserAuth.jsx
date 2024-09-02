
import { useNavigate } from "react-router-dom"

const UserAuth = () => {

    const navigate = useNavigate();

    const authClick = () => {
        navigate('/signin');
    }

    return (
        <div>
            <button type="button" onClick={authClick}>Sign in</button>
        </div>
    )
}

export default UserAuth
