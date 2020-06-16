/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

class FormDay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      mood: 0,
      temperature: 0,

    };
  }

  handleChangeDate = e => {
    this.setState({
      date: e.target.value,
    });
  }

  handleChangeMood = e => {
    this.setState({
      mood: e.target.value,
    });
  }

  handleChangeTemperature = e => {
    this.setState({
      temperature: e.target.value,
    });
  }

  handleSubmit(mood, temperature, date) {
    const { addTracking } = this.props;
    addTracking(mood, temperature, date);
  }

  render() {
    const { mood, temperature, date } = this.state;
    return (
      <form>
        <div>
          <label htmlFor="date">Date </label>
          <input
            id="date"
            type="date"
            name="date"
            value={date}
            onChange={this.handleChangeDate}
          />
          <label htmlFor="mood">Mood </label>
          <input
            id="mood"
            type="number"
            name="mood"
            value={mood}
            onChange={this.handleChangeMood}
          />
          <label htmlFor="temp">Temperature </label>
          <input
            id="temp"
            type="number"
            name="temp"
            value={temperature}
            onChange={this.handleChangeTemperature}
          />

          <button type="button" onClick={() => this.handleSubmit(mood, temperature, date)}>Add</button>
        </div>
      </form>
    );
  }
}

FormDay.propTypes = {
  addTracking: PropTypes.func,
};

FormDay.defaultProps = {
  addTracking: () => {},
};
export default FormDay;
