/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

class FormIllness extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
    };
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

  render() {
    const { name, description } = this.state;
    return (

      <form>
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
        <button type="button" onClick={() => this.handleSubmit(name, description)}>Add</button>
      </form>
    );
  }
}

FormIllness.propTypes = {
  addIllness: PropTypes.func,
};

FormIllness.defaultProps = {
  addIllness: () => {},
};

export default FormIllness;
