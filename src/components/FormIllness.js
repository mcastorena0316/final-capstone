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

  componentDidMount = () => {
    const { actionToPerform, buttonId, illness } = this.props;
    if (actionToPerform === 'Save Changes') {
      const ill = illness.filter(x => x.id.toString() === buttonId);
      // console.log(ill);
      this.setState({
        name: ill[0].name,
        description: ill[0].description,
      });
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

  handleSubmit= (name, description) => {
    const { addIllness } = this.props;
    addIllness(name, description);
  }

  handleUpdate = async id => {
    const { name, description } = this.state;

    const {
      user, updateIll, changeEditForm,
    } = this.props;

    const data = {
      id,
      user_id: user.user.id,
      name,
      description,
    };

    // console.log(data);

    await updateIll(data);
    changeEditForm();
  }

  render() {
    const { name, description } = this.state;
    const {
      actionToPerform, illness, buttonId, changeEditForm, changeAddForm,
    } = this.props;
    const ill = illness.filter(x => x.id.toString() === buttonId);
    return (
      <div>
        <h3>
          {actionToPerform}
          {' '}
          Illness
        </h3>
        <form
          className="one-form"
          onSubmit={
           actionToPerform === 'Add'
             ? () => this.handleSubmit(name, description) : () => this.handleUpdate(ill[0].id)
}
        >
          <div className="one-parameter">
            <label htmlFor="name">Name:</label>
            <input
              required
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
            <textarea
              id="description"
              placeholder="Description"
            // type="textarea"
              name="description"
              defaultValue={buttonId === '0' ? description : ill[0].description}
              onChange={this.handleChangeDescription}
            />
          </div>
          <div className="buttons-form">
            {actionToPerform === 'Add' && <button type="submit">{actionToPerform}</button>}
            {actionToPerform === 'Save Changes' && <button type="submit">{actionToPerform}</button>}
            {actionToPerform === 'Add' && <button type="button" onClick={changeAddForm}>Cancel</button>}
            {actionToPerform === 'Save Changes' && <button type="button" onClick={changeEditForm}>Cancel</button>}
          </div>
        </form>
      </div>
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
  user: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),

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

const mapStateToProps = state =>
  // console.log('State en formday', state);
  ({
    user: state.user,
    illness: state.illness,
  });
const mapDispatchToProps = dispatch => ({
  updateIll: data => dispatch(updateIll(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormIllness);
