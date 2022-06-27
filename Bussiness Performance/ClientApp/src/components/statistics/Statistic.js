import React, { Component } from 'react';
import eventBus from '../ultilities/EventBus';

export class Statistic extends Component {
    static displayName = Statistic.name;

    constructor(props) {
        super(props);
        this.state = { results: [], loading: 0, compName: ""};
    }

    componentDidMount() {
        eventBus.on("compSelected", (data) => {
            this.getData(data.ID, data.Name)
        });
    }

    componentWillUnmount() {
        eventBus.remove("compSelected");
    }

    showData(data) {
        var stock = <p>data.companyID</p>
        return (<div className="bg-light p-3">
            <h4>Profile</ h4>
            <p>Stock: {data.companyID}</p>
            <p>Name: {data.companyName}</p>
            <p>Sector: {data.sector}</p>
            <p>Industry: {data.industry}</p>
            <p>Total Revenue: {data.totalRevenue} VND</p>
            <p>Total data: {data.totalExpense} VND</p>
            <p>EPS: {data.eSP} VND</p>
            <p>Working Capital: {data.workingCapital}</p>
        </div>);
    } 

    render() {
        let contents;
        // eslint-disable-next-line default-case
        switch (this.state.loading) {
            case 0:
                contents = <h4>Loading...</h4>;
                break;
            case 2:
                contents = <h4 style="color: red"><em>Cannot find data</em></h4>;
                break;
            case 1:
                contents = this.showData(this.state.results);
        }

        return (
            <div className="Statistic w-25">
                {contents}
            </div>
        );
    }

    async getData(id, name) {
        const response = await fetch(`api/Home/Statistic/${id}`);
        const data = await response.json();
        if (Object.keys(data).length === 0 && data.constructor === Object) {
            this.setState({ loading: 2 });
            return;
        }
        this.setState({ results: data, loading: 1, compName: name });
    }
}