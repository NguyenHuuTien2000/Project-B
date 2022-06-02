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
        this.state = { bussinessResult: [], loading: 0};
    }

    componentDidMount() {
        eventBus.on("compSelected", (data) => {
            this.getData(data.ID)
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
                    label: results[0].companyID,
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
                contents = this.renderChart(this.state.bussinessResult);
        }
        
        return (
            <div className="LineChart">
                {contents}
            </div>
        );
    }

    async getData(id) {
        const response = await fetch(`api/BussinessResults/byID/${id}`);
        const data = await response.json();
        if (Object.keys(data).length === 0 && data.constructor === Object) {
            this.setState({ loading: 2 });
            return;
        }
        this.setState({ bussinessResult: data, loading: 1 });
    }
}
