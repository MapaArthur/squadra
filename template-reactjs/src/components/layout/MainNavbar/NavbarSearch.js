import React from "react";
import {
	Form,
	InputGroup,
	InputGroupAddon,
	FormInput,
	Button,
	Container
} from "shards-react";

export default () => (
	/* main-navbar__search */
	<Container className="d-none d-md-flex d-lg-flex justify-content-center">
		<Form className="w-50">
			<InputGroup>      
				<FormInput
					className="rounded-0"
					placeholder="Pesquisar"
				/>
				<InputGroupAddon type="append">
					<Button squared theme="primary"><i className="fas fa-search"/></Button>
				</InputGroupAddon>
			</InputGroup>
		</Form>
	</Container>  
);