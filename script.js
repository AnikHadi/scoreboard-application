// select dom elements
const matchList = document.getElementById("match-list");
const counterEl = document.getElementById("totalCounter-1");
const incrementEl = document.getElementById("increment");
const decrementEl = document.getElementById("decrement");

// new match length
const newMatchLength = document.getElementsByClassName("match").length + 1;

// class select
const totalCounterElClass = document.getElementsByClassName("totalCounter");
const incrementElClass = document.getElementsByClassName("incrementInput");
const decrementElClass = document.getElementsByClassName("decrementInput");

// action identifiers
const ADD_MATCH = "ADD_MATCH";
const DELETE_MATCH = "DELETE_MATCH";
const INCREMENT = "increment";
const DECREMENT = "decrement";
const ResetVALUE = "resetValue";

// action creators
const addMatch = (id) => {
  return {
    type: ADD_MATCH,
    payload: {
      id,
    },
  };
};
const deleteMatch = (id) => {
  return {
    type: DELETE_MATCH,
    payload: {
      id,
    },
  };
};

const increment = (value, id) => {
  return {
    type: INCREMENT,
    payload: {
      value,
      id,
    },
  };
};

const decrement = (value, id) => {
  return {
    type: DECREMENT,
    payload: {
      value,
      id,
    },
  };
};

const resetValue = () => {
  return { type: ResetVALUE };
};

// initial state
const initialState = {
  match: [{ id: 1, value: 0 }],
};

// create reducer function
function counterReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_MATCH:
      return {
        ...state,
        match: [...state.match, { id: action.payload.id, value: 0 }],
      };
    case DELETE_MATCH:
      const matchToRemove = parseInt(action.payload.id);
      const updatedMatch = state.match.filter((st) => st.id !== matchToRemove);
      return {
        ...state,
        match: updatedMatch,
      };
    case INCREMENT:
      const idINCREMENT = parseInt(action.payload.id.split("-")[1]);
      return {
        ...state,
        match: state.match.map((st) => {
          if (st.id !== idINCREMENT) {
            return st;
          }
          return {
            ...st,
            value: st.value + action.payload.value,
          };
        }),
      };
    case DECREMENT:
      const idDECREMENT = parseInt(action.payload.id.split("-")[1]);
      return {
        ...state,
        match: state.match.map((st) => {
          if (st.value > action.payload.value) {
            if (st.id !== idDECREMENT) {
              return st;
            }
            return {
              ...st,
              value: st.value - action.payload.value,
            };
          }
          return {
            ...st,
            value: 0,
          };
        }),
      };
    case ResetVALUE:
      return {
        ...state,
        match: state.match.map((st) => {
          return {
            ...st,
            value: 0,
          };
        }),
      };
    default:
      return state;
  }
}

// create store
const store = Redux.createStore(counterReducer);

const render = () => {
  const state = store.getState().match;
  state.map((st) => {
    document.getElementById(`totalCounter-${st.id}`).innerText =
      st.value.toString();
  });
};

// update UI initially
render();

store.subscribe(render);

matchList.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    const totalValueId =
      event.target.parentNode.parentNode.parentNode.children[2].children[0].id;
    if (event.target.name === INCREMENT) {
      const incrementValue = parseInt(event.target.value) || 0;
      store.dispatch(increment(incrementValue, totalValueId));
    } else if (event.target.name === DECREMENT) {
      const decrementValue = parseInt(event.target.value) || 0;
      store.dispatch(decrement(decrementValue, totalValueId));
    } else {
      console.log("Other");
    }
  }
});

// Reset Button
const resetBtn = document.getElementById("reset-btn");
resetBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const forms = document.getElementsByTagName("form");
  for (let i = 0; i < forms.length; i++) {
    forms[i].reset();
  }
  store.dispatch(resetValue());
});

// Delete match
matchList.addEventListener("click", function (event) {
  if (event.target.parentNode.id === "delete-btn") {
    event.target.parentNode.parentNode.parentNode.parentNode.removeChild(
      event.target.parentNode.parentNode.parentNode
    );
    const deleteMatchId =
      event.target.parentNode.parentNode.parentNode.children[2].children[0].id.split(
        "-"
      )[1];
    store.dispatch(deleteMatch(deleteMatchId));
  }
});

// Add another match
const addMatchBtn = document.getElementById("add-match-btn");
addMatchBtn.addEventListener("click", function () {
  const matchDivSection = document.createElement("div");
  matchDivSection.classList.add("match");
  // new match id
  const state = store.getState().match;
  const lastObject = state[state.length - 1];
  const newMatchID = lastObject.id + 1;

  matchDivSection.innerHTML = `
  <div class="wrapper">
    <button id="delete-btn" class="lws-delete">
      <img src="./image/delete.svg" alt="" />
    </button>
    <h3 class="lws-matchName">Match ${newMatchID}</h3>
  </div>
  <div class="inc-dec">
    <form class="incrementForm" id="incrementForm">
      <h4>Increment</h4>
      <input
        id="increment"
        type="number"
        name="increment"
        class="lws-increment incrementInput"
      />
    </form>
    <form class="decrementForm" id="decrementForm">
      <h4>Decrement</h4>
      <input
        id="decrement"
        type="number"
        name="decrement"
        class="lws-decrement decrementInput"
      />
    </form>
  </div>
  <div class="numbers">
    <h2 id="totalCounter-${newMatchID}" class="lws-singleResult totalCounter">0</h2>
  </div>
  `;
  matchList.appendChild(matchDivSection);

  //  add match state update
  store.dispatch(addMatch(newMatchID));
});
