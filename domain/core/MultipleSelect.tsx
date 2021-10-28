import React, {
  MouseEventHandler,
  ReactElement,
  useDebugValue,
  useState,
} from "react";
import { FriendInfo } from "../../hooks/useFbAPI";
import useVirtual from "react-cool-virtual";
import useToggle from "../../hooks/useToggle";
import clsx from "clsx";

interface Props {
  items: Array<FriendInfo>;
  selectIndexes: Array<number>;
  onItemClick: (index: number) => void;
  onItemRemove: (index: number) => void;
}

function MultipleSelect({
  items,
  selectIndexes,
  onItemClick,
  onItemRemove,
}: Props): ReactElement {
  const [filterItems, setFilterItems] = useState<Array<FriendInfo>>(items);
  useDebugValue(`"filterItems": ${filterItems}`);

  const [boxActive, toggleBoxActive] = useToggle();
  const {
    outerRef,
    innerRef,
    items: virtualItems,
  } = useVirtual<HTMLDivElement, HTMLDivElement>({
    itemCount: filterItems.length, // Provide the total number for the list items
    itemSize: 50,
  });

  const [findText, setFindText] = useState<string>("");

  //create onFindTextChange function
  const onFindTextChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const { value } = event.target;
    setFindText(value);

    console.log("On find text change, length = ", value);
    if (value.length === 0) {
      console.log("Filter items = items");
      setFilterItems(items);
      return;
    }

    const filterItems = items.filter((item) => item.name.includes(value));
    setFilterItems(filterItems);

    if (!boxActive) {
      toggleBoxActive();
    }
  };

  return (
    <>
      <div className="w-full flex flex-col items-center mx-auto">
        <div className="w-full px-4">
          <div className="flex flex-col items-center relative">
            <div className="w-full  svelte-1l8159u">
              <div className="my-2 p-1 flex border border-gray-200 bg-white rounded svelte-1l8159u">
                <div className="flex flex-auto flex-wrap">
                  {selectIndexes.map((index) => (
                    <div className="flex justify-center items-center m-1 font-medium py-1 px-2 rounded-full text-teal-700 bg-teal-100 border border-teal-300 ">
                      <div className="text-xs font-normal leading-none max-w-full flex-initial">
                        {items.at(index).name}
                      </div>

                      <div
                        className="flex flex-auto flex-row-reverse"
                        onClick={() => onItemRemove(index)}
                      >
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="100%"
                            height="100%"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-x cursor-pointer hover:text-teal-400 rounded-full w-4 h-4 ml-2"
                          >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="flex-1">
                    <input
                      value={findText}
                      onChange={onFindTextChange}
                      className="bg-transparent p-1 px-2 appearance-none outline-none h-full w-full text-gray-800"
                    />
                  </div>
                </div>
                <div className="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200">
                  <button
                    onClick={() => toggleBoxActive()}
                    className="cursor-pointer w-6 h-6 text-gray-600 flex items-center outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={clsx(
                        "transform feather feather-chevron-up w-4 h-4",
                        boxActive && "rotate-180"
                      )}
                    >
                      <polyline points="18 15 12 9 6 15"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {
              <div
                ref={outerRef}
                className={clsx(
                  "absolute shadow-2xl [ border border-lime-400 ] top-100 bg-white z-40 w-full lef-0 rounded max-h-select overflow-auto",
                  !boxActive && "invisible"
                )}
              >
                <div ref={innerRef}>
                  {virtualItems.map(({ index }) => (
                    <div
                      className="flex flex-col w-full"
                      key={filterItems[index]?.id}
                      onClick={() => {
                        // find the index of the item in items array
                        const realIndex = items.findIndex(
                          (value) => value.id === filterItems[index]?.id
                        );

                        onItemClick(realIndex);
                        setFindText("");
                        setFilterItems(items);
                      }}
                    >
                      <div className="cursor-pointer w-full border-gray-200 border-b hover:bg-teal-100">
                        <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative">
                          <div className="w-full items-center flex">
                            <div className="mx-2 leading-6">{`${filterItems[index]?.name} / ${filterItems[index]?.id}`}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            }
          </div>
        </div>
      </div>

      <style jsx>
        {`
          .top-100 {
            top: 100%;
          }
          .bottom-100 {
            bottom: 100%;
          }
          .max-h-select {
            max-height: 280px;
          }
        `}
      </style>
    </>
  );
}

export default MultipleSelect;
