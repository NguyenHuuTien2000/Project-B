import React, { Component } from 'react';
import { ListGroupItem } from 'reactstrap';
import { ListGroup } from 'reactstrap';
import eventBus from './ultilities/EventBus';
import './CompanyList.css';

export class CompanyList extends Component {
    static displayName = CompanyList.name;

    constructor(props) {
        super(props);
        this.state = { companies: [], fullList: [], loading: true};
    }

    componentDidMount() {
        this.getData();
    }

    sendCompanyID(id, name) {
        eventBus.dispatch("compSelected", { ID: id, Name: name });
    }

    renderCompanyList(list) {
        return (<ListGroup>
            {list.length !== 0 && list.map(Company =>
                <ListGroupItem
                    key={Company.companyID}
                    action onClick={() => this.sendCompanyID(Company.companyID, Company.companyName)}>
                    {Company.companyID} - {Company.companyName}
                </ListGroupItem>
            )}
        </ ListGroup>);
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCompanyList(this.state.companies);

        return (
            <div className="CompanyList scrollbar-primary">
                {contents}
            </div>
        );
    }

    async getData() {
        const response = await fetch('api/Companies/GetCompanies');
        const data = await response.json();
        this.setState({fullList: data, companies: data, loading: false });
    }
}