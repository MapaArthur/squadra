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

export default class EditSystem extends React.Component {
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
                    value: "",
                },
                status: {
                    id: "status",
                    value: "",
                },
                user: {
                    id: "user",
                    value: "",
                },
                dateLastModification: {
                    id: "dateLastModification",
                    value: "",
                },
                justification: {
                    id: "justification",
                    value: "",
                },
                newjustification: {
                    id: "newjustification",
                    value: "",
                }
            },
            awaitingSubmit: false,
            dadosConsult: []
        }
    };
    componentDidMount() {
        if (this.props.match.params.id) {
            this.getInfo();
        }
    }
    getInfo() {
        RestApi.GetByID(this.props.match.params.id).then((data) => {
            console.log(data)
            if (data.status == "200") {
                let { form } = this.state;
                form.description.value = data.system[0].description;
                form.initials.value = data.system[0].initials;
                form.email.value = data.system[0].email;
                form.url.value = data.system[0].url;
                form.status.value = data.system[0].status ? 1 : 0;
                form.user.value = data.system[0].user;
                form.dateLastModification.value = data.system[0].lastModificationDate;
                form.justification.value = data.system[0].justification;
                form.newjustification.value = data.system[0].newjustification;
                this.setState({ form })
                window.alert("Operação realizada com sucesso.");
            }
        }).catch((e) => {
            console.log("erro", e);
        });
    }
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
                break;
            case form.status.id:
                form.status.value = inputValue;
                break;
            case form.user.id:
                form.user.value = inputValue;
                break;
            case form.dateLastModification.id:
                form.dateLastModification.value = inputValue;
                break;
            case form.justification.id:
                form.justification.value = inputValue;
                break;
            case form.newjustification.id:
                form.newjustification.value = inputValue;
            default:
                break;
        }
        this.setState({ form })
    }
    onUpdate(e) {
        e.preventDefault();
        this.setState({ awaitingSubmit: true })
        let { form } = this.state;
        let body = {
            description: form.description.value,
            initials: form.initials.value,
            email: form.email.value,
            url: form.url.value,
            status: form.status.value == 1 ? true : false,
            user: form.user.value,
            justification: form.justification.value,

            newjustification: form.newjustification.value
        }
        console.log(body);
        RestApi.UpdateSystem(this.props.match.params.id, body).then((data) => {
            console.log(data)
            if (data.status == "200") {
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
                            <Form onSubmit={this.onUpdate.bind(this)}>
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
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6" className="form-group">
                                            <FormGroup>
                                                <label htmlFor={this.state.form.initials.id}>Sigla</label>
                                                <FormInput
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
                                                <label htmlFor={this.state.form.email.id}>E-mail de atendimento do sistema</label>
                                                <FormInput
                                                    type="email"
                                                    className="form-control"
                                                    id={this.state.form.email.id}
                                                    value={this.state.form.email.value}
                                                    onChange={this.onChange.bind(this)}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6" className="form-group">
                                            <FormGroup>
                                                <label htmlFor={this.state.form.url.id}>Url</label>
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
                                    <Row>
                                        <Col md="6" className="form-group">
                                            <FormGroup>
                                                <label htmlFor={this.state.form.status.id}>Status</label>
                                                <FormSelect
                                                    type="text"
                                                    required
                                                    className="form-control"
                                                    id={this.state.form.status.id}
                                                    value={this.state.form.status.value}
                                                    onChange={this.onChange.bind(this)}
                                                >
                                                    <option value="">Selecione</option>
                                                    <option value="1">Ativo</option>
                                                    <option value="0">Cancelado</option>
                                                </FormSelect>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6" className="form-group">
                                            <FormGroup>
                                                <label htmlFor={this.state.form.user.id}>Usuário responsável pela última atualização</label>
                                                <FormInput
                                                    type="text"
                                                    className="form-control"
                                                    id={this.state.form.user.id}
                                                    value={this.state.form.user.value}
                                                    onChange={this.onChange.bind(this)}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6" className="form-group">
                                            <FormGroup>
                                                <label htmlFor={this.state.form.status.id}>Data da última alteração</label>
                                                <FormInput
                                                    type="text"
                                                    className="form-control"
                                                    id={this.state.form.dateLastModification.id}
                                                    value={this.state.form.dateLastModification.value}
                                                    onChange={this.onChange.bind(this)}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6" className="form-group">
                                            <FormGroup>
                                                <label htmlFor={this.state.form.justification.id}>Justificativa da última alteração</label>
                                                <FormInput
                                                    type="text"
                                                    className="form-control"
                                                    id={this.state.form.justification.id}
                                                    value={this.state.form.justification.value}
                                                    onChange={this.onChange.bind(this)}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6" className="form-group">
                                            <FormGroup>
                                                <label htmlFor={this.state.form.justification.id}>Nova Justificativa</label>
                                                <FormInput
                                                    type="text"
                                                    className="form-control"
                                                    id={this.state.form.newjustification.id}
                                                    value={this.state.form.newjustification.value}
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