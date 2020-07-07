import React from "react";
import { Redirect } from 'react-router';

import {Cookies} from '../module/';

export default class LoginHandler extends React.Component {
    constructor(props) {
		super(props)
		this.state = { 
            logged: false 
        }
    }
  
    UNSAFE_componentWillMount() {
        let ld = Cookies.getCookie(Cookies.LOGIN_DATA, Cookies.LOGIN_DATA_KEY);
        if(ld){
            this.setState({logged: true})
        } else{
            Cookies.removeCookie(Cookies.LOGIN_DATA);
        }    
    }
  
    render() {
      	return this.state.logged ? this.props.children : <Redirect to="/login"/>
    }
}