import React, { useState, useEffect } from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faCircle, faCheckCircle, faPlus } from '@fortawesome/free-solid-svg-icons';

const App = () => {
	// HINT: each "item" in our list names a name, a boolean to tell if its been completed, and a quantity
  const [items, setItems] = useState([
    { itemName: 'item 1', quantity: 1, isSelected: false},
    { itemName: 'item 2', quantity: 1, isSelected: false},
    { itemName: 'item 3', quantity: 2, isSelected: false}
  ]);
  
  const [inputValue, setInputValue] = useState('')
  const [totalItemCount, setTotalItemCount] = useState(0);

  useEffect(() => {
    calculateTotal();
  },[items])
  const handleAddItem = () => {
    const newItem = {
      itemName: inputValue,
      quantity: 1,
      isSelected: false
    }
    //Setting the state to a spread of the new array Automatically re renders the page. 
    const newItems = [...items, newItem];
    setItems(newItems);
    setInputValue("");
  };

  const handleQuantityIncrease = (index) => {
    const newItems = [...items];

    newItems[index].quantity++;
    setItems(newItems);
    calculateTotal();
  }
  const handleQuantityDecrease = (index) => {
    const newItems = [...items];
    if(newItems[index].quantity < 2) {
      newItems[index].quantity = 1
    } else {
      newItems[index].quantity--;
    }
    
    setItems(newItems);
    calculateTotal();
  }

  const toggleComplete = (index) => {
    const newItems = [...items];
    newItems[index].isSelected = !newItems[index].isSelected
    setItems(newItems);
  }

  const calculateTotal = () => {
    const totalItemCount = items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
    setTotalItemCount(totalItemCount);
  }

	return (
		<div className='app-background'>
			<div className='main-container'>
				<div className='add-item-box'>
					<input className='add-item-input' value={inputValue} onChange={(event) => setInputValue(event.target.value)} placeholder='Add an item...' />
					<FontAwesomeIcon icon={faPlus} onClick={() => handleAddItem()} />
				</div>
				<div className='item-list'>
          {items.map((item, index) => <div key={index} className='item-container'>
						<div className='item-name' onClick={() => toggleComplete(index)}>
							{/* HINT: replace false with a boolean indicating the item has been completed or not */}
							{item.isSelected ? (
								<>
									<FontAwesomeIcon icon={faCheckCircle} />
									<span className='completed'>{item.itemName}</span>
								</>
							) : (
								<>
									<FontAwesomeIcon icon={faCircle} />
									<span>{item.itemName}</span>
								</>
							)}
						</div>
						<div className='quantity'>
							<button>
								<FontAwesomeIcon  icon={faChevronLeft} onClick={() => handleQuantityDecrease(index)}/>
							</button>
							<span> {item.quantity} </span>
							<button>
								<FontAwesomeIcon icon={faChevronRight} onClick={() => handleQuantityIncrease(index)} />
							</button>
						</div>
					</div>)}
					
				</div>
				<div className='total'>Total: {totalItemCount} </div>
			</div>
		</div>
	);
};

export default App;