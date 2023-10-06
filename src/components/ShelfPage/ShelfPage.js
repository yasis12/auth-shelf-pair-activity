import { useState, useEffect } from 'react';
import axios from 'axios';
import './ShelfPage.css';

function ShelfPage() {

  const [shelfList, setShelfList] = useState([]);
  const [itemName, setItemName] = useState('');
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    fetchShelf();
  }, []);

  const fetchShelf = () => {
    axios.get('/api/shelf').then((response) => {
      setShelfList(response.data);
    }).catch((error) => {
      console.log(error);
      alert('Something went wrong.');
    });
  }

  // add item to shelf function
  const addShelfItem = (event) => {
    event.preventDefault();
    axios.post('/api/shelf', { description: itemName, image_url: imageURL })
    .then(response => 
    fetchShelf(),
    setImageURL(''),
    setItemName('')
    )
    .catch(error => {
      console.error(error);
      alert('Something went wrong.');
    });
  }

  const deleteItem = (itemId) => {
    event.preventDefault();
    console.log('item id?', itemId);
    axios.delete(`api/shelf/${itemId}`)
    .then(response => fetchShelf())
      .catch(error => {
        console.error(error);
        alert('Something went wrong.');
      });
  }

  return (
    <div className="container">
      <h2>Shelf</h2>
      {
        shelfList.length === 0 && (
          <div>No items on the shelf</div>
        )
      }
      {
        shelfList.map(item => {
          return <div className="responsive" key={item.id}>
                    <div className="gallery">
                        <img src={item.image_url} alt={item.description} />
                        <br />
                        <div className="desc">{item.description}</div>
                        <div style={{textAlign: 'center', padding: '5px'}}>
                          <button onClick={() => deleteItem(item.id)}  style={{cursor: 'pointer'}}>Delete</button>
                        </div>
                    </div>
                 </div>
        })
      }

      <div className="clearfix"></div>
      <br /><br />
      <div>
        <h3>Add an Item to the Shelf</h3>
      </div>
      <div className='addItemToShelf'>
          <form onSubmit={addShelfItem}>
            <label>Item Name</label>
            <input type='text' value={itemName} onChange={e => setItemName(e.target.value)}></input>
            <label>image URL</label>
            <input type='text' value={imageURL} onChange={e => setImageURL(e.target.value)}></input>
            <button type='submit'>ADD</button>
          </form>
      </div>

    </div>
  );
}

export default ShelfPage;
