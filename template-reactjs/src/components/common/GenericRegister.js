import React from "react";
import {  
    Row, 
    Col,
    Button,
	Form,
    FormInput,
    FormSelect,
    FormCheckbox,
    FormRadio,
    FormTextarea,
    DatePicker
} from "shards-react";

import pt from 'date-fns/locale/pt';
import { registerLocale, setDefaultLocale } from "react-datepicker";

export default class GenericRegister extends React.Component {
    
    static FORM_INPUT = "input";
    static FORM_TEXTAREA = "textarea";
    static FORM_SELECT = "select";
    static FORM_DATE_PICKER = "datepicker";
    static FORM_CHECKBOX = "checkbox";
    static FORM_RADIO = "radio";

    constructor(props) {
        super(props);
        
        this.state = {
            inputs: {
                input: this.formInput.bind(this),
                textarea: this.formTextarea.bind(this),
                select: this.formSelect.bind(this),
                datepicker: this.formDatePicker.bind(this),
                checkbox: this.formCheckbox.bind(this),
                radio: this.formRadio.bind(this),
            }
        }

        registerLocale('pt', pt);
        setDefaultLocale('pt');
    }

    formInput(input, key){
        if (!input.hide) {
            return (            
                <Col key={key} sm={input.sm || "12"} md={input.md || "12"} lg={input.lg || "12"} className="form-group">
                    {input.label && (
                        <label htmlFor={key} style={input.labelStyle}>
                            {input.label}{input.required && <span style={{color:"red"}}>*</span>}
                        </label>
                    )}
                    <FormInput
                        id={key}
                        valid={input.valid}
                        invalid={input.invalid}
                        required={input.required}
                        disabled={input.disabled}
                        placeholder={input.placeholder}
                        className={input.className}
                        style={input.inputStyle}
                        type={input.type || "text"}
                        value={input.value}
                        onChange={(e) => this.props.onInputChange(e.target.value, key)}
                    />
                </Col>
            )
        }
    }

    formTextarea(input, key){
        if (!input.hide) {
            return (            
                <Col key={key} sm={input.sm || "12"} md={input.md || "12"} lg={input.lg || "12"} className="form-group">
                    {input.label && (
                        <label htmlFor={key} style={input.labelStyle}>
                            {input.label}{input.required && <span style={{color:"red"}}>*</span>}
                        </label>
                    )}
                    <FormTextarea
                        id={key}
                        valid={input.valid}
                        invalid={input.invalid}
                        required={input.required}
                        disabled={input.disabled}
                        placeholder={input.placeholder}
                        className={input.className}
                        style={input.inputStyle}
                        rows={input.rows}
                        cols={input.cols}
                        maxLength={input.maxLength}
                        value={input.value}
                        onChange={(e) => this.props.onInputChange(e.target.value, key)}
                    />
                </Col>
            )
        }
    }

    formSelect(input, key){
        if (!input.hide) {
            return (      
                <Col key={key} sm={input.sm || "12"} md={input.md || "12"} lg={input.lg || "12"} className="form-group">
                    {input.label && (
                        <label htmlFor={key} style={input.labelStyle}>
                            {input.label}{input.required && <span style={{color:"red"}}>*</span>}
                        </label>
                    )}
                    <FormSelect
                        id={key}
                        valid={input.valid}
                        invalid={input.invalid}
                        required={input.required}
                        disabled={input.disabled}
                        placeholder={input.placeholder}
                        className={input.className}
                        style={input.inputStyle}
                        value={input.value}
                        onChange={(e) => this.props.onInputChange(e.target.value, key)}
                    >
                        <option value="">Selecione</option>
                        {input.options.map((o, idx2) => (
                            <option key={idx2} value={o.value}>{o.label}</option>
                        ))}
                    </FormSelect>
                </Col>
            )
        }
    }

