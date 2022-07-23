import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/contacts/contacts-actions';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid'

class ContactForm extends Component {
  static propTypes = {
    name: PropTypes.string,
    number: PropTypes.string,
  };

  state = {
    name: '',
    number: '',
  };
    
  loginInputNameId = nanoid(); 
  loginInputNamberId = nanoid(); 
  
  hendleInputChange = event => {
    const { name, value } = event.currentTarget;

    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const addInputValue = contact =>
      contact.name === this.state.name || contact.number === this.state.number;

    if (this.props.items.some(addInputValue)) {
      alert(`Contact is already in contacts`);
      return;
    }

    this.props.onSubmit({...this.state})
    this.reset()
  };
    
  reset = () => {
    this.setState({ name: '', number: '' })
  };
  
  render() {
    const { name, number } = this.state;
      
    return (
      <form onSubmit = {this.handleSubmit}>
        <label htmlFor={this.loginInputNameId}>
          Name
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            id = {this.loginInputNameId}
            value={name}
            onChange = {this.hendleInputChange}
                
          />
        </label>

        <label htmlFor={this.loginInputNamberId}>
          Number
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            id = {this.loginInputNamberId}
            value={number}
            onChange = {this.hendleInputChange}
          />
        </label>
                  
        <button type="submit">Add contact</button>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  items: state.contacts.items,
});

const mapDispatchFromProps = dispatch => ({
  onSubmit: ({ name, number }) =>
    dispatch(actions.addContact({ name, number })),
});

export default connect(mapStateToProps, mapDispatchFromProps)(ContactForm);