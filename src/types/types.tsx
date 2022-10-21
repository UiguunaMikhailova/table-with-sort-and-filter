type Item = {
  date: string;
  name: string;
  quantity: number;
  distance: number;
};

type TableProps = {
  items: Item[];
  paginate: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
};

type SortProps = {
  setSortValue: (value: string) => void;
};

type FilterProps = {
  setFilterValues: (value: string, secondValue: string, inputText: string) => void;
};

type FormProps = {
  updateItems: (sort: string, value: string, secondValue: string, inputText: string) => void;
};

export { Item, TableProps, SortProps, FilterProps, FormProps };
