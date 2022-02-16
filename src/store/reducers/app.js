import {
  GET_INSTALL_REQUEST,
  GET_INSTALL_FAILURE,
  GET_INSTALL_SUCCESS,
  GET_HOME_SUCCESS,
  GET_HOME_FAILURE,
  GET_HOME_REQUEST,
  GET_FAV_SUCCESS,
  GET_FAV_REQUEST,
  GET_FAV_FAILURE,
  GET_FOODS_FAILURE,
  GET_FOODS_REQUEST,
  GET_FOODS_SUCCESS,
  GET_MOST_ORDER_FOODS_FAILURE,
  GET_MOST_ORDER_FOODS_REQUEST,
  GET_MOST_ORDER_FOODS_SUCCESS,
  GET_ORDERS_FAILURE,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_NOTIFICATIONS_FAILURE,
  GET_NOTIFICATIONS_REQUEST,
  GET_NOTIFICATIONS_SUCCESS,
  GET_CATEGORIES_FAILURE,
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  READ_NOTIFICATION_SUCCESS,
  GET_LOCATIONS_REQUEST,
  GET_LOCATIONS_FAILURE,
  GET_LOCATIONS_SUCCESS,
  TOGGLE_FAV_SUCCESS,
  GET_TICKETS_REQUEST,
  GET_TICKETS_SUCCESS,
  GET_TICKETS_FAILURE,
  GET_MORE_FOODS_REQUEST,
  GET_MORE_FOODS_SUCCESS,
  GET_MORE_FOODS_FAILURE,
  HAS_PAYMENT_SUCCESS,
  HAS_PAYMENT_FAILURE,
  ADD_PAYMENT_FAILURE,
  ADD_PAYMENT_SUCCESS,
  ADD_PAYMENT_REQUEST,
  STORE_ORDER_SUCCESS,
  STORE_ORDER_REQUEST
} from '../actions/types';

const INITIAL_STATE = {
  appData: undefined,
  providers: undefined,
  favourites: undefined,
  orders: undefined,
  foods: [],
  searchProducts: undefined,
  notifications: undefined,
  categories: undefined,
  mostOrderFoods: undefined,
  locations: undefined,
  tickets: undefined,
  loadingNotifications: false,
  loadingHome: false,
  loadingOrders: false,
  loadingFav: false,
  loadingFoods: false,
  loadingMostOrder: false,
  loadingLocation: false,
  loadingTickets: false,
  loadingMore: false,
  pagingProducts: undefined,
  showCard:false,
  loadingAddPayment : false,
  order_id:undefined
};

const modal = (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case GET_INSTALL_SUCCESS:
      return {...state, appData: payload.data};

    case GET_HOME_REQUEST:
      return {...state, loadingHome: true};
    case GET_HOME_SUCCESS:
      return {...state, providers: payload.providers, loadingHome: false};
    case GET_HOME_FAILURE:
      return {...state, loadingHome: false};

    case GET_FAV_REQUEST:
      return {...state, loadingFav: true};
    case GET_FAV_SUCCESS:
      return {...state, favourites: payload.favourites, loadingFav: false};
    case GET_FAV_FAILURE:
      return {...state, loadingFav: false};

    case TOGGLE_FAV_SUCCESS:
      const elementsIndex = state.foods.findIndex(
        element => element.id == payload.ref_id,
      );
      let updatedFoods = [...state.foods];
      if(elementsIndex > -1){
        updatedFoods[elementsIndex] = {
          ...updatedFoods[elementsIndex],
          is_fav: !updatedFoods[elementsIndex].is_fav,
        };
      }
      

      // const elementsIndex2 = state.mostOrderFoods.findIndex(
      //   element => element.id == payload.ref_id,
      // );
      // let updatedMostOrderFoods = [...state.mostOrderFoods];
      // updatedMostOrderFoods[elementsIndex2] = {
      //   ...updatedMostOrderFoods[elementsIndex2],
      //   is_fav: !updatedMostOrderFoods[elementsIndex2].is_fav,
      // };
      return {
        ...state,
        foods: updatedFoods,
        // mostOrderFoods: updatedMostOrderFoods,
      };

    case READ_NOTIFICATION_SUCCESS:
      const notiIndex = state.notifications.findIndex(
        element => element.id == payload.notification_id,
      );
      let updatedNoti = [...state.notifications];
      updatedNoti[notiIndex] = {...updatedNoti[notiIndex], read_at: Date.now()};
      return {...state, notifications: updatedNoti};

    case GET_FOODS_REQUEST:
      return {...state, loadingFoods: true, foods:[]};
    case GET_FOODS_SUCCESS:
      return {
        ...state,
        foods: payload.foods ?? state.foods,
        loadingFoods: false,
        searchProducts: payload.searchProducts,
        pagingProducts : payload.pagingProducts ?? state.pagingProducts
      };
    case GET_FOODS_FAILURE:
      return {...state, loadingFoods: false};

    case GET_MOST_ORDER_FOODS_REQUEST:
      return {...state, loadingMostOrder: true};
    case GET_MOST_ORDER_FOODS_SUCCESS:
      return {...state, mostOrderFoods: payload.foods, loadingMostOrder: false};
    case GET_MOST_ORDER_FOODS_FAILURE:
      return {...state, loadingMostOrder: false};

    case GET_ORDERS_REQUEST:
      return {...state, loadingOrders: true, orders: undefined};
    case GET_ORDERS_SUCCESS:
      return {...state, orders: payload.orders, loadingOrders: false};
    case GET_ORDERS_FAILURE:
      return {...state, loadingOrders: false};

    case GET_NOTIFICATIONS_REQUEST:
      return {...state, loadingNotifications: true};
    case GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: payload.notifications,
        loadingNotifications: false,
      };
    case GET_NOTIFICATIONS_FAILURE:
      return {...state, loadingNotifications: false};

    case GET_CATEGORIES_REQUEST:
      return {...state, loadingCategories: true};
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: payload.categories,
        loadingCategories: false,
      };
    case GET_CATEGORIES_FAILURE:
      return {...state, loadingCategories: false};

    case GET_LOCATIONS_REQUEST:
      return {...state, loadingLocation: true};
    case GET_LOCATIONS_SUCCESS:
      return {...state, locations: payload.locations, loadingLocation: false};
    case GET_LOCATIONS_FAILURE:
      return {...state, loadingLocation: false};

    case GET_TICKETS_REQUEST:
      return {...state, loadingTickets: true};
    case GET_TICKETS_SUCCESS:
      return {...state, tickets: payload.tickets, loadingTickets: false};
    case GET_TICKETS_FAILURE:
      return {...state, loadingTickets: false};

    case GET_MORE_FOODS_REQUEST:
      return {...state, loadingMore: true};
    case GET_MORE_FOODS_SUCCESS:
      return {
        ...state,
        foods: [...state.foods, ...payload.foods],
        loadingMore: false,
      };
    case GET_MORE_FOODS_FAILURE:
      return {...state, loadingMore: false};

    case HAS_PAYMENT_SUCCESS:
      return {...state, showCard: payload.showCard};
    case ADD_PAYMENT_REQUEST:
      return {...state, loadingAddPayment:true};
    case ADD_PAYMENT_SUCCESS:
      return {...state, showCard: payload.showCard, loadingAddPayment:false};
    case ADD_PAYMENT_FAILURE:
      return {...state, showCard: payload.showCard, loadingAddPayment:false};
    case STORE_ORDER_REQUEST:
        return {...state, order_id:undefined}
    case STORE_ORDER_SUCCESS:
      return {...state, order_id:payload.order_id}
      default:
      return state;
  }
};
export default modal;
