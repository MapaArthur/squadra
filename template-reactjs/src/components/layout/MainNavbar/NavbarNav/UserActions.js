import React from "react";
import { Link } from "react-router-dom";
import {
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Collapse,
	NavItem,
	NavLink
} from "shards-react";
import {Cookies} from '../../../../module/';

export default class UserActions extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			visible: false,
			loginData: null			
		};

		this.toggleUserActions = this.toggleUserActions.bind(this);
	}

	toggleUserActions() {
		this.setState({visible: !this.state.visible});
	}
	
	logout(){
		Cookies.removeCookie(Cookies.LOGIN_DATA);
		window.location.reload();
	}

	UNSAFE_componentWillMount() {
		let ld = Cookies.getCookie(Cookies.LOGIN_DATA, Cookies.LOGIN_DATA_KEY);
		console.log(ld);
		if(ld){
			this.setState({loginData: ld});  
		} else{
			Cookies.removeCookie(Cookies.LOGIN_DATA);
		}    
	}

	render() {
		return (
			<NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
				<DropdownToggle caret tag={NavLink} className="text-nowrap border-left px-3">
					<img
						className="user-avatar rounded-circle mr-1"       
						style={{objectFit: 'cover'}}                                        
						src={'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'}
						alt="User Avatar"
						height="40px"
						width="40px"
					/>		
					{this.state.loginData && <span className="d-none d-md-inline-block"> {this.state.loginData.usernameUser}</span>}
				</DropdownToggle>
				<Collapse tag={DropdownMenu} right small open={this.state.visible}>
					<DropdownItem className="text-danger" onClick={this.logout}>
						<i className="material-icons text-danger">&#xE879;</i> Logout
					</DropdownItem>
				</Collapse>
			</NavItem>
		);
	}
}
