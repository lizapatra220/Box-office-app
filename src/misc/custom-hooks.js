import { useReducer, useEffect, useState } from "react";
import { getApi } from "./config";
function showReducer(prevState, action) {
  switch (action.type) {
    case "Add": {
      return [...prevState, action.showId];
    }
    case "Remove": {
      return prevState.filter((showId) => showId !== action.showId);
    }
    default:
      return prevState;
  }
}
function usePersistedReduce(reducer, initialState, key) {
  const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
    const persisted = localStorage.getItem(key);
    return persisted ? JSON.parse(persisted) : initial;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, dispatch];
}

export function useShows(key = "shows") {
  return usePersistedReduce(showReducer, [], key);
}
export function useLastQuery(key = "lastQuery") {
  const [input, setinput] = useState(() => {
    const persisted = sessionStorage.getItem(key);
    return persisted ? JSON.parse(persisted) : "";
  });
  const setPersistedInput = (newState) => {
    setinput(newState);
    sessionStorage.setItem(key, JSON.stringify(newState));
  };
  return [input, setPersistedInput];
}

const reducer = (prevState, action) => {
  switch (action.type) {
    case "Fetch_Success": {
      return { isLoading: false, error: null, show: action.show };
    }
    case "Fetch_Failure": {
      return { ...prevState, isLoading: false, error: action.error };
    }
    default:
      return prevState;
  }
};
export function useShow(showId) {
  const [state, dispatch] = useReducer(reducer, {
    show: null,
    isLoading: true,
    error: null,
  });
  useEffect(() => {
    let isMounted = true;
    getApi(`/shows/${showId}?embed[]=seasons&embed[]=cast`)
      .then((result) => {
        if (isMounted) {
          dispatch({ type: "Fetch_Success", show: result });
        }
      })
      .catch((err) => {
        if (isMounted) {
          dispatch({ type: "Fetch_Failure", error: err.message });
        }
      });
    return () => {
      isMounted = false;
    };
  }, [showId]);
  return state;
}
