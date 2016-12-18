import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
//import { Navbar, Jumbotron, Button } from 'react-bootstrap';

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [
        { name: 'Zero to One', author: 'Peter Thiel' },
        { name: 'Monk who sold his Ferrari', author: 'Robin Sharma' },
        { name: 'Wings of Fire', author: 'A.P.J. Abdul Kalam' }
      ],
      selectedBooks: [],
      error: false
    }
  }
  renderError() {
    if (this.state.error) {
      return (
        <div className="alert alert-danger">
          {this.state.error}
        </div>
      )
    }
  }
  renderBook(book, index) {
    return(
      <div className="checkbox" key={index} >
        <label>
          <input type="checkbox" value={book.name}
            onChange={(event) => this.handleSelectBook(event)}/> {book.name} -- {book.author}
        </label>
      </div>
    )
  }
  handleSelectBook(event) {
    let selectedBooks = this.state.selectedBooks;
    let index = selectedBooks.indexOf(event.target.value);
    if (event.target.checked) {
      if (index === -1) selectedBooks.push(event.target.value);
    } else {
      selectedBooks.splice(index, 1);
    }
    this.setState({selectedBooks: selectedBooks})
  }
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.selectedBooks.length === 0) {
      this.setState({error: 'Please choose at least one book to continue'})
    } else {
      this.setState({error: false});
      this.props.updateFormData({selectedBooks: this.state.selectedBooks})
    }
  }
  render() {
    let errorMessage = this.renderError();
    return (
      <div>
        <h3>Choose from wide variety of books available in our store.</h3>
        {errorMessage}
        <form onSubmit={(event) => this.handleSubmit(event)}>
          {this.state.books.map((book, index) => {
            return this.renderBook(book, index)
          })}
          <input type="submit" className="btn btn-success" />
        </form>
      </div>
    )
  }
}

class ShippingDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      contactNumber: '',
      shippingAddress: '',
      error: false
    }
  }
  renderError() {
    if (this.state.error) {
      return (
        <div className="alert alert-danger">
          {this.state.error}
        </div>
      )
    }
  }
  validateInput() {
    if (this.state.fullName === '') {
      this.setState({error: "Please enter full name"});
    } else if (this.state.contactNumber === '') {
      this.setState({error: "Please enter contact number"});
    } else if (this.state.shippingAddress === '') {
      this.setState({error: "Please enter shipping address"});
    } else {
      this.setState({error: false});
      return true;
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    let formData = {
      fullName: this.state.fullName,
      contactNumber: this.state.contactNumber,
      shippingAddress: this.state.shippingAddress
    };
    if (this.validateInput()) {
      this.props.updateFormData(formData)
    }
  }
   handleChange(event, attribute) {
      let newState = this.state;
      newState[attribute] = event.target.value;
      this.setState(newState);
      // console.log(this.state);
  }
  render() {
    let errorMessage = this.renderError();
    return (
      <div>
        <h1>Enter your shipping information.</h1>
        {errorMessage}
        <div style={{width: 200}}>
          <form onSubmit={(event) => this.handleSubmit(event)}>
            <div className="form-group">
              <input className="form-control"
                  type="text"
                  placeholder="Full Name"
                  value={this.state.fullName}
                  onChange={(event) => this.handleChange(event, 'fullName')} />
            </div>
            <div className="form-group">
              <input className="form-control"
                  type="text"
                  placeholder="Contact number"
                  value={this.state.contactNumber}
                  onChange={(event) => this.handleChange(event, 'contactNumber')}/>
              </div>
            <div className="form-group">
              <input className="form-control"
                  type="text"
                  placeholder="Shipping Address"
                  value={this.state.shippingAddress}
                  onChange={(event) => this.handleChange(event, 'shippingAddress')} />
            </div>
            <div className="form-group">
              <button type="submit"
                  ref="submit"
                  className="btn btn-success">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

class DeliveryDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {deliveryOption: "Primary"}
  }
  handleChange(event) {
    this.setState({deliveryOption: event.target.value})
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.updateFormData(this.state)
  }
  render() {
    return (
      <div>
        <h1>Choose your delivery options here.</h1>
        <div style={{width:200}}>
          <form onSubmit={(event) => this.handleSubmit(event)}>
            <div className="radio">
              <label>
                <input type="radio"
                    checked={this.state.deliveryOption === "Primary"}
                    value="Primary"
                    onChange={(event) => this.handleChange(event)} />
                  Primary -- Next day delivery
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio"
                    checked={this.state.deliveryOption === "Normal"}
                    value="Normal"
                    onChange={(event) => this.handleChange(event)} />
                Normal -- 3-4 days
              </label>
            </div>
            <button className="btn btn-success">
              Submit
            </button>
          </form>
        </div>
      </div>
    )
  }
}

class Confirmation extends Component {
  handleSubmit(event) {
    event.preventDefault();
    this.props.updateFormData(this.props.data)
  }
  render() {
    return (
      <div>
        <h1>Are you sure you want to submit the data?</h1>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <div>
            <strong>Full Name</strong> : { this.props.data.fullName }
          </div><br/>
          <div>
            <strong>Contact Number</strong> : { this.props.data.contactNumber }
          </div><br/>
          <div>
            <strong>Shipping Address</strong> : { this.props.data.shippingAddress }
          </div><br/>
          <div>
            <strong>Selected books</strong> : { this.props.data.selectedBooks.join(", ") }
          </div><br/>
          <button className="btn btn-success">
            Place order
          </button>
        </form>
      </div>
    )
  }
}

class Success extends Component {
  render() {
    let numberOfDays = (this.props.data.deliveryOption === 'Normal') ?
      "3 to 4" : "1 to 2";
    return (
      <div>
        <h2>Thank you for shopping with us {this.props.data.fullName}.</h2>
        <h4>
          You will soon get {this.props.data.selectedBooks.join(", ")} at &nbsp; 
          {this.props.data.shippingAddress} in approrximately {numberOfDays} days.
        </h4>
      </div>
    )
  }
}

class BookStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentState: 1,
      formValues: {}
    }
  }
  render() {
    switch (this.state.currentState) {
      case 5: return <Success data={this.state.formValues} />;
      case 4: return <Confirmation data={this.state.formValues} updateFormData={(fromData) => this.updateFormData(fromData)} />;
      case 2: return <ShippingDetails updateFormData={(fromData) => this.updateFormData(fromData)} />;
      case 3: return <DeliveryDetails updateFormData={(fromData) => this.updateFormData(fromData)} />;
      default:
      case 1: return <BookList updateFormData={(fromData) => this.updateFormData(fromData)} />
    }
  }
  updateFormData(fromData) {
    let formValues = Object.assign({}, this.state.formValues, fromData);
    let currentState = 1 + this.state.currentState;
    this.setState({currentState: currentState, formValues: formValues})
  }
}

class App extends Component {
  render() {
    return (
      <BookStore />
    );
  }
}

export default App;
