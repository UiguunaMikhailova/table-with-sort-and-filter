import React, { useRef } from 'react';
import { FilterProps } from 'types/types';
import './Filter.css';

export default function Filter(props: FilterProps) {
  const firstSelect = useRef<HTMLSelectElement>(null); // выбор категории, по которой будет фильтрация
  const secondSelect = useRef<HTMLSelectElement>(null); // выбор условия, по которому будет фильтрация
  const inputText = useRef<HTMLInputElement>(null); // текстовое поле для ввода

  // отправление значений фильтрации в родительский компонент
  function getValues() {
    props.setFilterValues(
      firstSelect.current!.value,
      secondSelect.current!.value,
      inputText.current!.value
    );
  }

  return (
    <>
      <span>Фильтрация: </span>
      <select className="select" ref={firstSelect} onChange={getValues}>
        <option value="date">По дате</option>
        <option value="name">По имени</option>
        <option value="quantity">По количеству</option>
        <option value="distance">По дистанции</option>
      </select>
      <select className="select" ref={secondSelect} onChange={getValues}>
        <option value="equals">Равно</option>
        <option value="contains">Содержит</option>
        <option value="more">Больше</option>
        <option value="less">Меньше</option>
      </select>
      <input
        className="input"
        type="text"
        placeholder="Введите текст..."
        ref={inputText}
        onChange={getValues}
      />
    </>
  );
}
