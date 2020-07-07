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
    Button,
    CardHeader
} from "shards-react";

import { RestApi, Mask, Cookies } from "../module"
import { PageTitle, GenericRegister } from "../components/common";
import { Link } from "react-router-dom";

export default class GetSystem extends React.Component {
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
                }
            },
            awaitingSubmit: false,
            dadosConsult: [],
            showResults: false
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
            default:
                break;
        }
        this.setState({ form })
    }
    onFind(e) {
        e.preventDefault();
        this.setState({ awaitingSubmit: true, showResults: true })
        let { form } = this.state;
        let body = {
            description: form.description.value,
            initials: form.initials.value,
            email: form.email.value,
        }
        console.log(body);
        RestApi.GetSystem(body.description, body.initials, body.email).then((data) => {
            console.log(data)
            if (data.status == "200") {
                if(data.system[0] == null)
                {
                    window.alert("Nenhum Sistema foi encontrado. Favor revisar os critérios da sua pesquisa!");
                }
                this.setState({ awaitingSubmit: false, dadosConsult: data.system })
            }
        }).catch((e) => {
            console.log("erro", e);
        });
    }

    ClearAll() {
        let form = this.state.form;
        form.description.value = "";
        form.email.value = "";
        form.initials.value = "";
        this.setState({ form: form });
    }
    render() {
        return (
            <Container fluid className="main-content-container px-4">
                <Row noGutters className="page-header py-4">
                    <PageTitle sm="4" title="Pesquisar Sistema" className="text-sm-left" />
                </Row>
                <Row className="d-flex justify-content-center">
                    <Col lg="8">
                        <Card>
                            <Form onSubmit={this.onFind.bind(this)}>
                                <CardBody>
                                    <Row>
                                        <Col md="6" className="form-group">
                                            <FormGroup>
                                                <label htmlFor={this.state.form.description.id}>Descrição</label>
                                                <FormInput
                                                    type="text"
                                                    className="form-control"
                                                    id={this.state.form.description.id}
                                                    value={this.state.form.description.value}
                                                    onChange={this.onChange.bind(this)}
                                                    maxLength="100"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md="6" className="form-group">
                                            <FormGroup>
                                                <label htmlFor={this.state.form.initials.id}>Sigla</label>
                                                <FormInput
                                                    type="text"
                                                    className="form-control"
                                                    id={this.state.form.initials.id}
                                                    value={this.state.form.initials.value}
                                                    onChange={this.onChange.bind(this)}
                                                    maxLength="10"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6" className="form-group">
                                            <FormGroup>
                                                <label htmlFor={this.state.form.email.id}>E-mail de atendimento do sistema</label>
                                                <FormInput
                                                    type="email"
                                                    className="form-control"
                                                    id={this.state.form.email.id}
                                                    value={this.state.form.email.value}
                                                    onChange={this.onChange.bind(this)}
                                                    maxLength="100"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row className="d-flex justify-content-center">
                                        <Col md="3">
                                            <Button block type="submit" theme="primary">
                                                <span>Pesquisar <i className="fas fa-search"></i></span>
                                            </Button>
                                        </Col>
                                        <Col md="2">
                                            <Button block theme="primary" onClick={this.ClearAll.bind(this)}>
                                                <span>Limpar <i class="far fa-trash-alt"></i></span>
                                            </Button>
                                        </Col>
                                        <Col md="3">
                                            <Button block theme="primary" onClick={this.ClearAll.bind(this)} tag={Link} to={`/register-system/`}>
                                                <span>Novo Sistema <i class="far fa-file"></i></span>
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Form>
                        </Card>
                    </Col>
                </Row>
                {
                    this.state.showResults &&

                    <Row className="d-flex justify-content-center mt-4">
                        <Col lg="8">
                            <Card>
                                <CardHeader>
                                    Resultados da pesquisa
                            </CardHeader>
                                <CardBody className="w-100">
                                    <div className="table-responsive-md ">
                                        <table className="table mb-0 w-100 table-border-red">
                                            <thead className="bg-light w-100">
                                                <tr className="table-title table-border w-100" style={{ backgroundColor: "#8da9db" }}>
                                                    <th scope="col" className="text-center table-border">Descrição</th>
                                                    <th scope="col" className="text-center table-border">Sigla</th>
                                                    <th scope="col" className="text-center table-border">E-mail de atendimento</th>
                                                    <th scope="col" className="text-center table-border" style={{ maxWidth: "40px" }}>URL</th>
                                                    <th scope="col" className="text-center table-border">Status</th>
                                                    <th scope="col" className="text-center table-border">Ações</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.dadosConsult.map((c, key) => {
                                                    return (
                                                        <tr key={key} className="text-center table-text table-border" style={{ backgroundColor: "#d8e2f3" }}>
                                                            <td className="py-0 table-border" style={{ verticalAlign: "middle", height: "80px" }}>
                                                                {c.description ? c.description.substring(0, 100) : ""}
                                                            </td>
                                                            <td className="py-0 table-border" style={{ verticalAlign: "middle" }}>
                                                                {c.initials ? c.initials.substring(0, 10) : ""}
                                                            </td>
                                                            <td className="py-0 table-border" style={{ verticalAlign: "middle" }}>
                                                                {c.email ? c.email.substring(0, 100) : ""}
                                                            </td>
                                                            <td className="py-0 table-border" style={{ maxWidth: "300px", verticalAlign: "middle" }}>
                                                                {c.url ? c.url.substring(0, 50) : ""}
                                                            </td>
                                                            <td className="py-0 table-border" style={{ verticalAlign: "middle" }}>
                                                                {c.status ? "Ativo" : "Cancelado"}
                                                            </td>
                                                            <td className="py-0 table-border" style={{ verticalAlign: "middle" }}>
                                                                <Button theme="primary" tag={Link} to={`/edit-system/${c.id}`}>
                                                                    <i class="far fa-edit"></i>
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                }

            </Container>
        );
    }
}