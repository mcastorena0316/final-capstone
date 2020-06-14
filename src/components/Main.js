import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchUserIllness } from '../actions/illness';

class Main extends React.Component {
  componentDidMount() {
    const { user, fetchUserIllness } = this.props;
    const ID = user.user.id;
    fetchUserIllness(ID);
  }

  render() {
    const { illness } = this.props;

    return (
      <div>
        <p>Hi, here is a list of your latest sicknes</p>

        <ul>
          {illness.map(ill => (
            <li key={ill.id}>
              <p>{ill.name}</p>
              <p>{ill.description}</p>
            </li>
          ))}

        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  isLogin: state.user.isLogin,
  illness: state.illness,
});

const mapDispatchToProps = dispatch => ({
  fetchUserIllness: data => dispatch(fetchUserIllness(data)),
});

Main.propTypes = {
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

Main.defaultProps = {
  fetchUserIllness: () => {},
  illness: {},
  user: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
