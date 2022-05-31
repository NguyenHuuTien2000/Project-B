import React, { Component } from 'react';

export class Companies extends Component {
    static displayName = Companies.name;

    constructor(props) {
        super(props);
        this.state = { companies: [], loading: true };
    }

    componentDidMount() {
        this.getCompanies();
    }

    static renderCompanyList(companies) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Stock Code</th>
                        <th>Name</th>
                        <th>Links</th>
                    </tr>
                </thead>
                <tbody>
                    {companies.map(company =>
                        <tr key={company.companyID}>
                            <td>{company.companyID}</td>
                            <td>{company.companyName}</td>
                            <td><a href={company.link}>{company.link}</a></td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Companies.renderCompanyList(this.state.companies);

        return (
            <div>
                <h1 id="tabelLabel" >Company list</h1>
                {contents}
            </div>
        );
    }

    async getCompanies() {
        const response = await fetch('api/Companies/GetCompanies');
        const data = await response.json();
        this.setState({ companies: data, loading: false });
    }
}