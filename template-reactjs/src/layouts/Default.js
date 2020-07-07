import React from "react";
import './Default.css';
import PropTypes from "prop-types";
import classNames from "classnames";
import { Container, Row, Col } from "shards-react";

import MainNavbar from "../components/layout/MainNavbar/MainNavbar";
import MainSidebar from "../components/layout/MainSidebar/MainSidebar";
import MainFooter from "../components/layout/MainFooter";
import ErrorHandler from "../utils/ErrorHandler";
import LoginHandler from "../utils/LoginHandler";

/* const DefaultLayout = ({ children, noNavbar, noFooter }) => { */
  
import { Store } from "../flux";

class DefaultLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuVisible: false,
      sidebarNavItems: Store.getSidebarItems(),
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
      menuVisible: Store.getMenuState(),
      sidebarNavItems: Store.getSidebarItems(),
      menuText: Store.getSidebarTextState()
    });
  }

  render() {
    let { children, noNavbar, noFooter } = this.props;

    const classes = classNames(
      "main-content",
      "p-0",
      "col-sm-12",
      this.state.menuText ? "col-lg-12 col-md-12" : "col-lg-12 col-md-12 ",
      this.state.menuVisible && "open"
    );

    return (
      <Container fluid>
        <Row>
          {/* <MainSidebar hideLogoText={false}/> */}
          <Col
            className={classes}
            /* lg={{ size: 10, offset: 2 }}
            md={{ size: 9, offset: 3 }}
            sm="12" */
            tag="main"
          >
            {!noNavbar && <MainNavbar />}
            <ErrorHandler>
              <LoginHandler>
                {children}
              </LoginHandler>
            </ErrorHandler>
            {!noFooter && <MainFooter />}
          </Col>
        </Row>
      </Container>
    );
  }
}

DefaultLayout.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool
};

DefaultLayout.defaultProps = {
  noNavbar: false,
  noFooter: false
};

export default DefaultLayout;
