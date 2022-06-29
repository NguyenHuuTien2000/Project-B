import React, { Component } from 'react';
import { ProfitMargin } from './charts/ProfitMarginChart';
import { OperatingRevenue } from './charts/OperatingRevenueChart';
import { TotatDebt } from './charts/TotalDebtChart';
import { Statistic } from './statistics/Statistic';
import { NetWorth } from './charts/NetWorth';

export class Template1 extends Component {
  static displayName = Template1.name;
    
  render () {
      return (
        <div className='container m-0 p-0 w-100'>
            <div className='row'>
                <div className="col-md-9">
                    <ProfitMargin />
                </div>
                <div className="col-md-3">
                    <Statistic />
                </div>
            </div>
            <div className='row'>
                <div className='col-md-12'>
                    <NetWorth />
                </div>
            </div>
            <div className='row'>
                <div className='col-md-6 me-0'>
                <OperatingRevenue />
                </div>
                <div className='col-md-6 ms-0'>
                <TotatDebt />
                </div>
            </div>
        </div>
    );
  }
}
