import React, { Component } from 'react';
import { CompanyList } from './CompanyList';
import eventBus from './ultilities/EventBus';
import { Template1 } from './Template1';
import { Template2 } from './Template2';
import './Home.css';

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = { temp : 1};
  }

  selectTemplate(num) {
    this.setState({temp: num});
  }

  sendCompanyID(id, name) {
    eventBus.dispatch("compSelected", { ID: id, Name: name });
}
    
  render () {
      let content = this.state.temp === 1 ? <Template1 /> : <Template2/>

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
                    <button class="nav-link" className='btn' onClick={() => this.selectTemplate(1)}>
                      <span data-feather="file-text"></span>
                      Template 1
                    </button>
                  </li>
                  <li class="nav-item">
                    <button class="nav-link" className='btn' onClick={() => this.selectTemplate(2)}>
                      <span data-feather="file-text"></span>
                      Template 2
                    </button>
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
              {content}
            </main>
        </div>
      </div>
    );
  }
}
