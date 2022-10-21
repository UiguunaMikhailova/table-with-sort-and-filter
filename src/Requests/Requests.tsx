import LocalItems from './LocalItems';

export default async function getData() {
  try {
    const res = await fetch('http://localhost:5000/api/items');
    const data = await res.json();
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
    return LocalItems;
  }
}
