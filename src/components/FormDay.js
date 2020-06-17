/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
    const { actionToPerform, trackings, buttonId } = this.props;
    const track = trackings.filter(x => x.id.toString() === buttonId);

    return (
      <form className="day">
        <div>
          <label htmlFor="date">Date </label>
          <input
            id="date"
            type="date"
            name="date"
            value={buttonId === '0' ? date : track[0].date.slice(0, 10)}
            onChange={this.handleChangeDate}
          />
          <label htmlFor="mood">Mood </label>
          <input
            id="mood"
            type="number"
            name="mood"
            value={buttonId === '0' ? mood : track[0].mood}
            onChange={this.handleChangeMood}
          />
          <label htmlFor="temp">Temperature </label>
          <input
            id="temp"
            type="number"
            name="temp"
            value={buttonId === '0' ? temperature : track[0].temperature}
            onChange={this.handleChangeTemperature}
          />

          {actionToPerform === 'Add' && <button type="button" onClick={() => this.handleSubmit(mood, temperature, date)}>{actionToPerform}</button>}
          {actionToPerform === 'Save Changes' && <button type="button" onClick={() => this.handleEdit(mood, temperature, date)}>{actionToPerform}</button>}

        </div>
      </form>
    );
  }
}

FormDay.propTypes = {
  addTracking: PropTypes.func,
  buttonId: PropTypes.string,
  actionToPerform: PropTypes.string,
  trackings: PropTypes.array,
};

FormDay.defaultProps = {
  addTracking: () => {},
  actionToPerform: '',
  trackings: [],
  buttonId: '0',
};

const mapStateToProps = state => {
  console.log('State en formday', state);
  return ({
    user: state.user,
    trackings: state.tracking,
  });
};

export default connect(mapStateToProps, null)(FormDay);
