import React from "react";
import { Container, Row, Col } from "shards-react";
import ErrorHandler from "../utils/ErrorHandler";

const noLayout = ({ children }) => {
  return (
    <Container fluid>
      <Row>
        <Col className="main-content p-0" tag="main">
          <ErrorHandler>
            {children}
          </ErrorHandler>
        </Col>
      </Row>
    </Container>
  );
} 

export default noLayout;
