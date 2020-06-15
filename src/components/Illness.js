/* eslint-disable react/jsx-key */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchUserIllness } from '../actions/illness';
import './Illness.css';

class Illness extends React.Component {
  componentDidMount() {
    const { user, fetchUserIllness } = this.props;
    const ID = user.user.id;
    fetchUserIllness(ID);
  }

  render() {
    const { illness } = this.props;

    return (
      <div className="main">
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
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return ({
    user: state.user,
    isLogin: state.user.isLogin,
    illness: state.illness,
  });
};

const mapDispatchToProps = dispatch => ({
  fetchUserIllness: data => dispatch(fetchUserIllness(data)),
});

Illness.propTypes = {
  fetchUserIllness: PropTypes.func,
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
  fetchUserIllness: () => {},
  illness: {},
  user: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(Illness);
