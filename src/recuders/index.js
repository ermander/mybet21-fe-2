export default function (state = {}, action) {
  switch (action.type) {
    case "IS_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "SET_MAIN_ODDS":
      return {
        ...state,
        odds: action.payload,
      };
    case "SET_TEMPORARY_ODDS":
      return {
        ...state,
        temporaryOdds: action.payload,
      };
    case "SET_HISTORY":
      return {
        ...state,
        history: action.payload,
      };
    case "SET_FILTERS":
      return {
        ...state,
        filters: action.payload,
      };
    case "SET_FIRST_BOOKMAKER":
      return {
        ...state,
        firstBookmaker: action.payload,
      };
    case "SHOW_FILTER_MODAL":
      return {
        ...state,
        showFilterModal: !state.showFilterModal
      }
    default:
      return state;
  }
}
