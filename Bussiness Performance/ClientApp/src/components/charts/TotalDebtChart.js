import React, { Component } from 'react';
import eventBus from '../ultilities/EventBus';
import { Line } from 'react-chartjs-2';
//import Chart from 'chart.js/auto';

export class TotatDebt extends Component {
    static displayName = TotatDebt.name;

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
                    text: 'Total Debt (VND)'
                },
            },
        };

        let labels = [];
        let numList = [];
        for (let result of results) {
            labels.unshift(result.time);
            numList.unshift(result.long_Term_Debt + result.short_Term_Debt);
        }
        
        let companyName = `${results[0].companyID} - ${this.state.compName}`

        let chartData = {
            labels,
            datasets: [
                {
                    label: 'Total Debt',
                    data: numList,
                    borderColor: 'rgb(235, 223, 28)',
                    backgroundColor: 'rgba(235, 223, 28, 1)',
                    skipNull: true,
                    fill: 'origin'
                },
            ],
        };

        return (
            <Line options={options} data={chartData} />
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
            <div className="TotalDebt chart bg-light rounded m-1 p-2">
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