import React from "react";
import { Nav } from "shards-react";

import SidebarNavItem from "./SidebarNavItem";
import { Store } from "../../../flux";

class SidebarNavItems extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			navItems: Store.getSidebarItems(),
			menuText: Store.getSidebarTextState()
		};

		this.onChange = this.onChange.bind(this);
	}

	UNSAFE_componentWillMount() {
		Store.addChangeListener(this.onChange);
	}

	componentWillUnmount() {
		Store.removeChangeListener(this.onChange);
	}

	onChange() {
		this.setState({
			...this.state,
			navItems: Store.getSidebarItems(),
			menuText: Store.getSidebarTextState()
		});
	}

	render() {
		const { navItems: items } = this.state;
		return (
			<div className="nav-wrapper">
				<Nav className="nav--no-borders flex-column">
				{items.map((item, idx) => (
					<SidebarNavItem key={idx} navItem={item} menuText={this.state.menuText}/>
				))}
				</Nav>
			</div>
		)
	}
}

export default SidebarNavItems;