import React, { Component } from 'react';
import { ListGroupItem } from 'reactstrap';
import { ListGroup } from 'reactstrap';
import eventBus from './ultilities/EventBus';

export class CompanyList extends Component {
    static displayName = CompanyList.name;

    constructor(props) {
        super(props);
        this.state = { companyID: [], loading: true, tooltipOpen: false};
    }

    componentDidMount() {
        this.getData();
    }

    sendCompanyID(id) {
        eventBus.dispatch("compSelected", { ID: id });
    }

    toggle() {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
    }

    renderCompanyList(companies) {
        const ids = companies.map(Company =>
            <ListGroupItem
                key={Company.companyID}
                action onClick={() => this.sendCompanyID(Company.companyID)}>
                {Company.companyID}
            </ListGroupItem>
        );
        return (<ListGroup className="CompanyList">{ids}</ ListGroup>);
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCompanyList(this.state.companyID);
        return (
            <div>
                {contents}
            </div>
        );
    }

    async getData() {
        const response = await fetch('api/Companies/GetCompanies');
        const data = await response.json();
        this.setState({ companyID: data, loading: false });
    }
}