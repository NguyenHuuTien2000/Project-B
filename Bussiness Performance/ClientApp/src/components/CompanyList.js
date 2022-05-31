import React, { Component } from 'react';

export class CompanyList extends Component {
    static displayName = CompanyList.name;

    constructor(props) {
        super(props);
        this.state = { companyID: [], loading: true };
    }

    componentDidMount() {
        this.getData();
    }

    static renderCompanyList(companyID) {
        const ids = companyID.map(ID => <li>{ID}</li>);
        return (<ul className="CompanyList">{ids}</ul>);
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : CompanyList.renderCompanyList(this.state.companyID);

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