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
        var formatter = new Intl.NumberFormat('de-De', {
            style: 'currency',
            currency: 'VND',
            maximumFractionDigits: 0
        });
        return (<div className="bg-light p-3">
            <h4>Profile</ h4>
            <p><strong>Stock</strong>:   {data.companyID}</p>
            <p><strong>Name</strong>:    {data.companyName}</p>
            <p><strong>Sector</strong>:  {data.sector}</p>
            <p><strong>Industry</strong>:    {data.industry}</p>
            <p><strong>Total Revenue (B)</strong>:   {formatter.format(data.totalRevenue)}</p>
            <p><strong>Total Expense (B)</strong>:  {formatter.format(data.totalExpense)}</p>
            <p><strong>EPS</strong>: {formatter.format(data.eps)}</p>
        </div>);
    } 

    render() {
        let contents;
        // eslint-disable-next-line default-case
        switch (this.state.loading) {
            case 0:
                break;
            case 2:
                contents = <h4 style="color: red"><em>Cannot find data</em></h4>;
                break;
            case 1:
                contents = this.showData(this.state.results);
        }

        return (
            <div className="Statistic">
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