import React from "react";
import PropTypes from "prop-types";
import { 
	Card, 
	CardHeader, 
	CardBody, 
	Row, 
	Col,
	Form,
	InputGroup,
	InputGroupAddon,
	DatePicker,
	Button
} from "shards-react";

import Chart from "../common/chart";

export default class BarChart extends React.Component {
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
		this.canvasRef = React.createRef();
		this.chartRef = React.createRef();
	}

	componentDidMount() {
		this.createChart();
	}

	UNSAFE_componentWillReceiveProps(nextProps){
		this.updateChart(nextProps);
	}

	createChart(){
		var barChart = new Chart(this.canvasRef.current, {
			type: 'bar',
			data: this.props.chartData,
			options: this.props.chartOptions
		});

		// Render the chart.
		barChart.render();
		
		this.chartRef.current = barChart;
	}

	updateChart(props){
		if(this.chartRef.current){
			this.chartRef.current.data.labels = props.chartData.labels;
			this.chartRef.current.data.datasets = props.chartData.datasets;
			this.chartRef.current.update();
		}
	}

    onChangeInput(value, id){
        let {form} = this.state;

        switch(id){
            case form.startDate.id:
                form.startDate.value = value;
                if((form.startDate.value > form.endDate.value) && form.endDate.value){
                    form.endDate.value = value;
                }
                break;
            default:
                form[id].value = value;
                break;
		}
		
		console.log(form);

        this.setState({form});
	}
	
	rangeDatePicker(){
		let {form} = this.state;
		let {awaitingRes, getPeriodData} = this.props;
		return (
			<Form onSubmit={(e) => getPeriodData(e, form.startDate.value, form.endDate.value)}>
				<InputGroup className="flex-nowrap">
					<DatePicker
						required
						selectsStart
						dateFormat="dd/MM/yyyy"
						className="form-control text-center"
						placeholderText='Data início'
						id={form.startDate.id}
						onChange={(date) => this.onChangeInput(date, form.startDate.id)}
						selected={form.startDate.value}
						startDate={form.startDate.value}
						endDate={form.endDate.value}
					/>
					<DatePicker
						required
						selectsEnd
						dateFormat="dd/MM/yyyy"
						className="form-control text-center"
						placeholderText='Data final'     
						id={form.endDate.id}                  
						onChange={(date) => this.onChangeInput(date, form.endDate.id)}
						selected={form.endDate.value}
						startDate={form.startDate.value}
						endDate={form.endDate.value}
						minDate={form.startDate.value}
					/>
					<InputGroupAddon type="append" className="w-25">
						<Button block size="sm" type="submit" theme="esc-orange" disabled={awaitingRes}>
							{awaitingRes ?  (
								<div className="spinner-border spinner-border-sm" role="status">
									<span className="sr-only">Loading...</span>
								</div>
							) :	(
								<span className="txt-bold-esc">PESQUISAR</span>
							)}
						</Button>
					</InputGroupAddon>
				</InputGroup>
			</Form>
		)
	}

	render() {
		const { title, getPeriodData } = this.props;
		return (
		<Card small className="h-100">
			<CardHeader className="border-bottom">
				<h6 className="m-0">{title}</h6>
			</CardHeader>
			<CardBody className="pt-0">
				{getPeriodData && (
					<Row className="border-bottom py-2 bg-light">
						<Col sm="7" className="d-flex mb-2 mb-sm-0">
							{this.rangeDatePicker()}
						</Col>
					</Row>
				)}
				<canvas
            		height="150"
					ref={this.canvasRef}
					style={{ maxWidth: "100% !important" }}
				/>
			</CardBody>
		</Card>
		);
	}
}

BarChart.propTypes = {
	/**
	 * The component's title.
	 */
	title: PropTypes.string,
	/**
	 * The chart dataset.
	 */
	chartData: PropTypes.object,
	/**
	 * The Chart.js options.
	 */
	chartOptions: PropTypes.object,
	/**
	 * Get the period data.
	 */
	getPeriodData: PropTypes.func
};

BarChart.defaultProps = {
	title: "-",
	chartData: {
		labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Sep', 'Out Nov', 'Dez'],
		datasets: [{
			label: '# of views',
			data: [500, 1300, 4000, 5000, 4000, 7000, 6000, 8600, 4500, 6000, 1800],
			backgroundColor: ['#F28742', '#F28742', '#F28742', '#F28742', '#F28742', '#F28742', '#F28742', '#F28742', '#F28742', '#F28742', '#106086'],
			borderWidth: 1
		}]
	},
	chartOptions: {
		scales: { 
			yAxes: [
				{ 
					ticks: { 
					beginAtZero: true 
					} 
				}
			] 
		}
	}
};