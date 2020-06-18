/* eslint-disable camelcase */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchIllnessDays, createDay, deleteDay } from '../actions/trackings';
import { fetchMedicines } from '../actions/medicines';

import { loginStatus } from '../actions/user';
import FormDay from '../components/FormDay';
import './Trackings.css';

class Trackings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ID: props.match.params.id,
      addForm: false,
      addEdit: false,
      addMeds: false,
      buttonId: '0',
    };
    this.createDate = this.createDate.bind(this);
    this.displayForm = this.displayForm.bind(this);
    this.displayEdit = this.displayEdit.bind(this);
    this.addTracking = this.addTracking.bind(this);
    this.changeEditForm = this.changeEditForm.bind(this);
    this.displayMeds = this.displayMeds.bind(this);
  }

  componentDidMount() {
    const {
      user, fetchIllnessDays,
    } = this.props;

    const { ID } = this.state;
    const userID = user.user.id;

    fetchIllnessDays(userID, ID);
  }

  createDate = date => {
    const dateFormat = new Date(date);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return dateFormat.toUTCString(undefined, options);
  }

  displayForm = () => {
    const { addForm } = this.state;
    this.setState({
      addForm: !addForm,
    });
  }

  addTracking = (mood, temperature, date) => {
    const { ID } = this.state;
    const { createDay } = this.props;
    const illness_id = ID;
    createDay({
      illness_id, mood, temperature, date,
    });
  }

  deleteTracking = id => {
    const { ID } = this.state;
    const { deleteDay } = this.props;
    const illness_id = ID;
    deleteDay({ illness_id, id });
  }

  changeEditForm = () => {
    const { addEdit } = this.state;
    this.setState({
      addEdit: !addEdit,
    });
  }

  displayMeds = (e, id) => {
    const { user, fetchMedicines } = this.props;
    const { addMeds } = this.state;
    const { ID } = this.state;
    const illnessId = ID;
    const userID = user.user.id;
    this.setState({
      addMeds: !addMeds,
      buttonId: e.target.id,
    });
    fetchMedicines(userID, illnessId, id);
  }

  displayEdit = e => {
    const { addEdit } = this.state;
    this.setState({
      addEdit: !addEdit,
      buttonId: e.target.id,
    });
  }

  render() {
    const {
      addForm, addEdit, buttonId, addMeds,
    } = this.state;
    const { trackings, medicines } = this.props;
    return (
      <div className="trackings">
        <h2>Information Illness</h2>
        <button type="button" className="add-day" onClick={this.displayForm}>+</button>
        {trackings.map(day => (
          <div key={day.id}>
            {!addEdit && (
            <div className="day">
              <div className="date">
                <p>{this.createDate(day.date).slice(0, 16)}</p>
                <div>
                  <button type="button" onClick={() => this.deleteTracking(day.id)}>
                    <i className="fa fa-trash-o" />
                  </button>
                  <button type="button" onClick={this.displayEdit}><i className="fa fa-pencil-square-o" id={day.id} /></button>
                </div>
              </div>
              <div className="mood">
                <p>
                  Mood:
                  {day.mood}
                </p>
                <p>
                  <i className="fa fa-thermometer-empty" />
                  Temperature:
                  {day.temperature}
                  ° C
                </p>
              </div>
              <button type="button" onClick={e => this.displayMeds(e, day.id)} id={day.id}>+</button>
              {addMeds && buttonId === day.id.toString() && medicines.length > 0 && medicines.map(med => (
                <ul className="medicines" key={med.id}>
                  <li>
                    {' '}
                    <p>Name: </p>
                    {med.name}
                  </li>

                  <li>
                    <p>Quantity: </p>
                    {med.quantity}
                  </li>
                </ul>
              ))}
                {addMeds && buttonId === day.id.toString() && medicines.length == 0 && (
                  <p>No meds!</p>
                )}
              {/* <ul className="symptons">
              </ul>  */}
            </div>
            )}
            {addEdit && buttonId === day.id.toString() && (
            <FormDay
              actionToPerform="Save Changes"
              buttonId={buttonId}
              changeEditForm={this.changeEditForm}
            />
            )}
          </div>
        ))}
        {addForm && <FormDay actionToPerform="Add" addTracking={this.addTracking} /> }
      </div>

    );
  }
}

const mapStateToProps = state => {
  // console.log('State en trackings', state);
  return ({
    user: state.user,
    trackings: state.tracking,
    medicines: state.medicines,
  });
};

const mapDispatchToProps = dispatch => ({
  fetchIllnessDays: (datauser, dataillness) => dispatch(fetchIllnessDays(datauser, dataillness)),
  loginStatus: () => dispatch(loginStatus()),
  createDay: data => dispatch(createDay(data)),
  deleteDay: (id, id2) => dispatch(deleteDay(id, id2)),
  fetchMedicines: (id1, id2, id3) => dispatch(fetchMedicines(id1, id2, id3)),
});

Trackings.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
  fetchIllnessDays: PropTypes.func,
  fetchMedicines: PropTypes.func,
  deleteDay: PropTypes.func,
  createDay: PropTypes.func,
  user: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
  trackings: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string,
    name: PropTypes.string,
  })),
  medicines: PropTypes.shape({
    name: PropTypes.string,
    quantity: PropTypes.number,

  }),

};

Trackings.defaultProps = {
  fetchIllnessDays: () => {},
  fetchMedicines: () => {},
  deleteDay: () => {},
  createDay: () => {},
  medicines: {},
  user: {},
  trackings: [],
};
export default connect(mapStateToProps, mapDispatchToProps)(Trackings);
