/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FormIllness from '../components/FormIllness';
import { fetchUserIllness, createIll, deleteIll } from '../actions/illness';
import { loginStatus } from '../actions/user';
import './Illness.css';

class Illness extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addForm: false,
    };
    this.deleteIll = this.deleteIll.bind(this);
    this.displayForm = this.displayForm.bind(this);
  }

  componentDidMount() {
    const { user, fetchUserIllness } = this.props;
    const ID = user.user.id;
    fetchUserIllness(ID);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { illness } = this.props;

    const { addForm } = this.state;
    return illness !== nextProps.illness || addForm !== nextState.addForm;
  }

  addIllness = (name, description) => {
    const { createIll, user } = this.props;
    const user_id = user.user.id;
    createIll({ name, description, user_id });
  };

  displayForm = () => {
    const { addForm } = this.state;
    this.setState({
      addForm: !addForm,
    });
  }

  deleteIll = id => {
    const { user } = this.props;
    const { deleteIll } = this.props;
    const user_id = user.user.id;
    deleteIll({ user_id, id });
  }

  render() {
    const { illness } = this.props;
    const { addForm } = this.state;
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
              <button type="button" onClick={() => this.deleteIll(ill.id)}>
                <i className="fa fa-trash-o" />
              </button>
              <button type="button"><i className="fa fa-pencil-square-o" /></button>
            </li>
          ))}
        </ul>
        <div className="newill">
          {addForm && <FormIllness addIllness={this.addIllness} />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state =>
  // console.log('state de illness', state);
  ({
    user: state.user,
    isLogin: state.user.isLogin,
    illness: state.illness,
  });
const mapDispatchToProps = dispatch => ({
  fetchUserIllness: data => dispatch(fetchUserIllness(data)),
  createIll: data => dispatch(createIll(data)),
  deleteIll: id => dispatch(deleteIll(id)),
  loginStatus: () => dispatch(loginStatus()),
});

Illness.propTypes = {
  fetchUserIllness: PropTypes.func,
  createIll: PropTypes.func,
  deleteIll: PropTypes.func,
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
  deleteIll: () => {},
  fetchUserIllness: () => {},
  illness: {},
  user: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(Illness);
