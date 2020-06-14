import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchIllnessDays } from '../actions/illness';
import './Illness.css';

class Illness extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ID: props.match.params.id,
    };
    this.createDate = this.createDate.bind(this);
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
    return dateFormat.toLocaleDateString(undefined, options);
  }

  render() {
    const { trackings } = this.props;
    return (
      <div className="trackings">
        <h1>Information Illness</h1>
        <ul>
          {trackings.map(day => (
            <li key={day.id}>
              <p>{this.createDate(day.date)}</p>
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
