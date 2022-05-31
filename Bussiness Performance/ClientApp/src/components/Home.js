import React, { Component } from 'react';
import { CompanyList } from './CompanyList';
import { LineChart } from './charts/LineChart';
import './Home.css';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <CompanyList />
        <LineChart />
      </div>
    );
  }
}
