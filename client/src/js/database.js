// TODO: Install the following package:
import { openDB } from 'idb';

// TODO: Complete the initDb() function below:
const initdb = async () => {
  openDB('contacts', 1, {
    upgrade(db) {
      if (db.objectStoreName.contains('contacts')) {
        console.log('contacts db exists');
        return;
      }
      db.createObjectStore('contacts', { keyPath: 'id', autoIncrement: true });
      console.log('contacts db created')
    }
  })
};


// TODO: Complete the postDb() function below:
export const postDb = async (name, home, cell, email) => {
  const contactDb = await openDB('contacts', 1);
  const tx = contactDb.transaction('contacts', 'readwrite');
  const store = tx.objectStore('contacts');
  const request = store.add({ name: name, home: home, cell: cell, email: email });
  const result = await request;
  console.log(result)
};

// TODO: Complete the getDb() function below:
export const getDb = async () => {
  const contactDb = await openDB('contacts', 1);
  const tx = contactDb.transaction('contacts', 'readonly');
  const store = tx.objectStore('contacts');
  const request = store.getAll();
  const result = await request;
  return result;
};

// TODO: Complete the deleteDb() function below:
export const deleteDb = async (id) => {
  const contactDb = await openDB('contacts', 1);
  const tx = contactDb.transaction('contacts', 'readwrite');
  const store = tx.objectStore('contacts');
  const request = store.delete(id);
  const result = await request
  return result;
};

initdb();
