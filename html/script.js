// select dom elements
const matchList = document.getElementById("match-list");
const counterEl = document.getElementById("totalCounter");
const incrementEl = document.getElementById("increment");
const decrementEl = document.getElementById("decrement");

// class select
const totalCounterElClass = document.getElementsByClassName("totalCounter");
const incrementElClass = document.getElementsByClassName("incrementInput");
const decrementElClass = document.getElementsByClassName("decrementInput");

// action identifiers
const INCREMENT = "increment";
const DECREMENT = "decrement";
const ResetVALUE = "resetValue";

// action creators
const increment = (value) => {
  return {
    type: INCREMENT,
    payload: value,
  };
};

const decrement = (value) => {
  return {
    type: DECREMENT,
    payload: value,
  };
};

const resetValue = () => {
  return { type: ResetVALUE };
};

// initial state
const initialState = {
  value: 0,
};

// create reducer function
function counterReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        value: state.value + action.payload,
      };
    case DECREMENT:
      if (state.value > 0) {
        return {
          ...state,
          value: state.value - action.payload,
        };
      }
    case ResetVALUE:
      return {
        ...state,
        value: 0,
      };
    default:
      return state;
  }
  // if (action.type === INCREMENT) {
  //   return {
  //     ...state,
  //     value: state.value + action.payload,
  //   };
  // } else if (action.type === DECREMENT) {
  //   if (state.value > 0) {
  //     return {
  //       ...state,
  //       value: state.value - action.payload,
  //     };
  //   }
  // } else if (action.type === ResetVALUE) {
  //   return {
  //     ...state,
  //     value: 0,
  //   };
  // } else {
  //   return state;
  // }
}

// create store
const store = Redux.createStore(counterReducer);

const render = () => {
  const state = store.getState();
  counterEl.innerText = state.value.toString();
};

// update UI initially
render();

store.subscribe(render);

// button click listeners
// const incrementForm = document.getElementById("incrementForm");
// incrementForm.addEventListener("keydown", function (event) {
//   if (event.key === "Enter") {
//     event.preventDefault();
//     const incrementValue = parseInt(incrementEl.value) || 0;
//     store.dispatch(increment(incrementValue));
//   }
// });

matchList.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    if (event.target.name === INCREMENT) {
      const incrementValue = parseInt(event.target.value) || 0;
      store.dispatch(increment(incrementValue));
    } else if (event.target.name === DECREMENT) {
      const decrementValue = parseInt(event.target.value) || 0;
      store.dispatch(decrement(decrementValue));
    } else {
      console.log("Other");
    }
    // console.log(event.target.name);
    // console.log(
    //   event.target.parentNode.parentNode.parentNode.children[2].children
    // );
  }
});

// decrementEl.addEventListener("click", () => {
// const decrementForm = document.getElementById("decrementForm");
// decrementForm.addEventListener("keydown", function (event) {
//   if (event.key === "Enter") {
//     event.preventDefault();
//     const decrementValue = parseInt(decrementEl.value) || 0;
//     store.dispatch(decrement(decrementValue));
//   }
// });

// reset function
const classValueReset = (classEl) => {
  for (let re of classEl) {
    re.value = "";
  }
};
// Reset Button
const resetBtn = document.getElementById("reset-btn");
resetBtn.addEventListener("click", () => {
  classValueReset(incrementElClass);
  classValueReset(decrementElClass);
  store.dispatch(resetValue());
});

// Delete match
matchList.addEventListener("click", function (event) {
  if (event.target.parentNode.id === "delete-btn") {
    event.target.parentNode.parentNode.parentNode.parentNode.removeChild(
      event.target.parentNode.parentNode.parentNode
    );
  }
});

// Add another match
const addMatchBtn = document.getElementById("add-match-btn");
addMatchBtn.addEventListener("click", function () {
  const matchDivSection = document.createElement("div");
  matchDivSection.classList.add("match");
  // new match length
  const newMatchLength = document.getElementsByClassName("match").length + 1;

  matchDivSection.innerHTML = `
  <div class="wrapper">
    <button id="delete-btn" class="lws-delete">
      <img src="./image/delete.svg" alt="" />
    </button>
    <h3 class="lws-matchName">Match ${newMatchLength}</h3>
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
    <h2 id="totalCounter" class="lws-singleResult totalCounter">0</h2>
  </div>
  `;
  matchList.appendChild(matchDivSection);
});
