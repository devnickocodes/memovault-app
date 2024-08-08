import React from 'react'
import styles from "../../styles/Profile.module.css"
import { Link } from 'react-router-dom'
import Avatar from "../../components/Avatar"
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import { Button } from 'react-bootstrap'

const Profile = (props) => {

    const {profile, mobile} = props
    const {id, following_id, image, owner, is_owner} = profile
    const currentUser = useCurrentUser()
    
  return (
    <div className={`d-flex align-items-center ${mobile && 'flex-column'} ${!mobile && 'my-3'}`}>
        <div>
            <Link className="align-self-center" to={`/profiles/${id}/`}>
                <Avatar src={image} />
            </Link>
        </div>
        <div>
            <p>{owner}</p>
        </div>
        <div className={`text-right ${!mobile && 'ml-auto'}`}>
            {!mobile && currentUser && !is_owner && (
                following_id ? (
                    <Button
                    onClick={() => {}}
                    >Unfollow</Button>
                ) : (
                    <Button
                    onClick={() => {}}
                    >Follow</Button>
                )
            )}
        </div>
    </div>
  )
}
export default Profile