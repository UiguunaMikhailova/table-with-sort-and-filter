import React, { useRef } from 'react';
import { SortProps } from 'types/types';
import './Sort.css';

export default function Sort(props: SortProps) {
  const select = useRef<HTMLSelectElement>(null); // выбор условия для сортировки

  // отправление значения сортировки в родительский компонент
  function setValue() {
    props.setSortValue(select.current!.value);
  }
  return (
    <>
      <span>Сортировка: </span>
      <select className="select" ref={select} onChange={setValue}>
        <optgroup label="Название">
          <option value="name-asc">По возрастанию</option>
          <option value="name-desc">По убыванию</option>
        </optgroup>
        <optgroup label="Количество">
          <option value="quantity-asc">По возрастанию</option>
          <option value="quantity-desc">По убыванию</option>
        </optgroup>
        <optgroup label="Дистанция">
          <option value="distance-asc">По возрастанию</option>
          <option value="distance-desc">По убыванию</option>
        </optgroup>
      </select>
    </>
  );
}
