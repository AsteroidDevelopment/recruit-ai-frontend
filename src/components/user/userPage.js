import React from 'react'
import TextOutput from '../shared/textOutput'
import axios from 'axios'
import api from '../../helpers/api'

class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {}
        }
    }

    componentDidMount = () => {
      //${this.props.match.params.id}
        axios
            .get(api.userPath(`/profile/${this.props.match.params.id}`))
            .then(res =>
              this.setState({user: res.data})
            )
            .catch(err => console.log(err) );
    }

    render() {
        const user = this.state.user
        return <div className="tpBlackBg">
          <h2>{user.username}</h2>
          <p>{['', 'User', 'Mod', 'Admin'][user.user_role]}</p>
        </div>
    }
}

export default Page
