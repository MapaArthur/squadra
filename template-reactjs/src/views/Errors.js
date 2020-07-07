import React from "react";
import { Container, Button } from "shards-react";
import { Link } from "react-router-dom";

export default class Errors extends React.Component {
	constructor(props) {
    super(props)    
	}

  render() {
    let { error, info, to } = this.props.location.state;
    /* console.log(error, info, to); */
    return (
      <Container fluid className="main-content-container px-4 pb-4">
        <div className="error">
          <div className="error__content">
            <h2>{error}</h2>
            <h3>Algo deu errado!</h3>
            <p>{info}</p>
            <Button pill tag={Link} to={to}>&larr; Voltar</Button>
          </div>
        </div>
      </Container>
    )
  };
}