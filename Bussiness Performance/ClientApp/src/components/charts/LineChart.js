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

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export class LineChart extends Component {
    static displayName = LineChart.name;

    constructor(props) {
        super(props);
        this.state = { bussinessResult: [], loading: true };
    }

    componentDidMount() {
        this.getData();
    }

    static renderChart(results) {
        const options = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Chart.js Line Chart',
                },
            },
        };

        const labels = [];
        const numList = [];
        for (let result of results) {
            labels.push(result.time);
            numList.push(result.cost_Of_Goods_Sold);
        }
        console.log(numList);
        const chartData = {
            labels,
            datasets: [
                {
                    label: 'Dataset 1',
                    data: numList,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
            ],
        };

        console.log(chartData);

        return (
            <Line options={options} data={chartData} />
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : LineChart.renderChart(this.state.bussinessResult);

        return (
            <div className="LineChart">
                {contents}
            </div>
        );
    }

    async getData() {
        const response = await fetch('api/BussinessResults/CompID/BSD');
        const data = await response.json();
        console.log(data);
        this.setState({ bussinessResult: data, loading: false });
    }
}
