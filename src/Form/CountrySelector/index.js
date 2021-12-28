import React, { Component } from 'react';
import Select from 'react-select'
import countryList from 'react-select-country-list'
 
class CountrySelector extends Component {
  constructor(props) {
    super(props)
 
    this.options = countryList().getData()
 
    this.state = {
      options: this.options,
      value: this.props.value,
    }
  }

  render() {
    return (
      <Select
        options={this.state.options}
        value={this.props.value}
        onChange={this.props.onChange}
      />
    )
  }
}

export default CountrySelector;