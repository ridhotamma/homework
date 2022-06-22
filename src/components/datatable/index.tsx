import React, { useEffect, useState } from "react";
import { HOVER } from "./constant";
import { DataTableProps, HoverState, OrderState } from "./interface";
import { icons } from "../../static/index";
import sortArray from "sort-array";

const DataTable = ({ headers, dataSource, setDataSource }: DataTableProps) => {
  const [hover, setHover] = useState<HoverState | null>(null);
  const [sortBy, setSortBy] = useState<OrderState>({
    prev: null,
    current: null,
  });
  const [ascOrder, setAscOrder] = useState<boolean>(false);
  const { FilterIcon } = icons;

  useEffect(() => {
    setAscOrder(!ascOrder);
    const sorted = sortArray(dataSource as any, {
      by: sortBy.current as any,
      order: ascOrder ? "desc" : "asc",
    });

    setDataSource(sorted);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy]);

  return (
    <React.Fragment>
      <div className="flex flex-col h-screen md:p-8 md:mt-0 mt-5 px-4">
        <div className="custom-scroll overflow-auto bg-white sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div>
              <table className="min-w-full">
                <thead className="bg-white border-b sticky top-0 shadow-sm">
                  <tr>
                    {headers?.map((data, index) => {
                      return (
                        <th
                          key={index}
                          scope="col"
                          className={`px-6 py-5 cursor-pointer ${
                            data.align ?? "text-left"
                          }`}
                        >
                          <div
                            className="flex items-center gap-1"
                            onClick={() => {
                              data.sortable &&
                                (Object.keys(sortBy).length > 0 &&
                                sortBy.current === data.value &&
                                sortBy.prev !== sortBy.current
                                  ? setSortBy({
                                      current: data.value,
                                      prev: data.value,
                                    })
                                  : setSortBy({
                                      prev: sortBy.current!,
                                      current: data.value!,
                                    }));
                            }}
                            onMouseEnter={() => {
                              setHover({
                                position: HOVER.FILTER,
                                value: data.value!,
                              });
                            }}
                            onMouseLeave={() => {
                              setHover(null);
                            }}
                          >
                            <span className="text-lg font-semibold text-gray-900">
                              {data.text}
                            </span>
                            {hover?.position === HOVER.FILTER &&
                              hover.value === data.value &&
                              data.sortable && (
                                <span
                                  className={`${
                                    sortBy.current === data.value && ascOrder
                                      ? "transition-transform rotate-180"
                                      : "transition-transform -rotate-0"
                                  }`}
                                >
                                  <img
                                    src={FilterIcon}
                                    alt="filter icon"
                                    width={10}
                                  />
                                </span>
                              )}
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                {dataSource!?.length > 0 ? (
                  <tbody>
                    {dataSource?.map((data, index) => {
                      return (
                        <tr
                          key={index}
                          className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                        >
                          {headers?.map((item, index) => {
                            return (
                              <td
                                key={index}
                                className={`text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap`}
                              >
                                <span className={`${item.rowStyles}`}>
                                  {data[item.value!]}
                                </span>
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                ) : (
                  <tbody className="w-full">
                    <tr className="bg-white w-full">
                      <td>No Data Available</td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DataTable;
