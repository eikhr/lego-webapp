// @flow

import { reducer as formReducer } from 'redux-form';
import { Event } from '../actions/ActionTypes';
import moment from 'moment-timezone';

export default formReducer.plugin({
  eventEditor: (state, action) => {
    switch (action.type) {
      case '@@redux-form/CHANGE':
        if (action.meta.field == 'eventStatusType') {
          switch (action.payload) {
            case 'INFINITY':
              return {
                ...state,
                values: {
                  ...state.values,
                  pools: [
                    {
                      name: 'Uendelig Plasser',
                      registrations: [],
                      activationDate: moment(event.startTime)
                        .subtract(7, 'd')
                        .hour(12)
                        .minute(0)
                        .toISOString(),
                      permissionGroups: []
                    }
                  ]
                }
              };
            default:
              return {
                ...state,
                values: {
                  ...state.values,
                  pools: []
                }
              };
          }
        }
        return state;
      default:
        return state;
    }
  },

  joinEvent: (state, action) => {
    switch (action.type) {
      case Event.REQUEST_REGISTER.BEGIN:
      case Event.REQUEST_UNREGISTER.BEGIN: {
        return {
          ...state,
          userId: action.meta.userId,
          submitting: true
        };
      }
      case Event.REQUEST_REGISTER.FAILURE:
      case Event.REQUEST_UNREGISTER.FAILURE: {
        return {
          ...state,
          submitting: false,
          submitSucceeded: false
        };
      }
      case Event.SOCKET_UNREGISTRATION.SUCCESS:
      case Event.SOCKET_REGISTRATION.SUCCESS: {
        if (!state) return;
        if (action.payload.user.id !== state.userId) {
          return state;
        }
        return {
          ...state,
          submitting: false,
          submitSucceeded: true
        };
      }
      case Event.SOCKET_REGISTRATION.FAILURE:
      case Event.SOCKET_UNREGISTRATION.FAILURE: {
        if (!state) return;
        if (action.payload.id !== state.registrationId) {
          return state;
        }
        return {
          ...state,
          registrationId: null,
          submitting: false,
          submitSucceeded: false
        };
      }
      default:
        return state;
    }
  }
});
