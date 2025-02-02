// @flow

import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import prepare from 'app/utils/prepare';
import { fetchList } from 'app/actions/EventActions';
import EventList from './components/EventList';
import { selectSortedEvents } from 'app/reducers/events';
import moment from 'moment-timezone';
import { selectPagination } from '../../reducers/selectors';
import createQueryString from 'app/utils/createQueryString';
import loadingIndicator from 'app/utils/loadingIndicator';

const mapStateToProps = (state, ownProps) => {
  const dateAfter = moment().format('YYYY-MM-DD');
  const query = { date_after: dateAfter };
  const queryString = createQueryString(query);
  const showFetchMore = selectPagination('events', { queryString });

  const user = ownProps.currentUser;
  const icalToken = user ? user.icalToken : null;
  const actionGrant = (state) => state.events.actionGrant;
  return {
    ...createStructuredSelector({
      showFetchMore,
      events: selectSortedEvents,
      actionGrant,
    })(state, ownProps),
    icalToken,
    notLoading: !state.events.fetching,
  };
};

const fetchData = ({
  refresh,
  loadNextPage,
}: { refresh?: boolean, loadNextPage?: boolean } = {}) =>
  fetchList({
    refresh,
    loadNextPage,
    dateAfter: moment().format('YYYY-MM-DD'),
  });

const mapDispatchToProps = {
  fetchMore: () => fetchData({ refresh: false, loadNextPage: true }),
  reload: () => fetchData({ refresh: true }),
};

export default compose(
  prepare((props, dispatch) => dispatch(fetchData())),
  connect(mapStateToProps, mapDispatchToProps),
  loadingIndicator(['notLoading'])
)(EventList);
