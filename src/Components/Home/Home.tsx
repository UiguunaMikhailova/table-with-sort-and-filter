import React, { useEffect, useState } from 'react';
import Table from 'Components/Table/Table';
import getData from 'Requests/Requests';
import { Item } from 'types/types';
import Form from 'Components/Form/Form';
import { sortItems } from 'Helpers/Helpers';
import './Home.css';

export default function Home() {
  const [items, setItems] = useState([]); // массив данных удовлетворяющий всем критериям
  const [initialItems, setInitialItems] = useState([]); // изначальный массив данных
  const [currentPage, setCurrentPage] = useState(1); // текущая страница
  const [itemsPerPage] = useState(5); // максимальное количество элементов на одной странице таблицы
  const [isEmpty, setIsEmpty] = useState(false); // если массив оказался пустым после установки критериев сортировки и фильтрации

  useEffect(() => {
    getData().then((data) => {
      if (data) {
        setItems(data);
        setInitialItems(data);
      }
    });
  }, []);

  const lastItemIndex = currentPage * itemsPerPage; // до куда слайсить массив
  const firstItemIndex = lastItemIndex - itemsPerPage; // откуда слайсить массив
  const currentItems = items.slice(firstItemIndex, lastItemIndex); // 5 элементов, которые должны быть на текущей странице
  const lastPage = Math.ceil(items.length / itemsPerPage); // номер последней страницы

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber); // установка текущей страницы
  const nextPage = () => setCurrentPage((prev) => (prev < lastPage ? prev + 1 : 1)); // увеличение текущей страницы
  const prevPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : lastPage)); // уменьшение текущей страницы

  function updateItems(sort: string, firstValue: string, secondValue: string, input: string) {
    setIsEmpty(false);
    setItems([...initialItems]);
    const filteredItems = [...sortItems(sort, initialItems)]; // отсортированный массив
    filterItems(filteredItems, firstValue, secondValue, input); // фильтруем массив
  }

  function filterItems(itemsArr: never[], firstValue: string, secondValue: string, input: string) {
    let result: never[] = [];
    if (secondValue === 'contains') {
      result = filterItemsContains(firstValue, itemsArr, input); // элемент массива содержит значение
    }

    if (secondValue === 'equals') {
      result = filterItemsEquals(firstValue, itemsArr, input); // элемент массива равен значению
    }

    if (secondValue === 'more') {
      result = filterItemsMore(firstValue, itemsArr, input); // элемент массива больше значения
    }
    if (secondValue === 'less') {
      result = filterItemsLess(firstValue, itemsArr, input); // элемент массива меньше значения
    }

    if (!result.length) {
      setIsEmpty(true); // если после фильтрации массив оказался пустым (не нашлось элементов удовлетворяющих критериям)
    } else {
      setItems([...result]);
    }
  }

  // элемент массива содержит значение
  function filterItemsContains(value: string, itemsArr: never[], input: string): never[] {
    if (value === 'name') {
      return itemsArr.filter((item: Item) => item.name.toLowerCase().includes(input.toLowerCase()));
    }
    if (value === 'date') {
      return itemsArr.filter((item: Item) => item.date.toLowerCase().includes(input.toLowerCase()));
    }
    if (value === 'quantity') {
      return itemsArr.filter((item: Item) =>
        item.quantity.toString().toLowerCase().includes(input.toLowerCase())
      );
    }
    if (value === 'distance') {
      return itemsArr.filter((item: Item) =>
        item.distance.toString().toLowerCase().includes(input.toLowerCase())
      );
    }
    return [];
  }

  // элемент массива равен значению
  function filterItemsEquals(value: string, itemsArr: never[], input: string): never[] {
    if (value === 'name') {
      return itemsArr.filter((item: Item) => item.name.toLowerCase() === input.toLowerCase());
    }
    if (value === 'date') {
      return itemsArr.filter((item: Item) => item.date.toLowerCase() === input.toLowerCase());
    }
    if (value === 'quantity') {
      return itemsArr.filter(
        (item: Item) => item.quantity.toString().toLowerCase() === input.toLowerCase()
      );
    }
    if (value === 'distance') {
      return itemsArr.filter(
        (item: Item) => item.distance.toString().toLowerCase() === input.toLowerCase()
      );
    }
    return [];
  }

  // элемент массива больше значения
  function filterItemsMore(value: string, itemsArr: never[], input: string): never[] {
    if (value === 'name') {
      return itemsArr.filter((item: Item) => item.name.toLowerCase() > input.toLowerCase());
    }
    if (value === 'date') {
      return itemsArr.filter((item: Item) => {
        return Date.parse(item.date) >= Date.parse(input);
      });
    }
    if (value === 'quantity') {
      return itemsArr.filter((item: Item) => item.quantity >= Number(input));
    }
    if (value === 'distance') {
      return itemsArr.filter((item: Item) => item.distance >= Number(input));
    }
    return [];
  }

  // элемент массива меньше значения
  function filterItemsLess(value: string, itemsArr: never[], input: string): never[] {
    if (value === 'name') {
      return itemsArr.filter((item: Item) => item.name.toLowerCase() < input.toLowerCase());
    }
    if (value === 'date') {
      return itemsArr.filter((item: Item) => Date.parse(item.date) <= Date.parse(input));
    }
    if (value === 'quantity') {
      return itemsArr.filter((item: Item) => item.quantity <= Number(input));
    }
    if (value === 'distance') {
      return itemsArr.filter((item: Item) => item.distance <= Number(input));
    }
    return [];
  }

  return (
    <div className="home">
      <Form updateItems={updateItems} />
      {isEmpty ? (
        <div className="empty">
          По вашему запросу ничего не найдено, пожалуйста, поменяйте настройки
        </div>
      ) : (
        <Table
          items={currentItems}
          paginate={paginate}
          nextPage={nextPage}
          prevPage={prevPage}
          itemsPerPage={itemsPerPage}
          totalItems={items.length}
          currentPage={currentPage}
        />
      )}
    </div>
  );
}
