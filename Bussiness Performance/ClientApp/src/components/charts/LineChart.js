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

export class LineChart extends Component {
    static displayName = LineChart.name;

    constructor(props) {
        super(props);
        this.chartReference = React.createRef();
        this.state = { bussinessResult: [], loading: true, currComp: "AAA", data: [], label: []};
    }

    componentDidMount() {
        eventBus.on("compSelected", (data) => {
            this.setState({ bussinessResult: [], loading: true, currComp: data.ID })
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
                    text: 'Type of chart here',
                },
            },
        };

        let labels = [];
        let numList = [];
        for (let result of results) {
            labels.unshift(result.time);
            numList.unshift(result.cost_Of_Goods_Sold);
        }
        let chartData = {
            labels,
            datasets: [
                {
                    label: this.state.currComp,
                    data: numList,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
            ],
        };

        return (
            <Line options={options} data={chartData} />
        );
    }

    render() {
        let contents = this.state.loading
            ? <h4><em>Loading...</em></h4>
            : this.renderChart(this.state.bussinessResult);

        return (
            <div className="LineChart">
                {contents}
            </div>
        );
    }

    async getData() {
        const response = await fetch(`api/BussinessResults/CompID/${this.state.currComp}`);
        const data = await response.json();
        this.setState({ bussinessResult: data, loading: false });
    }
}
