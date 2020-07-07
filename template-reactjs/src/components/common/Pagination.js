import React from "react";
import {
    Container,
    ButtonGroup,
    Button
} from "shards-react";

export default class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNumbers: [],
            bngSlice: null,
            endSlice: null
        };

        this.updatePagination = this.updatePagination.bind(this);
    }

    componentDidMount() {    
        let pageNumbers = [];
        for (var i = 1; i <= Math.ceil(this.props.totalItemsCount / this.props.itemsCountPerPage); i++) {
            pageNumbers.push(i);
        }        
        console.log(pageNumbers)
        this.setState({
            bngSlice: 0,
            endSlice: this.props.pageRangeDisplayed,
            pageNumbers: pageNumbers
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.totalItemsCount !== prevProps.totalItemsCount) {
            let pageNumbers = [];
            for (var i = 1; i <= Math.ceil(this.props.totalItemsCount / this.props.itemsCountPerPage); i++) {
                pageNumbers.push(i);
            }        
            this.setState({
                bngSlice: 0,
                endSlice: this.props.pageRangeDisplayed,
                pageNumbers: pageNumbers
            })
            this.props.onChange(1);
        }
      }

    updatePagination(page){
        this.props.onChange(page);
        if(page < this.props.pageRangeDisplayed/2){
            this.setState({
                bngSlice: 0,
                endSlice: this.props.pageRangeDisplayed
            })
        } else if(page > this.state.pageNumbers.length - this.props.pageRangeDisplayed/2){
            let aux = this.state.pageNumbers.length - this.props.pageRangeDisplayed;
            this.setState({
                bngSlice: aux < this.state.pageNumbers.length ? 0 : aux,
                endSlice: this.state.pageNumbers.length
            })
        } else if(page >= this.props.pageRangeDisplayed/2){
            this.setState({
                bngSlice: page - this.props.pageRangeDisplayed/2,
                endSlice: page + this.props.pageRangeDisplayed/2
            })
        }
    }

    render() {  
        let { size, vertical, outline, theme, activePage } = this.props;      
        let { pageNumbers, bngSlice, endSlice } = this.state;      
        return (
            <Container className="pagination justify-content-center p-0">
                <ButtonGroup size={size || "sm"} vertical={vertical}>
                    <Button theme={theme || "primary"} outline={outline} disabled={activePage === pageNumbers[0]} onClick={() => this.updatePagination(pageNumbers[0])}>
                        <i className="fas fa-angle-double-left"/>
                    </Button>
                    <Button theme={theme || "primary"} outline={outline} disabled={activePage === pageNumbers[0]} onClick={() => this.updatePagination(activePage - 1)}>
                        <i className="fas fa-angle-left"/>
                    </Button>
                    {pageNumbers.slice(bngSlice, endSlice).map((page, idx) => (                        
                        <Button key={idx} theme={theme || "primary"} outline={outline} className={`${activePage === page ? 'active' : ''}`} onClick={() => this.updatePagination(page)}>
                            <span className="font-weight-bolder">{page}</span>
                        </Button>
                    ))}                
                    <Button theme={theme || "primary"} outline={outline} disabled={activePage === pageNumbers[pageNumbers.length - 1]} onClick={() => this.updatePagination(activePage + 1)}>
                        <i className="fas fa-angle-right"/>
                    </Button>
                    <Button theme={theme || "primary"} outline={outline} disabled={activePage === pageNumbers[pageNumbers.length - 1]} onClick={() => this.updatePagination(pageNumbers.length)}>
                        <i className="fas fa-angle-double-right"/>
                    </Button>
                </ButtonGroup>
            </Container>                       
        );
    }
}