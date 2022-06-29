import React, { Component } from 'react';
import { CompanyList } from './CompanyList';
import { ProfitMargin } from './charts/ProfitMarginChart';
import { OperatingRevenue } from './charts/OperatingRevenueChart';
import { TotatDebt } from './charts/TotalDebtChart';
import { Statistic } from './statistics/Statistic';
import { NetWorth } from './charts/NetWorth';
import './Home.css';

export class Home extends Component {
  static displayName = Home.name;
    
  render () {
      return (
      <div className="container-fluid">
        <div className="row mt-2">
            <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
              <div class="position-sticky pt-3">
                <ul class="nav flex-column">
                  <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">
                      <span data-feather="home"></span>
                      Dashboard
                    </a>
                  </li>
                </ul>

                <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                  <span>Saved reports</span>
                  <a class="link-secondary" href="#" aria-label="Add a new report">
                    <span data-feather="plus-circle"></span>
                  </a>
                </h6>
                <ul class="nav flex-column mb-2">
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      <span data-feather="file-text"></span>
                      Template 1
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      <span data-feather="file-text"></span>
                      Template 2
                    </a>
                  </li>
                  <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <span>Companies List</span>
                    </h6>
                  <li className='nav-item' id="side-list">
                    <CompanyList></CompanyList>
                  </li>
                </ul>
              </div>
            </nav>
            <main className='col-md-10 ms-auto col-lg-10'>
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
            </main>
            
        </div>
      </div>
    );
  }
}
