import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from './api-authorization/LoginMenu';
import eventBus from './ultilities/EventBus';
import './NavMenu.css';
import { ListGroupItem } from 'reactstrap';
import { ListGroup } from 'reactstrap';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor (props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = { wordEntered: "", companies: [], fullList: [], loading: true, collapsed: true };
    }

    toggleNavbar () {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    componentDidMount() {
        this.getData();
    }

    sendCompanyID(id, name) {
        eventBus.dispatch("compSelected", { ID: id, Name: name });
        this.setState({companies: []})
    }

    handleFilter(event) {
        const searchWord = event.target.value.toLowerCase();
        this.setState({wordEntered: searchWord})
        const newFilter = this.state.fullList.filter((value) => {
            return value.companyID.toLowerCase().includes(searchWord) || value.companyName.toLowerCase().includes(searchWord);
        });

        if (searchWord === "") {
            this.setState({companies: []})
        } else {
            this.setState({ companies: newFilter });
        }
    }

    clearInput() {
        this.setState({companies: [], wordEntered: ""})
    }

    renderCompanyList() {
        return (this.state.companies.length !== 0 && 
        <ListGroup className="dataResult">
            { this.state.companies.slice(0, 10).map(Company =>
                <ListGroupItem
                    key={Company.companyID}
                    action onClick={() => this.sendCompanyID(Company.companyID, Company.companyName)}>
                    {Company.companyID} - {Company.companyName}
                </ListGroupItem>
            )}
        </ ListGroup>);
    }

    render() {
        let contents = this.renderCompanyList(this.state.companies);
        return (
            <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Performance Dashboard</a>
                <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <input 
                className="form-control form-control-dark w-100" 
                type="text" 
                placeholder='Search for company name or code' 
                onChange={(event) => this.handleFilter(event)}
                value={this.state.wordEntered} />

                <div className='search-box'>
                    {contents}
                </div>
                <div className="navbar-nav">
                    <div className="nav-item text-nowrap" >
                        <button className="nav-link px-3 bg-dark" onClick={() => this.clearInput()}>Clear</button>
                    </div>
                </div>
            </header>
        );
    }

    async getData() {
        const response = await fetch('api/Companies/GetCompanies');
        const data = await response.json();
        this.setState({ fullList: data, companies: [], loading: false });
    }
}
