import React from 'react'
import {Link} from 'react-router-dom'

const curr_user = localStorage.user ?  JSON.parse(localStorage.user) : false

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        const user = curr_user
        const info = user.userInfo

        let error = []

        if(info) {
        const basicInfo = info.user_first_name === "" || 
        info.user_last_name === "" || 
        info.user_professional_title === "" ||
        info.user_display_name === "" || 
        (!info.user_first_name || !info.user_display_name || !info.user_display_name || !info.user_professional_title)

        if(basicInfo) {error.push("Please fill out the basic information below.")}

        if(!info.team_id) {error.push("Please either create a team or find yours to join.")}

        if(info.team_id && !info.team_verified) {error.push("Awaiting team verification.")}
        }

        return <div className='tpBlackBg' style={{textAlign:'center'}}>
            <h2>Welcome, {curr_user.username}</h2>

            {error.length > 0 ? <div style={{backgroundColor:"rgba(200,0,0,.5)"}}>{error.map(e => <p>>{e}</p>)} <i>If you have taken care of these and this message still shows, please try refreshing the page.</i></div> : ""}

            { info ? <div>
            <p>{curr_user.userInfo.user_display_name}</p>
            <Link className='nice-button' to="/athletes">Recruits</Link><br />
            <Link className='nice-button' to="/messages">Messages</Link><br />
            <Link className='nice-button' to="/alerts">Alerts</Link><br />
            <Link className='nice-button' to={`/teams/${curr_user.userInfo.team_id}`}>Team</Link><br />
            <Link className='nice-button' to="/visits">Visits</Link><br />
            <Link className='nice-button' to="/users/edit">Edit Profile</Link><br /> </div> : "" }
        </div>
    }
}

export default Profile
