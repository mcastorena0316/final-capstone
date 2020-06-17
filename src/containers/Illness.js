/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FormIllness from '../components/FormIllness';
import {
  fetchUserIllness, createIll, deleteIll, updateIll,
} from '../actions/illness';
import { loginStatus } from '../actions/user';
import './Illness.css';

class Illness extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addForm: false,
      editForm: false,
      name: '',
      description: '',
      idill: 0,
    };
    this.deleteIll = this.deleteIll.bind(this);
    this.displayForm = this.displayForm.bind(this);
    this.displayEdit = this.displayEdit.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { user, fetchUserIllness } = this.props;
    const ID = user.user.id;
    fetchUserIllness(ID);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { illness } = this.props;
    const {
      addForm, editForm,
      name, description,
    } = this.state;
    return illness !== nextProps.illness
    || addForm !== nextState.addForm
    || editForm !== nextState.editForm
    || name !== nextState.name || description !== nextState.description;
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

  displayEdit= () => {
    const { editForm } = this.state;
    this.setState({
      editForm: !editForm,
    });
  }

  deleteIll = id => {
    const { user } = this.props;
    const { deleteIll } = this.props;
    const user_id = user.user.id;
    deleteIll({ user_id, id });
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

handleSubmit = id => {
  const { name, description, editForm } = this.state;
  const { updateIll, user } = this.props;
  const data = {};
  if (name !== '' && description !== '') {
    data.name = name;
    data.description = description;
    data.user_id = user.user.id;
    data.id = id;
  } else if (name === '' && description !== '') {
    data.description = description;
    data.user_id = user.user.id;
    data.id = id;
  } else if (name !== '' && description === '') {
    data.name = name;
    data.id = id;
    data.user_id = user.user.id;
  }

  updateIll(data);
  this.setState({
    editForm: !editForm,
  });
}

render() {
  const { illness } = this.props;
  const { addForm, editForm } = this.state;
  return (
    <div className="main">
      <button type="button" className="add-ill" onClick={this.displayForm}>+</button>
      {/* <h3>Your Illnesses</h3> */}

      <div className="illnesses">
        {illness.map(ill => (
          <div key={ill.id} className="one-ill">
            <div className="buttons">
              <button type="button" onClick={() => this.deleteIll(ill.id)}>
                <i className="fa fa-trash-o" />
              </button>
              <button type="button" onClick={this.displayEdit}>
                <i className="fa fa-pencil-square-o" />
              </button>
            </div>
            <div>
              {/* <Link to={`illness/${ill.id}`}> */}
              {!editForm && <p>{ill.name}</p> }
              {editForm && (
              <input
                id={`name-${ill.id}`}
                placeholder="name"
                type="text"
                name="name"
                defaultValue={ill.name}
                onChange={this.handleChangeName}
              />
              )}
              {!editForm && (
              <div>
                <p>Description:</p>
                <p>{ill.description}</p>
              </div>
              ) }
              {editForm
                  && (
                    <div>
                      <label>Description: </label>
                      <input
                        id={`description-${ill.id}`}
                        placeholder="description"
                        type="text"
                        name="description"
                        defaultValue={ill.description}
                        onChange={this.handleChangeDescription}
                      />
                    </div>
                  )}
              {editForm && <button type="button" onClick={() => this.handleSubmit(ill.id)}>Save Changes</button>}

              {/* </Link> */}
            </div>
          </div>
        ))}
      </div>
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
  updateIll: data => dispatch(updateIll(data)),
});

Illness.propTypes = {
  fetchUserIllness: PropTypes.func,
  updateIll: PropTypes.func,
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
  updateIll: () => {},
  createIll: () => {},
  deleteIll: () => {},
  fetchUserIllness: () => {},
  illness: {},
  user: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(Illness);
