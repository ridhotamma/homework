import React, { useEffect, useState } from "react";
import DataTable from "./components/datatable";
import BasicLayout from "./components/layout";

import { HeaderDetail } from "./components/datatable/interface";
import { TextField } from "./components/input";
import { fetchData } from "./services/api";
import {
  IResponseData,
  PROJECT_STATUS,
  PROJECT_TYPE,
} from "./services/interface";
import { icons } from "./static";

const App = () => {
  const headers: HeaderDetail[] = [
    {
      text: "Name",
      value: "name",
      sortable: true,
    },
    {
      text: "Type",
      value: "type",
      sortable: true,
      rowStyles:
        "bg-yellow-500 text-white rounded-full grid place-items-center place-content-center font-semibold py-1 px-2 lg:px-0 lg:w-2/3",
    },
    {
      text: "Status",
      value: "status",
      rowStyles:
        "bg-green-500 text-white rounded-full grid place-items-center place-content-center font-semibold py-1 px-2 lg:px-0 lg:w-2/3",

      sortable: true,
    },
    {
      text: "Created On",
      value: "createdOn",
      sortable: true,
    },
    {
      text: "Archived",
      value: "archived",
      sortable: true,
      rowStyles:
        "bg-red-500 text-white rounded-full grid place-items-center place-content-center font-semibold py-1 px-2 lg:px-0 lg:w-2/3",
    },
  ];

  const [dataSource, setDataSource] = useState<IResponseData[]>([]);
  const [filteredDataSource, setFilteredDataSource] = useState<IResponseData[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchQueries, setSearchQueries] = useState<string[]>([]);

  const { SearchIcon } = icons;

  const retrieveAllData = () => {
    fetchData().then((res) => {
      const modifiedResponse = res.map((item: any) => {
        return {
          ...item,
          archived: item.archived ? "Archived" : "Not Archived",
          createdOn: item.createdOn.substr(0, 10),
        };
      });
      setDataSource(modifiedResponse);
      setFilteredDataSource(modifiedResponse);
    });
  };

  useEffect(() => {
    retrieveAllData();
  }, []);

  useEffect(() => {
    let searchQueries: any[] = [];
    if (searchTerm === "") setFilteredDataSource(dataSource);
    if (
      searchTerm.includes("is:") ||
      searchTerm.includes("after:") ||
      searchTerm.includes("not:")
    ) {
      searchQueries = searchTerm.split(" ").filter((e) => e);
    } else {
      searchQueries.push(searchTerm);
      searchQueries = searchQueries.filter((e) => e);
    }
    const projectTypes = Object.values(PROJECT_TYPE).map((item) =>
      item.toLowerCase()
    );
    const projectStatus = Object.values(PROJECT_STATUS).map((item) =>
      item.toLowerCase()
    );

    setSearchQueries((prev) => [...prev, ...searchQueries]);
    searchQueries.forEach((query) => {
      const [queryType, queryValue] = query.split(":");
      switch (queryType) {
        case "is":
          if (projectTypes.includes(queryValue)) {
            setFilteredDataSource((prev) =>
              prev.filter((item) => item.type?.toLowerCase() === queryValue)
            );
          }
          if (projectStatus.includes(queryValue)) {
            setFilteredDataSource((prev) =>
              prev.filter((item) => item.status?.toLowerCase() === queryValue)
            );
          }
          if (queryValue.includes("archived")) {
            setFilteredDataSource((prev) =>
              prev.filter((item) => item.archived?.toLowerCase() === "archived")
            );
          }
          break;
        case "not":
          if (projectTypes.includes(queryValue)) {
            setFilteredDataSource((prev) =>
              prev.filter((item) => item.type?.toLowerCase() === queryValue)
            );
          }
          if (projectStatus.includes(queryValue)) {
            setFilteredDataSource((prev) =>
              prev.filter((item) => item.status?.toLowerCase() === queryValue)
            );
          }
          if (queryValue.includes("archived")) {
            setFilteredDataSource((prev) =>
              prev.filter((item) => item.archived?.toLowerCase() !== "archived")
            );
          }
          break;
        case "after":
          break;
        default:
          const filteredData = filteredDataSource.filter((data) => {
            return data.name!.toLowerCase().includes(searchTerm.toLowerCase());
          });
          setFilteredDataSource(filteredData);
      }
    });
    // Object.values(PROJECT_STATUS).forEach((item) => {
    //   if (searchTerm.toLowerCase().includes(`is:${item.toLowerCase()}`)) {
    //     const filteredData = filteredDataSource.filter((data) => {
    //       return searchTerm.toLowerCase().includes(data.status!.toLowerCase());
    //     });
    //     setFilteredDataSource(filteredData);
    //   }
    // });
    // Object.values(PROJECT_TYPE).forEach((item) => {
    //   if (searchTerm.toLowerCase().includes(`is:${item.toLowerCase()}`)) {
    //     const filteredData = filteredDataSource.filter((data) => {
    //       return searchTerm.toLowerCase().includes(data.type!.toLowerCase());
    //     });
    //     setFilteredDataSource(filteredData);
    //   }
    // });
    // Object.values(PROJECT_STATUS).forEach((item) => {
    //   if (searchTerm.toLowerCase().includes(`not:${item.toLowerCase()}`)) {
    //     const filteredData = filteredDataSource.filter((data) => {
    //       return !searchTerm.toLowerCase().includes(data.status!.toLowerCase());
    //     });
    //     setFilteredDataSource(filteredData);
    //   }
    // });
    // Object.values(PROJECT_TYPE).forEach((item) => {
    //   if (searchTerm.toLowerCase().includes(`not:${item.toLowerCase()}`)) {
    //     const filteredData = filteredDataSource.filter((data) => {
    //       return !searchTerm.toLowerCase().includes(data.type!.toLowerCase());
    //     });
    //     setFilteredDataSource(filteredData);
    //   }
    // });
    // if (searchTerm === "") setFilteredDataSource(dataSource);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);
  return (
    <React.Fragment>
      <BasicLayout>
        <h1 className="text-2xl font-bold py-5 md:text-start text-center">
          Recent Project
        </h1>
        <div className="flex flex-col md:flex-row">
          <TextField
            placeholder="Search something"
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            appendIcon={SearchIcon}
          />
          <div className="flex items-center gap-2 ml-5 lg:mt-0 mt-5">
            {searchQueries.map((query, index) => {
              return (
                <span
                  key={index}
                  className="px-2 shadow-sm rounded-lg font-bold cursor-pointer text-black bg-white"
                >
                  {query}
                </span>
              );
            })}
            {searchQueries.length > 0 && (
              <span
                onClick={() => {
                  setSearchQueries([]);
                  setFilteredDataSource(dataSource);
                  setSearchTerm("");
                }}
                className="px-2 shadow-sm rounded-lg font-bold text-white cursor-pointer bg-red-500"
              >
                Reset x
              </span>
            )}
          </div>
        </div>
        <DataTable
          headers={headers}
          dataSource={filteredDataSource}
          setDataSource={setFilteredDataSource}
        />
      </BasicLayout>
    </React.Fragment>
  );
};

export default App;
