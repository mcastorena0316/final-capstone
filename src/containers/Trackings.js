/* eslint-disable camelcase */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchIllnessDays, createDay, deleteDay } from '../actions/trackings';
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
      buttonId: '0',
    };
    this.createDate = this.createDate.bind(this);
    this.displayForm = this.displayForm.bind(this);
    this.displayEdit = this.displayEdit.bind(this);
    this.addTracking = this.addTracking.bind(this);
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
    return dateFormat.toLocaleDateString(undefined, options);
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

  displayEdit = e => {
    const { addEdit } = this.state;
    this.setState({
      addEdit: !addEdit,
      buttonId: e.target.id,
    });
  }

  render() {
    const { addForm, addEdit, buttonId } = this.state;
    const { trackings } = this.props;
    return (
      <div className="trackings">
        <h2>Information Illness</h2>
        <button type="button" className="add-day" onClick={this.displayForm}>+</button>
        {trackings.map(day => (
          <div key={day.id}>
            {!addEdit && (
            <div className="day">
              <div className="date">
                <p>{this.createDate(day.date)}</p>
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
              <ul className="medicines">
                {day.medicines && day.medicines.length > 0 && <h4>Medicines:</h4>}
                <div>
                  {day.medicines && day.medicines.map((x, i) => (
                    <li key={i}><p>{x}</p></li>))}
                </div>
              </ul>
              <ul className="symptons">
                {day.symptons && day.symptons.length > 0 && <h4>Symptons:</h4>}
                <div>
                  {day.symptons && day.symptons.map((x, i) => (
                    <li key={i}><p>{x}</p></li>))}
                </div>
              </ul>
            </div>
            )}
            {addEdit && buttonId === day.id.toString() && <FormDay actionToPerform="Save Changes" buttonId={buttonId} />}
          </div>
        ))}
        {addForm && <FormDay actionToPerform="Add" addTracking={this.addTracking} /> }
      </div>

    );
  }
}

const mapStateToProps = state =>
  // console.log('State en trackings', state);
  ({
    user: state.user,
    trackings: state.tracking,
  });
const mapDispatchToProps = dispatch => ({
  fetchIllnessDays: (datauser, dataillness) => dispatch(fetchIllnessDays(datauser, dataillness)),
  loginStatus: () => dispatch(loginStatus()),
  createDay: data => dispatch(createDay(data)),
  deleteDay: (id, id2) => dispatch(deleteDay(id, id2)),
});

Trackings.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
  fetchIllnessDays: PropTypes.func,
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

};

Trackings.defaultProps = {
  fetchIllnessDays: () => {},
  deleteDay: () => {},
  createDay: () => {},
  user: {},
  trackings: [],
};
export default connect(mapStateToProps, mapDispatchToProps)(Trackings);
