import React from 'react';
import './App.scss';


import Helmet from 'react-helmet'
import Header from './pageComponents/header';
import Body from './pageComponents/body';
import Footer from './pageComponents/footer';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {},
			token: null
		};
	}

	logout = () => {
		localStorage.setItem('user', null);
		localStorage.setItem('token', null);
		this.setState({ user: {}, token: null });
		window.location.replace('/?loggedIn=false');
	};

	login = (user, token) => {
		localStorage.setItem('user', JSON.stringify(user));
		localStorage.setItem('token', token);
		this.setState({ user, token });
		this.forceUpdate();
	};

	render() {
		return (
			<div className="App main-bg">
				<Header auth={{ curr_user: this.state, logout: this.logout, login: this.login }} />

				<div className="main-screen">
					<Helmet>
                		<title>{`RecruitAI- For Coaches & Recruiters- Track & Message Athletes`}</title>
        			</Helmet>
					<Body auth={{ curr_user: this.state, logout: this.logout, login: this.login }} />
					
				</div>
			</div>
		);
	}
}

export default App;
