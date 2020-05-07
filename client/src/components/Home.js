import React, {Component} from 'react';
import Layout from  './Layout';
import Sidebar from './Sidebar';

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <Layout />
        <Sidebar />
      </div>
    );
  }
}
