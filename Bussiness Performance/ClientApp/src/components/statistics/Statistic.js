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

    fillInData(results) {
        const totalExpense = <div>results.totalExpense</div>
        return (<div>
            totalExpense
            
        </div>);
    } 



    async getData(id, name) {
        const response = await fetch(`api/BussinessResults/TotalExpense/${id}`);
        const data = await response.json();
        if (Object.keys(data).length === 0 && data.constructor === Object) {
            this.setState({ loading: 2 });
            return;
        }
        this.setState({ results: data, loading: 1, compName: name });
    }
}