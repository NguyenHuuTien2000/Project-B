import React, { Component } from 'react';
import eventBus from '../ultilities/EventBus';
import { Line } from 'react-chartjs-2';

export class ROEA extends Component {
    static displayName = ROEA.name;

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
        let roea = [];
        let roaa = [];
        for (let result of results) {
            labels.unshift(result.time);
            roea.unshift(result.roea);
            roaa.unshift(result.roaa);
        }
        
        let companyName = `${results[0].companyID} - ${this.state.compName}`

        let chartData = {
            labels,
            datasets: [
                {
                    label: 'Return on Equity (%)',
                    data: roea,
                    borderColor: 'rgb(235, 28, 87)',
                    backgroundColor: 'rgba(243, 26, 87, 0.8)',
                    skipNull: true,
                    type: 'line'
                },
                {
                    label: 'Return on Assets (%)',
                    data: roaa,
                    borderColor: 'rgb(33, 29, 29)',
                    backgroundColor: 'rgba(35, 29, 229, 0.7)',
                    skipNull: true,
                    type: 'line'
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
            <div className="NetWorth chart bg-light rounded m-1 p-2">
                {contents}
            </div>
        );
    }

    async getData(id, name) {
        const response = await fetch(`api/FinancialIndicators/byID/${id}`);
        const data = await response.json();
        if (Object.keys(data).length === 0 && data.constructor === Object) {
            this.setState({ loading: 2 });
            return;
        }
        this.setState({ results: data, loading: 1, compName: name });
    }
}