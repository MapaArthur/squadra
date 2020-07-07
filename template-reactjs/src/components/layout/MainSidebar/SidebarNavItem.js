import React from "react";
import { NavLink as RouteNavLink } from "react-router-dom";
import { NavItem, NavLink, Collapse } from "shards-react";

export default class SidebarNavItem extends React.Component {
	constructor(props) {
		super(props);  

		this.state = { 
			collapse: false
		};

		this.toggle = this.toggle.bind(this);
		this.verifyCollapsed = this.verifyCollapsed.bind(this);
	}

	verifyCollapsed(){    
		if(this.props.navItem.type === "Collapse"){
			this.props.navItem.items.forEach((i) => { 
				if(window.location.pathname === i.to){
					this.setState({ collapse: true });
				}
			})
		}
	}

	toggle() {
		this.setState({ collapse: !this.state.collapse });
	}

	render() {
		if(this.props.navItem.type === "Collapse"){			
			return (			
				<div>
					<NavItem onClick={this.toggle} title={this.props.navItem.title}>
						<NavLink className={`${!this.props.menuText && 'text-center'}`}>
							{this.props.navItem.htmlBefore && (
								<div className="d-inline-block item-icon-wrapper" dangerouslySetInnerHTML={{ __html: this.props.navItem.htmlBefore }} />
							)}
							{this.props.navItem.title && this.props.menuText && (
								<span>{this.props.navItem.title}</span>
							)}
							{this.props.navItem.htmlAfter && (
								<div className="d-inline-block item-icon-wrapper" dangerouslySetInnerHTML={{ __html: this.props.navItem.htmlAfter }} />
							)}
						</NavLink>
					</NavItem>
					<Collapse open={this.state.collapse} >
						{this.props.navItem.items.map((item, index) => (
							<NavItem className="border-left ml-3" key={index} title={item.title}>
								<NavLink tag={RouteNavLink} to={item.to} className={`${!this.props.menuText && 'text-center'}`}>
									{item.htmlBefore && (
										<div className="d-inline-block item-icon-wrapper" dangerouslySetInnerHTML={{ __html: item.htmlBefore }} />
									)}
									{item.title && this.props.menuText && (
										<span>{item.title}</span>
									)}
									{item.htmlAfter && (
										<div className="d-inline-block item-icon-wrapper" dangerouslySetInnerHTML={{ __html: item.htmlAfter }} />
									)}
								</NavLink>  
							</NavItem>       
						))}
					</Collapse>
				</div>
			)
		} else {
			return (
				<NavItem title={this.props.navItem.title}>
					<NavLink tag={RouteNavLink} to={this.props.navItem.to} className={`${!this.props.menuText && 'text-center'}`}>
						{this.props.navItem.htmlBefore && (
							<div className="d-inline-block item-icon-wrapper" dangerouslySetInnerHTML={{ __html: this.props.navItem.htmlBefore }} />
						)}
						{this.props.navItem.title && this.props.menuText && (
							<span>{this.props.navItem.title}</span>
						)}
						{this.props.navItem.htmlAfter && (
							<div className="d-inline-block item-icon-wrapper" dangerouslySetInnerHTML={{ __html: this.props.navItem.htmlAfter }} />
						)}
					</NavLink>
				</NavItem>
			);
		}
	}
}
