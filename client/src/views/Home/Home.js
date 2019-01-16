import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import './Home.css';
import {PostData} from '../../services/PostData';
import { SanAlert } from '../Alert/SanAlert'

const getBase64 = (file) => {
  return new Promise((resolve,reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data:[],
      product_name: '',
      price: '',
      description: '',
      images: '',
      redirectToReferrer: false,
    };
    this.getUserFeed = this
    .getUserFeed
    .bind(this);
    this.onChange = this.onChange.bind(this);
    this.convertTime = this.convertTime.bind(this);
    this.add_product = this.add_product.bind(this);
    this.logout = this.logout.bind(this);
  }

  add_product() {
    if(this.state.product_name && this.state.price){
      PostData('products/add_product',this.state).then((result) => {
        let responseJson = result;
        if(responseJson.userData){
          // sessionStorage.setItem('userData',JSON.stringify(responseJson));
          // this.setState({redirectToReferrer: true});
        }
      });
    }
  }

  imageUpload = (e) => {
    const file = e.target.files[0];
    getBase64(file).then(base64 => {
      this.setState({images:base64});
    });
  }

  convertTime(created) {
    let date = new Date(created * 1000);
    return date;
  }

  getUserFeed() {
    let data = JSON.parse(sessionStorage.getItem("userData"));
    this.setState({name:data.userData.name});
    let postData = { user_id: data.userData.user_id, token: data.userData.token};
    if (data) {
      PostData('feed', postData).then((result) => {
        let responseJson = result;
        this.setState({data: responseJson.feedData});
      });
    }

  }

  onChange(e){
    this.setState({[e.target.name]:e.target.value});
  }
  logout(){
    sessionStorage.setItem("userData",'');
    sessionStorage.clear();
    this.setState({redirectToReferrer: true});
  }

  render() {
    if (this.state.redirectToReferrer) {
      return (<Redirect to={'/login'}/>)
    }
    return (
      <div className="container">
      <div className="row">
      <div className="col-md-6">
      <h1>Add Product</h1>
      </div>
      </div>
      <div className="row">
      <div className="col-md-6">
      <div className="form-group">
      <label for="productname" className="loginFormElement">Product Name:</label>
      <input className="form-control" id="productname" type="text" name="product_name" onChange={this.onChange} />
      </div>
      <div className="form-group">
      <label for="productprice" className="loginFormElement">Product Price</label>
      <input className="form-control" id="productprice" type="text" name="price" onChange={this.onChange}/>
      </div>
      <div className="form-group">
      <label className="control-label">Product Image</label>
      <input className="filestyle" data-icon="false" type="file" name="image" onChange={this.imageUpload} />
      </div>
      <div className="form-group">
      <label className="loginformelement" for="productdescription">Product Description</label>
      <textarea className="form-control" rows="5" id="comment" name="description" onChange={this.onChange} ></textarea>
      <div className="container">
      </div>
      <button type="button" id="loginSubmit" className="btn btn-success loginFormElement" onClick={this.add_product}>Add Product</button>
      </div>
      </div>
      </div>
      </div>
    );
  }
}

export default Home;
