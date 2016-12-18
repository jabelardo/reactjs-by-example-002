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
    const selectedBooks = this.state.selectedBooks;
    const index = selectedBooks.indexOf(event.target.value);
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
    const errorMessage = this.renderError();
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
    const formData = {
      fullName: this.state.fullName,
      contactNumber: this.state.contactNumber,
      shippingAddress: this.state.shippingAddress
    };
    if (this.validateInput()) {
      this.props.updateFormData(formData)
    }
  }
   handleChange(event, attribute) {
      const newState = this.state;
      newState[attribute] = event.target.value;
      this.setState(newState);
  }
  render() {
    const errorMessage = this.renderError();
    const minutes = Math.floor(this.props.cartTimeout / 60);
    const seconds = this.props.cartTimeout - minutes * 60;
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
        <div className="well">
          <span className="glyphicon glyphicon-time" aria-hidden="true"/>&nbsp;
          You have {minutes} Minutes, {seconds} Seconds, before confirming order
        </div>
      </div>
    )
  }
}

class DeliveryDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deliveryOption: "Primary"
    }
  }
  handleChange(event) {
    this.setState({deliveryOption: event.target.value})
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.updateFormData(this.state)
  }
  render() {
    const minutes = Math.floor(this.props.cartTimeout / 60);
    const seconds = this.props.cartTimeout - minutes * 60;
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
        <div className="well">
          <span className="glyphicon glyphicon-time" aria-hidden="true"/>&nbsp;
          You have {minutes} Minutes, {seconds} Seconds, before confirming order
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
    const numberOfDays = (this.props.data.deliveryOption === 'Normal') ?
      "3 to 4" : "1 to 2";
    return (
      <div>
        <h2>Thank you for shopping with us {this.props.data.fullName}.</h2>
        <h4>
          You will soon get {this.props.data.selectedBooks.join(", ")} at &nbsp; 
          {this.props.data.shippingAddress} in approximately {numberOfDays} days.
        </h4>
      </div>
    )
  }
}

function withIntervals(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        intervals: []
      }
    }
    setInterval() {
      const intervals = this.state.intervals;
      intervals.push(setInterval.apply(null, arguments));
      this.setState({intervals: intervals})
    }
    componentWillUnmount() {
      this.state.intervals.map(clearInterval);
      this.setState({intervals: []})
    }
    render() {
      return <WrappedComponent {...this.props}/>
    }
  }
}

function withCartTimeout(WrappedComponent) {
  return class extends WrappedComponent {
    componentWillMount() {
      this.setInterval(this.decrementCartTimer.bind(this), 1000);
    }
    decrementCartTimer() {
      if (this.props.cartTimeout === 0) {
        this.props.alertCartTimeout();
      } else {
        this.props.updateCartTimeout(this.props.cartTimeout - 1);
      }
    }
    render() {
      return super.render()
    }
  }
}

const ShippingDetailsWithTimeout = withCartTimeout(withIntervals(ShippingDetails));
ShippingDetailsWithTimeout.propTypes = {
  alertCartTimeout: React.PropTypes.func.isRequired,
  updateCartTimeout: React.PropTypes.func.isRequired,
  cartTimeout: React.PropTypes.number.isRequired
};

const DeliveryDetailsWithTimeout = withCartTimeout(withIntervals(DeliveryDetails));
DeliveryDetailsWithTimeout.propTypes = {
  alertCartTimeout: React.PropTypes.func.isRequired,
  updateCartTimeout: React.PropTypes.func.isRequired,
  cartTimeout: React.PropTypes.number.isRequired
};

class BookStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentState: 1,
      formValues: {},
      cartTimeout: 10
    }
  }
  updateCartTimeout(timeout) {
    this.setState({cartTimeout: timeout})
  }
  alertCartTimeout(){
    this.setState({currentState: 10});
  }
  render() {
    switch (this.state.currentState) {
      case 10:
        /* Handle the case of Cart timeout */
        return <div><h2>Your cart timed out, Please try again!</h2></div>;
      case 5:
        return <Success data={this.state.formValues} />;
      case 4:
        return <Confirmation data={this.state.formValues}
                             updateFormData={(fromData) => this.updateFormData(fromData)}
                             cartTimeout={this.state.cartTimeout} />;
      case 3:
        return <DeliveryDetailsWithTimeout updateFormData={(fromData) => this.updateFormData(fromData)}
                                           cartTimeout={this.state.cartTimeout}
                                           updateCartTimeout={(timeout) => this.updateCartTimeout(timeout)}
                                           alertCartTimeout={() => this.alertCartTimeout()} />;
      case 2:
        return <ShippingDetailsWithTimeout updateFormData={(fromData) => this.updateFormData(fromData)}
                                           cartTimeout={this.state.cartTimeout}
                                           updateCartTimeout={(timeout) => this.updateCartTimeout(timeout)}
                                           alertCartTimeout={() => this.alertCartTimeout()} />;
      default:
      case 1:
        return <BookList updateFormData={(fromData) => this.updateFormData(fromData)} />
    }
  }
  updateFormData(fromData) {
    const formValues = Object.assign({}, this.state.formValues, fromData);
    const currentState = 1 + this.state.currentState;
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
