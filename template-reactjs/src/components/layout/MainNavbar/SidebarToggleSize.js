import React from "react";

import { Dispatcher, Constants } from "../../../flux";

export default class SidebarToggleSize extends React.Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		Dispatcher.dispatch({
			actionType: Constants.TOGGLE_SIDEBAR_TEXT
		});
	}

	render() {
		return (
			<nav className="nav d-none d-md-inline">
				{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
				<a href="#" onClick={this.handleClick} className="nav-link nav-link-icon toggle-sidebar text-center">
					<i className="material-icons">&#xE5D2;</i>
				</a>
			</nav>
		)
	}
}