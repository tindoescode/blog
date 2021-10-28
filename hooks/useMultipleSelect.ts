import React, { useState, useEffect, useCallback } from "react";

export default function useMultipleSelect<T>() {
  const [items, setItems] = useState<Array<T>>([]);
  const [selected, setSelected] = useState<Array<number>>([]); // index

  const select = useCallback(
    (index: number) => {
      if (!selected.includes(index)) {
        setSelected((prevState) => [...prevState, index]);
      }
    },
    [selected]
  );

  const deselect = useCallback(
    async (index: number) => {
      setSelected((prevState) => prevState.filter((item) => item !== index));
    },
    [selected]
  );

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
