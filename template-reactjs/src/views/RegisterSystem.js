import React from "react";
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    FormSelect,
    FormGroup,
    FormInput,
    Form,
    Button
} from "shards-react";

import { RestApi, Mask, Cookies } from "../module"
import { PageTitle, GenericRegister } from "../components/common";
import { Link } from "react-router-dom";

export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                description: {
                    id: "description",
                    value: "",
                },
                initials: {
                    id: "initials",
                    value: "",
                },
                email: {
                    id: "email",
                    value: "",
                },
                url: {
                    id: "url",
                    value: ""
                }
            },
            awaitingSubmit: false
        }
    };

    onChange(e) {
        e.preventDefault();
        let { form } = this.state;
        let inputValue = e.target.value;
        switch (e.target.id) {
            case form.description.id:
                form.description.value = inputValue;
                break;
            case form.initials.id:
                form.initials.value = inputValue;
                break;
            case form.email.id:
                form.email.value = inputValue;
                break;
            case form.url.id:
                form.url.value = inputValue;
            default:
                break;
        }
        this.setState({ form })
    }
    onRegister(e) {
        e.preventDefault();
        this.setState({ awaitingSubmit: true })
        let { form } = this.state;
        let body = {
            description: form.description.value,
            initials: form.initials.value,
            email: form.email.value,
            url: form.url.value
        }
        console.log(body);
        RestApi.InsertSystem(body).then((data) => {
            console.log(data)
            if (data.status == "200") {
                this.setState({ awaitingSubmit: false })
                window.alert("Operação realizada com sucesso.");
                this.ClearAll();
            }
        }).catch((e) => {
            console.log("erro", e);
        });
    }

    ClearAll() {
        let form = this.state.form;
        form.description.value = "";
        form.url.value = "";
        form.email.value = "";
        form.initials.value = "";
        this.setState({ form: form });
    }
    render() {
        return (
            <Container fluid className="main-content-container px-4">
                <Row noGutters className="page-header py-4">
                    <PageTitle sm="4" title="Manter Sistema" className="text-sm-left" />
                </Row>
                <Row className="d-flex justify-content-center">
                    <Col lg="8">
                        <Card>
                            <Form onSubmit={this.onRegister.bind(this)}>
                                <CardBody>
                                    <Row>
                                        <Col md="6" className="form-group">
                                            <FormGroup>
                                                <label htmlFor={this.state.form.description.id}>Descrição<span style={{ color: "red" }}>*</span></label>
                                                <FormInput
                                                    required
                                                    type="text"
                                                    className="form-control"
                                                    id={this.state.form.description.id}
                                                    value={this.state.form.description.value}
                                                    onChange={this.onChange.bind(this)}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md="6" className="form-group">
                                            <FormGroup>
                                                <label htmlFor={this.state.form.initials.id}>Sigla<span style={{ color: "red" }}>*</span></label>
                                                <FormInput
                                                    required
                                                    type="text"
                                                    className="form-control"
                                                    id={this.state.form.initials.id}
                                                    value={this.state.form.initials.value}
                                                    onChange={this.onChange.bind(this)}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6" className="form-group">
                                            <FormGroup>
                                                <label htmlFor={this.state.form.email.id}>E-mail</label>
                                                <FormInput
                                                    type="email"
                                                    className="form-control"
                                                    id={this.state.form.email.id}
                                                    value={this.state.form.email.value}
                                                    onChange={this.onChange.bind(this)}
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col md="6" className="form-group">
                                            <FormGroup>
                                                <label htmlFor={this.state.form.email.id}>URL</label>
                                                <FormInput
                                                    type="text"
                                                    className="form-control"
                                                    id={this.state.form.url.id}
                                                    value={this.state.form.url.value}
                                                    onChange={this.onChange.bind(this)}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row className="d-flex justify-content-center">
                                        <Col md="4">
                                            <Button block theme="primary" tag={Link} to={`/get-system/`}>
                                                <span>Voltar <i class="fas fa-arrow-alt-circle-left"></i></span>
                                            </Button>
                                        </Col>
                                        <Col md="4">
                                            <Button block type="submit" theme="primary">
                                                {this.state.awaitingSubmit ?
                                                    <div className="spinner-border spinner-border-sm" role="status">
                                                        <span className="sr-only">Loading...</span>
                                                    </div>
                                                    : <span>Salvar <i class="fas fa-save"></i></span>
                                                }
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}