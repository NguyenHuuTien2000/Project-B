import React, { Component } from 'react';
import { ListGroupItem } from 'reactstrap';
import { ListGroup } from 'reactstrap';
import eventBus from './ultilities/EventBus';

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

    handleFilter(event) {
        const searchWord = event.target.value.toLowerCase();
        const newFilter = this.state.fullList.filter((value) => {
            return value.companyID.toLowerCase().includes(searchWord) || value.companyName.toLowerCase().includes(searchWord);
        });
        this.setState({ companies: newFilter});
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
                <input type="text" placeholder='Search for company name or code' onChange={(event) => this.handleFilter(event)}/>
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