import { connect } from 'react-redux';
import Table from './table';
import { fetchStats } from '../../actions/leaderboard_actions';

const mapStateToProps = state => ({
  leaderboard: Object.values(state.leaderboard)
});

const mapDispatchToProps = dispatch => ({
  fetchStats: () => dispatch(fetchStats())
});

export default connect( mapStateToProps, mapDispatchToProps )( Table );
