import React from "react";
import { Redirect } from 'react-router';

export default class ErrorHandler extends React.Component {
	constructor(props) {
		super(props)
		this.state = { 
			errorOccurred: false
		}
	}

	componentDidCatch(error, info) {
		this.setState({ errorOccurred: true });
	}

	render() {
		let { errorOccurred } = this.state;
		return errorOccurred ? (
			<Redirect 
				to={{
					pathname: "/errors",
					state: { 
						error: "500", 
						info: "Um erro inesperado ocorreu.", 
						to: window.location.pathname 
					}
				}}
			/> 
		) : (
			this.props.children
		)
	}
}