    formDatePicker(input, key){
        if (!input.hide) {
            return (    
                <Col key={key} sm={input.sm || "12"} md={input.md || "12"} lg={input.lg || "12"} className="form-group">
                    {input.label && (
                        <label htmlFor={key} style={input.labelStyle}>
                            {input.label}{input.required && <span style={{color:"red"}}>*</span>}
                        </label>
                    )}
                    <DatePicker
                        id={key}
                        className={input.className}
                        style={input.inputStyle}
                        required={input.required}
                        disabled={input.disabled}
                        showYearDropdown={input.showYearDropdown}
                        showMonthDropdown={input.showMonthDropdown}
                        showTimeSelect={input.showTimeSelect}
                        dateFormat={input.dateFormat || "dd/MM/yyyy"}
                        timeFormat={input.timeFormat || "HH:mm"}
                        timeIntervals={input.timeIntervals || 30}
                        timeCaption={input.timeCaption || "Horário"}
                        minDate={input.minDate}
                        maxDate={input.maxDate}
                        selected={input.value}
                        onChange={(date) => this.props.onInputChange(date, key)}
                    />    
                </Col> 
            )
        }
    }

    formCheckbox(input, key) {
        if (!input.hide) {
            return (
                <Col key={key} sm={input.sm || "12"} md={input.md || "12"} lg={input.lg || "12"} className="form-group">
                    <FormCheckbox
                        id={key}
                        className={input.className}
                        style={input.inputStyle}
                        valid={input.valid}
                        invalid={input.invalid}
                        disabled={input.disabled}
                        checked={input.value}
                        onChange={(e) => this.props.onInputChange(!input.value, key)}
                    >
                    {input.label && (
                        <span style={input.labelStyle}>{input.label}</span>
                    )}
                    </FormCheckbox>
                </Col>
            )
        }
    }

    formRadio(input, key){
        if (!input.hide) {
            return (
                <Col key={key} sm={input.sm || "12"} md={input.md || "12"} lg={input.lg || "12"} className="form-group">
                    {input.label && (
                        <label className="mb-2" style={input.labelStyle}>
                            {input.label}{input.required && <span style={{color:"red"}}>*</span>}
                        </label>
                    )}
                    <div>
                    {input.options.map((option, idx) => (
                        <FormRadio
                            key={idx}
                            name={key}
                            style={input.inputStyle}
                            className={input.className}
                            valid={input.valid}
                            invalid={input.invalid}
                            inline={input.inline}
                            disabled={input.disabled || option.disabled}
                            checked={input.value === option.value}
                            onChange={() => this.props.onInputChange(option.value, key)}
                        >
                            {option.label}
                        </FormRadio>
                    ))}
                    </div>
                </Col>
            );
        }
    }

    formInputs(){
        return (
            <Row form>
                {Object.keys(this.props.form).map((key) => { 
                    let inputData = this.props.form[key];
                    let input = this.state.inputs[inputData.typeInput];
                    if(input){
                        return input(inputData, key);
                    }
                })} 
            </Row>
        )
    }

    render() {
        return (
            this.props.onSubmit ? (
                <Form autoComplete={this.props.autoComplete || "on"} onSubmit={this.props.onSubmit}>
                    {this.formInputs()}
                    <Row form className="justify-content-center">
                        {this.props.onCancel && (
                            <Col md="6">
                                <Button type="button" block theme="danger" onClick={this.props.onCancel}>
                                    <span><i className="fas fa-times"/> {this.props.cancelButtonText || "Cancelar"}</span>
                                </Button>
                            </Col>
                        )}
                        <Col md="6">
                            <Button block type="submit" theme="primary" disabled={this.props.awaitingSubmit}>
                                {this.props.awaitingSubmit ? (
                                    <div className="spinner-border spinner-border-sm" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                ) : (
                                    <span><i className="fas fa-check"/> {this.props.submitButtonText || "Salvar Alterações"}</span>
                                )}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            ) : (
                this.formInputs()
            )
        );
    }
}
