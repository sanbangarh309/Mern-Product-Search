import React, { Component } from 'react';

import './css/bootstrap.min.css';
import './css/metisMenu.min.css';
import './css/timeline.css';
import './css/startmin.css';
import './css/morris.css';
import './css/font-awesome.min.css';
import './css/Header.css';

class Header extends Component {
  render() {
    return (
        <header id="header">
        <div className="container">
    	<div className="row">
      		<div className="col-md-12">
       		<h1>Admin Add Product</h1>
          	</div>
      	</div>
    <div className="navbar navbar-inverse">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
        </div>
        <div className="collapse navbar-collapse">
          <ul className="nav navbar-nav">
            <li><a href="./">Home</a></li>
            <li className="active"><a href="./">Add Product</a></li>
            <li><a href="./products">Product Listing</a></li>
          </ul>
        </div>
      </div>
    </div>
    </div>
	</header>
    );
  }
}

export default Header;
