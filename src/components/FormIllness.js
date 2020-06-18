/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import './FormIllness.css';
import { connect } from 'react-redux';
import { updateIll } from '../actions/illness';

class FormIllness extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
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

  handleSubmit= (name, description) => {
    const { addIllness } = this.props;
    addIllness(name, description);
  }

  handleUpdate = async id => {
    const { name, description } = this.state;

    const {
      user, updateIll, changeEditForm,
    } = this.props;
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
    await updateIll(data);
    changeEditForm();
  }

  render() {
    const { name, description } = this.state;
    const { actionToPerform, illness, buttonId } = this.props;
    const ill = illness.filter(x => x.id.toString() === buttonId);
    return (

      <form className="one-form one-ill">
        <div className="one-parameter">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            placeholder="Name"
            type="text"
            name="name"
            defaultValue={buttonId === '0' ? name : ill[0].name}
            onChange={this.handleChangeName}
          />
        </div>
        <div className="one-parameter">
          <label htmlFor="description">Description:</label>
          <input
            id="description"
            placeholder="Description"
            type="text"
            name="description"
            defaultValue={buttonId === '0' ? description : ill[0].description}
            onChange={this.handleChangeDescription}
          />
        </div>
        {actionToPerform === 'Add' && <button type="button" onClick={() => this.handleSubmit(name, description)}>{actionToPerform}</button>}
        {actionToPerform === 'Save Changes' && <button type="button" onClick={() => this.handleUpdate(ill[0].id)}>{actionToPerform}</button>}

      </form>
    );
  }
}

FormIllness.propTypes = {
  addIllness: PropTypes.func,
  actionToPerform: PropTypes.string,
  illness: PropTypes.array,
  buttonId: PropTypes.string,
  updateIll: PropTypes.func,
  changeEditForm: PropTypes.func,
  user: PropTypes.shape({}),

};

FormIllness.defaultProps = {
  addIllness: () => {},
  actionToPerform: '',
  illness: [],
  buttonId: '0',
  updateIll: () => {},
  changeEditForm: () => {},
  user: {},
};

const mapStateToProps = state => {
  // console.log('State en formday', state);
  return ({
    user: state.user,
    illness: state.illness,
  });
};

const mapDispatchToProps = dispatch => ({
  updateIll: data => dispatch(updateIll(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormIllness);
