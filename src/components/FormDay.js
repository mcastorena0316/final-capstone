/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './FormDay.css';

class FormDay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      // mood: 0,
      temperature: 0,
      selectedOption: '🙂',
    };
  }

  handleChangeDate = e => {
    this.setState({
      date: e.target.value,
    });
  }

  // handleChangeMood = e => {
  //   this.setState({
  //     mood: e.target.value,
  //   });
  // }

  handleChangeTemperature = e => {
    this.setState({
      temperature: e.target.value,
    });
  }

  handleOptionChange= e => {
    this.setState({
      selectedOption: e.target.value,
    });
  }

  handleSubmit(mood, temperature, date) {
    const { addTracking } = this.props;
    addTracking(mood, temperature, date);
  }

  render() {
    const {
      temperature, date, selectedOption,
    } = this.state;
    const { actionToPerform, trackings, buttonId } = this.props;
    const track = trackings.filter(x => x.id.toString() === buttonId);

    return (
      <form className="day">
        <div className="form-div">
          <div className="date-div">
            <label htmlFor="date">Date: </label>
            <input
              id="date"
              type="date"
              name="date"
              value={buttonId === '0' ? date : track[0].date.slice(0, 10)}
              onChange={this.handleChangeDate}
            />
          </div>
          <div>
            <label>Mood: </label>
            <input type="radio" id="option1" name="mood" value="🙂" checked={selectedOption === '🙂'} onChange={this.handleOptionChange} />
            <span role="img" aria-label="happy">🙂</span>
            <input type="radio" id="option2" name="mood" value="😐" checked={selectedOption === '😐'} onChange={this.handleOptionChange} />
            <span role="img" aria-label="neutral">😐</span>
            <input type="radio" id="option3" name="mood" value="🙁" checked={selectedOption === '🙁'} onChange={this.handleOptionChange} />
            <span role="img" aria-label="sad">🙁</span>
            <input type="radio" id="option4" name="mood" value="😩" checked={selectedOption === '😩'} onChange={this.handleOptionChange} />
            <span role="img" aria-label="sad2">😩</span>
          </div>
          <div className="temp-div">
            <label htmlFor="temp">Temperature:  </label>
            <input
              id="temp"
              type="number"
              name="temp"
              value={buttonId === '0' ? temperature : track[0].temperature}
              onChange={this.handleChangeTemperature}
            />
          </div>
          {actionToPerform === 'Add' && <button type="button" onClick={() => this.handleSubmit(selectedOption, temperature, date)}>{actionToPerform}</button>}
          {actionToPerform === 'Save Changes' && <button type="button" onClick={() => this.handleEdit(selectedOption, temperature, date)}>{actionToPerform}</button>}

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
