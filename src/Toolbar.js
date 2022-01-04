import {useDispatch} from 'react-redux';
import {fetchTrade, newTrade} from './actions';

export function Toolbar(props) {
  const dispatch = useDispatch();
  
  const createNewTrade = () => {
    dispatch(newTrade())
  }

  return (
    <div className="toolbar">
      <button
		onClick={createNewTrade}
	  >New Trade</button>
      <div className="name-entry">
        <input type="text" id="name"/>
        <button
		  onClick={() => dispatch(fetchTrade(document.getElementById("name").value))}
		>Search Trade</button>
      </div>
	  <div id="loading">
	    <h1> 
	      Searching Past Trades...
	    </h1>
	  </div>
    </div>
  );
}

export function showLoader() {
  const loader = document.getElementById("loading");
  loader.className = "show";
  setTimeout(() => {
    loader.className = loader.className.replace("show", "");
  }, 1000);
} 