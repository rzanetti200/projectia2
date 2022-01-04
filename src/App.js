import './App.css';
import {useSelector} from 'react-redux';
import {Trade} from './Trade';
import {fetchTrade} from './actions';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Toolbar} from './Toolbar';

function App() {
	const trades = useSelector(state => state.trades);
	const dispatch = useDispatch();

	
	return (
    <div className="App">
	  <Toolbar />
      <div className="trades">
        {trades.map(trade =>
          <Trade key={trade.id} trade={trade} />
        )}
      </div>
    </div>
  );
}

export default App;