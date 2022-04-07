import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    // Create a connection to the database database and version we want to use.
    const database = await openDB('text', 1);
    // Create a new transaction and specify the database and data privileges.
    const tx = database.transaction('text', 'readwrite');
    // Open up the desired object store.
    const store = tx.objectStore('text');
    // Use the .put() method on the store and pass in the content.
    const request = store.put({id:1, content: content});
    const result = await request;
    console.log('🚀 - data saved to the database', result.content);
  } catch(err) {
    console.log(err);
    console.error('putDb not implemented');
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    // Create a connection to the database database and version we want to use.
    const database = await openDB('text', 1);
    // Create a new transaction and specify the database and data privileges.
    const tx = database.transaction('text', 'readonly');
    // Open up the desired object store.
    const store = tx.objectStore('text');
    // Use the .getAll() method to get all data in the database.
    const request = store.get(1);
    // Get confirmation of the request.
    const result = await request;

    if (result) {
      console.log('🚀 - data retrieved from the database', result.value);
      return result?.value;
    } else {
      console.log('Data not found in the database')
    }
    
  } catch(err) {
    console.log(err)
    console.error('getDb not implemented')
  }
};

initdb();
