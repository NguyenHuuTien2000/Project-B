import React, { Component } from 'react';
import eventBus from '../ultilities/EventBus';
// import { Line } from 'react-chartjs-2';
import { Bubble } from 'react-chartjs-2';

export class NetWorth extends Component {
    static displayName = NetWorth.name;

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

    renderChart(results) {
        let options = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Net Worth'
                },
            },
        };

        let labels = [];
        let assets = [];
        let liabilities = [];
        let netWorth = [];
        for (let result of results) {
            labels.unshift(result.time);
            assets.unshift(result.total_Assets);
            liabilities.unshift(result.liabilities);
            netWorth.unshift(result.total_Assets - result.liabilities);
        }
        console.log(assets);
        console.log(liabilities);
        console.log(netWorth);
        
        let companyName = `${results[0].companyID} - ${this.state.compName}`

        let chartData = {
            labels,
            datasets: [
                {
                    label: 'Assets',
                    data: assets,
                    borderColor: 'rgb(65, 235, 28)',
                    backgroundColor: 'rgba(65, 235, 28, 0.6)',
                    skipNull: true,
                    type: 'bar'
                },
                {
                    label: 'Liabilities',
                    data: liabilities,
                    borderColor: 'rgb(235, 28, 87)',
                    backgroundColor: 'rgba(235, 28, 87, 0.8)',
                    skipNull: true,
                    type: 'bar'
                },
                {
                    label: 'Net Worth',
                    data: netWorth,
                    borderColor: 'rgb(33, 29, 29)',
                    backgroundColor: 'rgba(33, 29, 29, 0.7)',
                    skipNull: true,
                    type: 'line'
                },
            ],
        };

        return (
            <Bubble options={options} data={chartData} />
        );
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
                contents = this.renderChart(this.state.results);
        }
        
        return (
            <div className="NetWorth bg-light rounded m-1 p-2">
                {contents}
            </div>
        );
    }

    async getData(id, name) {
        const response = await fetch(`api/Home/BalanceSheetAccounting/${id}`);
        const data = await response.json();
        if (Object.keys(data).length === 0 && data.constructor === Object) {
            this.setState({ loading: 2 });
            return;
        }
        this.setState({ results: data, loading: 1, compName: name });
    }
}