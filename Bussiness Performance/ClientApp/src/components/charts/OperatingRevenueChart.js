import React, { Component } from 'react';
import eventBus from '../ultilities/EventBus';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

export class OperatingRevenue extends Component {
    static displayName = OperatingRevenue.name;

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
                    text: 'Financial Operating Revenue (VND)'
                },
            },
        };

        let labels = [];
        let numList = [];
        for (let result of results) {
            labels.unshift(result.time);
            numList.unshift(result.financial_Operating_Revenue);
        }
        let companyName = `${results[0].companyID} - ${this.state.compName}`

        let chartData = {
            labels,
            datasets: [
                {
                    label: 'Financial Operating Revenue (VND)',
                    data: numList,
                    borderColor: 'rgb(54, 162, 235)',
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    skipNull: true,
                },
            ],
        };

        return (
            <Bar options={options} data={chartData} />
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
            <div className="BarChart chart bg-light rounded m-1 p-2">
                {contents}
            </div>
        );
    }

    async getData(id, name) {
        const response = await fetch(`api/BussinessResults/byID/${id}`);
        const data = await response.json();
        if (Object.keys(data).length === 0 && data.constructor === Object) {
            this.setState({ loading: 2 });
            return;
        }
        this.setState({ results: data, loading: 1, compName: name });
    }
}