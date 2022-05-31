import React, { Component } from 'react';
import { ListGroupItem } from 'reactstrap';
import ListGroup from 'reactstrap/lib/ListGroup'
import eventBus from './ultilities/EventBus'

export class CompanyList extends Component {
    static displayName = CompanyList.name;

    constructor(props) {
        super(props);
        this.state = { companyID: [], loading: true};
    }

    componentDidMount() {
        this.getData();
    }

    sendCompanyID(id) {
        eventBus.dispatch("compSelected", { ID: id });
        console.log(eventBus);
    }

    renderCompanyList(companyID) {
        const ids = companyID.map(ID => <ListGroupItem key={ID} action onClick={() => this.sendCompanyID(ID)}>{ID}</ListGroupItem>);
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
        const response = await fetch('api/Companies/ID');
        const data = await response.json();
        this.setState({ companyID: data, loading: false });
    }
}