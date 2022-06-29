import React, { Component } from 'react';
import { Statistic } from './statistics/Statistic';
import { ROEA } from './charts/RoeRoaChart';

export class Template2 extends Component {
  static displayName = Template2.name;
    
  render () {
      return (
        <div className='container m-0 p-0 w-100'>
            <div className='row'>
                <div className="col-md-9">
                    <ROEA/>
                </div>
                <div className="col-md-3">
                    <Statistic />
                </div>
            </div>
            <div className='row'>
                <div className='col-md-12'>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-6 me-0'>
                </div>
                <div className='col-md-6 ms-0'>
                </div>
            </div>
        </div>
    );
  }
}