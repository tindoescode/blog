import React, { useState, useEffect, useCallback } from "react";

export default function useMultipleSelect<T>() {
  const [items, setItems] = useState<Array<T>>([]);
  const [selected, setSelected] = useState<Array<number>>([]); // index

  const select = (index: number) => {
    if (!selected.includes(index)) {
      setSelected((prevState) => [...prevState, index]);
    }
  };

  const deselect = async (index: number) => {
    setSelected((prevState) => prevState.filter((item) => item !== index));
  };

  const getSelected = useCallback(async (index) => {
    let arr: Array<T> = [];

    for (const i of selected) {
      arr.push(items[i]);
    }
  }, []);

  return {
    items,
    setItems,
    selected: getSelected,
    selectedIndexes: selected,
    select,
    deselect,
  };
}
