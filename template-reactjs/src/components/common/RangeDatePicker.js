import React from "react";
import classNames from "classnames";
import {
	InputGroup,
	DatePicker,
	InputGroupAddon,
	InputGroupText
} from "shards-react";

import "../../assets/range-date-picker.css";

export default class RangeDatePicker extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
            form: {
                startDate : {
                    id: "startDate",
                    value: null
                },
                endDate: {
                    id: "endDate",
                    value: null
                }
            },
		};
	}

    onChangeInput(value, id){
        let {form} = this.state;

        switch(id){
            case form.startDate.id:
                form.startDate.value = value ? value.setHours(0,0) : "";
                if((form.startDate.value > form.endDate.value) && form.endDate.value){
                    form.endDate.value = value;
                }
                break;
            case form.endDate.id:
                form.endDate.value = value ? value.setHours(23,59) : "";
                break;
            default:
                form[id].value = value;
                break;
        }

        this.setState({form});
    }

	render() {
        let {form} = this.state;
		const { className } = this.props;
		const classes = classNames(className, "d-flex", "my-auto", "date-range");

		return (
			<InputGroup className={classes}>
				<DatePicker
					selectsStart
					dateFormat="dd/MM/yyyy"
					className="form-control"
					placeholderText='Data início'
					id={form.startDate.id}
					onChange={(date) => this.onChangeInput(date, form.startDate.id)}
					selected={form.startDate.value}
					startDate={form.startDate.value}
					endDate={form.endDate.value}
				/>
				<DatePicker
					selectsEnd
					dateFormat="dd/MM/yyyy"
					className="form-control"
					placeholderText='Data final'     
					id={form.endDate.id}                  
					onChange={(date) => this.onChangeInput(date, form.endDate.id)}
					selected={form.endDate.value}
					startDate={form.startDate.value}
					endDate={form.endDate.value}
					minDate={form.startDate.value}
				/>
				<InputGroupAddon type="append">
					<InputGroupText>
						<i className="material-icons">&#xE916;</i>
					</InputGroupText>
				</InputGroupAddon>
			</InputGroup>
		);
	}
}