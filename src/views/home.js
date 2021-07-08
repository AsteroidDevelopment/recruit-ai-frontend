import React from 'react';
import {logoURL} from '../helpers/site'
import {Link} from 'react-router-dom'

function Home(props) {
	const squares = [
		{
			title: "Sign Up",
			link: "/users/register"
		},
		{
			title: "Sign In",
			link: "/users/login"
		},
	]

	return <div style={{border: "1px outset grey", textAlign: 'center', borderRadius: '2px', maxWidth:'800px',margin:'40px auto', backgroundColor: '#fff', padding: '40px'}}>
		
		<div style={{}}><img alt="logo" height="100px" style={{margin:"75px 0 25px"}} src={logoURL} /></div>
		<h2>RecruitAI</h2>
		<hr />
		
			{squares.map(({title, link}) => 
			<span style={{ padding: '0px 20px'}}>
					<Link className="nice-button" to={link}><h3>{title}</h3></Link>
			</span>)}
		<hr />

	</div>
}

export default Home;
