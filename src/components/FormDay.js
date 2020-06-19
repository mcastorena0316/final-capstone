/* eslint-disable camelcase */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './FormDay.css';
import { updateDay } from '../actions/trackings';

class FormDay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '2020-06-01',
      temperature: 0,
      selectedOption: '🙂',
      medicine: ['', '', ''],
      symptons: [],
    };
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeTemperature = this.handleChangeTemperature.bind(this);
    this.handleChangeMedicine = this.handleChangeMedicine.bind(this);
    this.handleChangeSymptons = this.handleChangeSymptons.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount = () => {
    const { actionToPerform, buttonId, trackings } = this.props;
    // console.log(actionToPerform);
    if (actionToPerform === 'Save Changes') {
      const track = trackings.filter(x => x.id.toString() === buttonId);
      // console.log(track);
      this.setState({
        date: track[0].date,
        temperature: track[0].temperature,
        selectedOption: track[0].mood,
        medicine: track[0].medicines,
        symptons: track[0].symptons,
      });
    }
  }

  handleChangeDate = e => {
    this.setState({
      date: e.target.value,
    });
  }

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

  handleChangeMedicine = (e, index1) => {
    const { medicine } = this.state;
    medicine[index1] = e.target.value;
    this.setState({ medicine });
  }

  handleChangeSymptons = (e, index) => {
    const { symptons } = this.state;
    symptons[index] = e.target.value;
    this.setState({ symptons });
  }

  handleEdit = async (id, illness_id) => {
    const {
      date, temperature, selectedOption, medicine, symptons,
    } = this.state;
    const {
      user, updateDay, changeEditForm,
    } = this.props;
    const data = {
      id,
      user_id: user.user.id,
      illness_id,
      date,
      temperature,
      mood: selectedOption,
      medicines: medicine,
      symptons,
    };

    // console.log(data);
    await updateDay(data);
    changeEditForm();
  }

  handleSubmit(mood, temperature, date, medicine, symptons) {
    const { addTracking } = this.props;
    const medicines = medicine;
    addTracking(mood, temperature, date, medicines, symptons);
  }

  render() {
    const {
      temperature, date, selectedOption, medicine, symptons,
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
              defaultValue={buttonId === '0' ? date : track[0].date.slice(0, 10)}
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
              defaultValue={buttonId === '0' ? temperature : track[0].temperature}
              onChange={this.handleChangeTemperature}
            />
          </div>
          <div className="medicine">
            <p>Medicines:</p>

            <div>
              <label>Name:</label>
              <input
                id="med1"
                type="text"
                name="med1"
                defaultValue={buttonId === '0' ? '' : track[0].medicines[0]}
                placeholder="Put name and quantity"
                onChange={e => this.handleChangeMedicine(e, 0, 0)}

              />
            </div>
            <div>
              <label>Name</label>
              <input
                id="med2"
                type="text"
                name="med2"
                defaultValue={buttonId === '0' ? '' : track[0].medicines[1]}
                onChange={e => this.handleChangeMedicine(e, 1)}
              />
            </div>
            <div>
              <label>Name</label>
              <input
                id="med1"
                type="text"
                name="med2"
                defaultValue={buttonId === '0' ? '' : track[0].medicines[2]}
                onChange={e => this.handleChangeMedicine(e, 2)}
              />

            </div>
          </div>
          <div className="symptons">
            <p>Symptons</p>
            <div>
              <input
                id="symp1"
                type="text"
                name="symp1"
                defaultValue={buttonId === '0' ? '' : track[0].symptons[0]}
                onChange={e => this.handleChangeSymptons(e, 0)}
              />

              <input
                id="symp2"
                type="text"
                name="symp2"
                defaultValue={buttonId === '0' ? '' : track[0].symptons[1]}
                onChange={e => this.handleChangeSymptons(e, 1)}
              />

              <input
                id="symp3"
                type="text"
                name="symp3"
                defaultValue={buttonId === '0' ? '' : track[0].symptons[2]}
                onChange={e => this.handleChangeSymptons(e, 2)}
              />
            </div>
          </div>
          {actionToPerform === 'Add' && <button type="button" onClick={() => this.handleSubmit(selectedOption, temperature, date, medicine, symptons)}>{actionToPerform}</button>}
          {actionToPerform === 'Save Changes' && <button type="button" onClick={() => this.handleEdit(track[0].id, track[0].illness_id)}>{actionToPerform}</button>}

        </div>
      </form>
    );
  }
}

FormDay.propTypes = {
  addTracking: PropTypes.func,
  changeEditForm: PropTypes.func,
  updateDay: PropTypes.func,
  buttonId: PropTypes.string,
  actionToPerform: PropTypes.string,
  trackings: PropTypes.array,
  user: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

FormDay.defaultProps = {
  addTracking: () => {},
  updateDay: () => {},
  changeEditForm: () => {},
  actionToPerform: '',
  trackings: [],
  buttonId: '0',
  user: {},

};

const mapStateToProps = state => {
  console.log('State en formday', state);
  return ({
    user: state.user,
    trackings: state.tracking,
  });
};

const mapDispatchToProps = dispatch => ({
  updateDay: data => dispatch(updateDay(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormDay);
