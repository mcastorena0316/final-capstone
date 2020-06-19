/* eslint-disable camelcase */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
      addMore: false,
    };
    this.createDate = this.createDate.bind(this);
    this.displayForm = this.displayForm.bind(this);
    this.displayEdit = this.displayEdit.bind(this);
    this.displayMore = this.displayMore.bind(this);
    this.addTracking = this.addTracking.bind(this);
    this.changeEditForm = this.changeEditForm.bind(this);
    this.deleteTracking = this.deleteTracking.bind(this);
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

  addTracking = (mood, temperature, date, medicines, symptons) => {
    const { ID } = this.state;
    const { createDay } = this.props;
    const illness_id = ID;
    createDay({
      illness_id, mood, temperature, date, medicines, symptons,
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

  changeAddForm = () => {
    const { addForm } = this.state;
    this.setState({
      addForm: !addForm,
    });
  }

  displayEdit = e => {
    const { addEdit } = this.state;
    this.setState({
      addEdit: !addEdit,
      buttonId: e.target.id,
    });
  }

  displayMore = e => {
    const { addMore } = this.state;
    this.setState({
      addMore: !addMore,
      buttonId: e.target.id,
    });
  }

  render() {
    const {
      addForm, addEdit, buttonId, addMore,
    } = this.state;
    const { trackings } = this.props;

    return (
      <div className="trackings">
        <button type="button" className="add-day" onClick={this.displayForm}>+</button>
        <Link to="/main">

          <button type="button" className="go-back" onClick={this.displayForm}>
            <i className="fa fa-arrow-left" aria-hidden="true" />

          </button>
        </Link>

        {trackings.map(day => (
          <div key={day.id}>
            {!addEdit && !addForm && (
              <div>
                <h3>Tracking of Illness: </h3>

                <div className="day">
                  <div className="date">

                    <p>
                      {' '}
                      <i className="fa fa-calendar" aria-hidden="true" />
                      {this.createDate(day.date).slice(0, 16)}
                    </p>
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
                    </p>
                    <p>{day.mood}</p>
                  </div>
                  <div className="temp">
                    <p>
                      Temperature:
                    </p>
                    <p>
                      <i className="fa fa-thermometer-empty" />
                      {day.temperature}
                      ° C
                    </p>
                  </div>

                  <button type="button" onClick={this.displayMore} id={day.id} className="more">▼</button>
                  {addMore && buttonId === day.id.toString() && (
                  <div className="meds-symp">
                    <ul className="medicines">
                      {day.medicines && <p>Medicines:</p>}
                      <div className="med-list">
                        {day.medicines && day.medicines.map((x, i) => (
                          x !== '' ? (
                            <li key={i}>
                              <span role="img" aria-label="pill">💊</span>
                              {x}
                            </li>
                          ) : null
                        ))}
                      </div>
                    </ul>
                    <ul className="symptons">
                      {day.symptons && <p>Symptons:</p>}
                      <div className="symp-list">
                        {day.symptons && day.symptons.map((x, i) => (
                          x !== '' ? <li key={i}>{x}</li> : null))}
                      </div>
                    </ul>
                  </div>
                  )}
                </div>
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
        {addForm && <FormDay actionToPerform="Add" addTracking={this.addTracking} changeAddForm={this.changeAddForm} /> }
      </div>

    );
  }
}

const mapStateToProps = state => {
  console.log('State en trackings', state);
  return ({
    user: state.user,
    trackings: state.tracking,
  });
};
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
