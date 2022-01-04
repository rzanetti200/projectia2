import {Fragment} from 'react';
import {useDispatch} from 'react-redux';
import {useState} from 'react';
import {beginEditTrade, stopEditTrade, saveEditTrade, deleteTrade} from './actions';

export function Trade(props) {
  const {trade} = props;
  const dispatch = useDispatch();
  const [coin, setCoin] = useState(trade.coin);
  const [price, setPrice] = useState(trade.price);
  const [quantity, setQuantity] = useState(trade.quantity);
  const [fee, setFee] = useState(trade.fee);
  const [volotility, setVolotility] = useState(trade.volotility);

  if (trade.isEditing) {
    return (
      <Fragment>
        <div className="top trade-cell">
          <span className="coin"><textarea value={coin} onChange={event => setCoin(event.target.value)} /></span>
	   	  <span className="price"><textarea value={price} onChange={event => setPrice(event.target.value)} /></span>
		  <button
		    onClick={() => dispatch(saveEditTrade({...trade, coin, price, quantity, fee, volotility}))}
		  >Save</button>
		  <button
		    onClick={() => dispatch(stopEditTrade(trade.id))}
		  >Cancel</button>
		  <button
		    onClick={() => dispatch(deleteTrade(trade.id))}
		  >Delete</button>
        </div>
        <div className="bottom trade-cell">
		  <textarea value={quantity} onChange={event => setQuantity(event.target.value)} />
		  <textarea value={fee} onChange={event => setFee(event.target.value)}/>
		  <textarea value={volotility} onChange={event => setVolotility(event.target.value)}/>
		</div>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <div className="top trade-cell">
          <span className="coin">Coin: {trade.coin}</span>
	   	  <span className="price">Price: ${trade.price}</span>
		  <button
		    onClick={() => dispatch(beginEditTrade(trade.id))}
		  >Edit</button>
        </div>
        <div className="bottom trade-cell">
		  <span className="quantity">Quantity Bought: {trade.quantity}</span> 
		  <span className="fee">Trade Fee: {trade.fee}</span> 
		  <span className="volotility">Volotility Factor: {trade.volotility}</span>
		</div>
      </Fragment>
    );
  }
}