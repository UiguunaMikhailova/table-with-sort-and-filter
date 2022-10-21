import React from 'react';
import { Item } from 'types/types';
import './TableItem.css';

export default function TableItem(props: Item) {
  return (
    <tr className="table__item">
      <td className="table__item-text">{props.date}</td>
      <td className="table__item-text">{props.name}</td>
      <td className="table__item-text">{props.quantity}</td>
      <td className="table__item-text">{props.distance}</td>
    </tr>
  );
}
