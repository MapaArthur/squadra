import React from "react";
import { Redirect } from "react-router-dom";
import {
    Container,
    Row,
    Col,
    Button,
    Card,
    CardBody,
    CardImg,
    Form,
    FormInput,
    FormGroup,
} from "shards-react";
import { RestApi, Mask, Cookies } from "../module";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            awaitingLogin: false,
            loginMsg: null,
            logged: false,
            form: {
                username: {
                    id: "Username",
                    value: "",
                },
                password: {
                    id: "Password",
                    value: "",
                },
                role: {
                    id: "Role",
                    value: "",
                }
            }
        };
    }

    onInputChange(e) {
        e.preventDefault();
        let { form } = this.state;
        let inputValue = e.target.value;
        switch (e.target.id) {
            case form.username.id:
                form.username.value = inputValue;
                break;
            case form.password.id:
                form.password.value = inputValue;
            default:
                break;
        }

        this.setState({ form });
    }

    login(e) {
        e.preventDefault();
        this.setState({ awaitingLogin: true });
        let { form } = this.state;

        let body = {
            Username: form.username.value,
            Password: form.password.value
        }

        console.log(body)

        RestApi.Authenticate(body).then((res) => {
            console.log(res)
            if (res && res.token) {
                let ld = {
                    idUser: res.user.result.id,
                    usernameUser: res.user.result.username,
                    passwordUser: res.user.result.password
                }
                if (Cookies.createCookie(Cookies.LOGIN_DATA, ld, (1 / 32), Cookies.LOGIN_DATA_KEY)) {
                    this.setState({ loginMsg: null, awaitingLogin: false, logged: true });
                } else {
                    this.setState({ awaitingLogin: false, loginMsg: "Um erro inesperado ocorreu. Por favor tente mais tarde." })
                }
            } else {
                this.setState({ awaitingLogin: false, loginMsg: res.msg });
            }
        }).catch((e) => {
            console.log(e);
            this.setState({ awaitingLogin: false, loginMsg: "Um erro inesperado ocorreu. Por favor tente mais tarde." });
        });
    }

    render() {
        if (this.state.logged) {
            return <Redirect to="/get-system" />
        } else {
            return (
                <main>
                    <Container>
                        <Row className="justify-content-center mt-5">
                            <Col xs="4">
                                <Card>
                                    <CardBody>
                                        <Container style={{ width: "300px" }} className="text-center">
                                            <CardImg src={require("../images/logosquadra.jpg")} width="150" height="150" className="mb-3" />
                                        </Container>
                                        <Form className="mb-1" onSubmit={this.login.bind(this)}>
                                            <FormGroup>
                                                <FormInput
                                                    required
                                                    type="text"
                                                    placeholder="Login"
                                                    id={this.state.form.username.id}
                                                    value={this.state.form.username.value}
                                                    onChange={this.onInputChange.bind(this)}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <FormInput
                                                    required
                                                    type="password"
                                                    placeholder="Senha"
                                                    id={this.state.form.password.id}
                                                    value={this.state.form.password.value}
                                                    onChange={this.onInputChange.bind(this)}
                                                />
                                            </FormGroup>
                                            <Button type="submit" theme="primary" block disabled={this.state.awaitingLogin}>
                                                {this.state.awaitingLogin ? (
                                                    <div className="spinner-border spinner-border-sm" role="status">
                                                        <span className="sr-only">Loading...</span>
                                                    </div>
                                                ) : (
                                                        <strong>Entrar</strong>
                                                    )}
                                            </Button>
                                        </Form>
                                        {!this.state.awaitingLogin && this.state.loginMsg && (
                                            <p className="small text-center text-danger">{this.state.loginMsg}</p>
                                        )}
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </main>
            )
        }
    }
}