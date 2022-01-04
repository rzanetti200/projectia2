import {showLoader} from './Toolbar';

function assertResponse(response) {
  if (response.status >= 200 || response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
}

export function fetchTrade(name) {
  return dispatch => {
	showLoader();
    fetch(`https://project2.huncho.me:8443/trades/${name}`) 
      .then(assertResponse)
      .then(response => response.json())
      .then(data => {
        if (data.ok) {
          dispatch(showTrade(data.results));
        } else {
          console.error(data);
        }
      });
  };
}

export const Action = Object.freeze({
  ShowTrade: 'ShowTrade',
  BeginEditTrade: 'BeginEditTrade',
  StopEditTrade: 'StopEditTrade',
  OverwriteTrade: 'OverwriteTrade',
  AddTrade: 'AddTrade',
  RemoveTrade: 'RemoveTrade',
});

export function showTrade(trades) {
  return {type: Action.ShowTrade, payload: trades};
}

export function beginEditTrade(id) {
  return {type: Action.BeginEditTrade, payload: id};
}

export function stopEditTrade(id) {
  return {type: Action.StopEditTrade, payload: id};
}

export function overwriteTrade(trade) {
  return {type: Action.OverwriteTrade, payload: trade};
}

export function addTrade(trade) {
  return {type: Action.AddTrade, payload: trade};
}

export function removeTrade(id) {
  return {type: Action.RemoveTrade, payload: id};
}

export function saveEditTrade(trade) {
  return dispatch => {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trade),
    };
    fetch(`https://project2.huncho.me:8443/trades/${trade.id}`, options)
      .then(assertResponse)
      .then(response => response.json())
      .then(data => {
        if (data.ok) {
          dispatch(overwriteTrade({...trade, isEditing: false}));
        } else {
          console.error(data);
        }
      });
  };
}

export function newTrade() {
  const trade = {
	coin: '',
  price: 0,
  quantity: 0,
  fee: 0,
  volotility: 0,
  };

  return dispatch => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trade),
    };
    fetch(`https://project2.huncho.me:8443/trades`, options)
      .then(assertResponse)
      .then(response => response.json())
      .then(data => {
        if (data.ok) {
          dispatch(addTrade({
            ...trade,
            id: data.results,
            isEditing: true,
          }));
        }
      });
  };
}

export function deleteTrade(id) {
  return dispatch => {
    const options = {
      method: 'DELETE',
    };
    fetch(`https://project2.huncho.me:8443/trades/${id}`, options)
      .then(assertResponse)
      .then(response => response.json())
      .then(data => {
        if (data.ok) {
          dispatch(removeTrade(id));
        }
      });
  };
}