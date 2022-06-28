import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import React, { Component } from 'react';
import eventBus from '../ultilities/EventBus';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export class ProfitMargin extends Component {
    static displayName = ProfitMargin.name;

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
                    text: 'Gross Profit Margin (%)'
                },
            },
        };

        let labels = [];
        let numList = [];
        for (let result of results) {
            labels.unshift(result.time);
            numList.unshift(result.marginGrossProfitMargin);
        }
        let companyName = `${results[0].companyID} - ${this.state.compName}`

        let chartData = {
            labels,
            datasets: [
                {
                    label: 'Gross Profit Margin (%)',
                    data: numList,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    spanGaps: true,
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
            <div className="LineChart bg-light rounded m-1 p-2">
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
