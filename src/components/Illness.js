import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchIllnessDays } from '../actions/illness';

class Illness extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ID: props.match.params.id,
    };
  }

  componentDidMount() {
    const {
      user, fetchIllnessDays,
    } = this.props;
    const { ID } = this.state;
    const userID = user.user.id;

    fetchIllnessDays(userID, ID);
  }

  render() {
    const { trackings } = this.props;
    console.log(trackings);
    return (
      <div>
        <ul>
          {trackings.map(day => (
            <li key={day.id}>

              <p>
                Mood:
                {' '}
                {day.mood}
              </p>
              <p>
                Temperature:
                {day.temperature}
              </p>

            </li>

          ))}

        </ul>
      </div>

    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  trackings: state.illness,
});

const mapDispatchToProps = dispatch => ({
  fetchIllnessDays: (datauser, dataillness) => dispatch(fetchIllnessDays(datauser, dataillness)),
});

Illness.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
  fetchIllnessDays: PropTypes.func,
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

Illness.defaultProps = {
  fetchIllnessDays: () => {},
  user: {},
  trackings: [],
};
export default connect(mapStateToProps, mapDispatchToProps)(Illness);
