/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchUserIllness, createIll } from '../actions/illness';
import { loginStatus } from '../actions/user';
import './Illness.css';

class Illness extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',

    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { user, fetchUserIllness } = this.props;
    const ID = user.user.id;
    fetchUserIllness(ID);
  }

  componentDidUpdate(prevProps) {
    const { illness } = this.props;
    if (illness !== prevProps.illness ) {
      const { user, fetchUserIllness } = this.props;
      const ID = user.user.id;
      fetchUserIllness(ID);
    }
  }

  handleChangeName = e => {
    this.setState({
      name: e.target.value,
    });
  }

  handleChangeDescription = e => {
    this.setState({
      description: e.target.value,
    });
  }

  handleSubmit= e => {
    e.preventDefault();
    const { name, description } = this.state;
    const { createIll, user } = this.props;
    const user_id = user.user.id;
    console.log('Im entering submit');
    createIll({ name, description, user_id });
  }

  displayForm = () => {
    const newIll = document.getElementById('newill');
    // eslint-disable-next-line no-unused-expressions
    newIll.style.display === 'none' ? newIll.style.display = 'flex' : newIll.style.display = 'none';
  }

  render() {
    const { illness } = this.props;
    const { name, description } = this.state;

    return (
      <div className="main">
        <button type="button" onClick={this.displayForm}>+</button>
        <h3>Your Illnesses</h3>

        <ul>
          {illness.map(ill => (
            <li key={ill.id}>
              <Link to={`illness/${ill.id}`}>
                <button key={ill.id} id={ill.id} type="button">
                  <p>
                    {ill.name}
                  </p>
                  <p>
                    Description:
                    {ill.description}
                  </p>
                </button>
              </Link>
            </li>
          ))}
        </ul>
        <div className="newill" id="newill">
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                placeholder="name"
                type="text"
                name="name"
                value={name}
                onChange={this.handleChangeName}
              />
            </div>
            <br />
            <div>
              <label htmlFor="description">Description:</label>
              <input
                id="description"
                placeholder="description"
                type="text"
                name="description"
                value={description}
                onChange={this.handleChangeDescription}
              />
            </div>
            <button type="submit">Add</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log('state de illness', state);
  return ({
    user: state.user,
    isLogin: state.user.isLogin,
    illness: state.illness,
  });
};

const mapDispatchToProps = dispatch => ({
  fetchUserIllness: data => dispatch(fetchUserIllness(data)),
  createIll: data => dispatch(createIll(data)),
  loginStatus: () => dispatch(loginStatus()),
});

Illness.propTypes = {
  fetchUserIllness: PropTypes.func,
  createIll: PropTypes.func,
  user: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
  illness: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string,
    name: PropTypes.string,
  })),
};

Illness.defaultProps = {
  createIll: () => {},
  fetchUserIllness: () => {},
  illness: {},
  user: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(Illness);
