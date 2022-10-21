import React, { useState } from 'react';
import Filter from 'Components/Filter/Filter';
import Sort from 'Components/Sort/Sort';
import { FormProps } from 'types/types';

export default function Form(props: FormProps) {
  const [sort, setSort] = useState(''); // условие сортировки
  const [selectFirst, setSelectFirst] = useState(''); // категория фильтрации
  const [selectSecond, setSelectSecond] = useState(''); // условие фильтрации
  const [input, setInput] = useState(''); // текст из инпута

  // вызов родительской функции-перерендера, в которой параметры: условия сортировки и фильтрации
  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    props.updateItems(sort, selectFirst, selectSecond, input);
  }

  // сохранение условия сортировки в стейт
  function setSortValue(sort: string) {
    setSort(sort);
  }

  // сохранение условий фильтрации в стейт
  function setFilterValues(firstValue: string, secondValue: string, inputValue: string) {
    setSelectFirst(firstValue);
    setSelectSecond(secondValue);
    setInput(inputValue);
  }

  return (
    <form className="filter" onSubmit={(e) => submitHandler(e)}>
      <Filter setFilterValues={setFilterValues} />
      <Sort setSortValue={setSortValue} />
      <button className="button" type="submit">
        Применить
      </button>
    </form>
  );
}
