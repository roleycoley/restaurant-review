import React, { useState, useEffect, useMemo } from "react";
import RestaurantDataService from "../services/restaurant";

import { ceil } from "mathjs";
import RestaurantCard from "./restaurant-card";

export default function RestaurantsList() {
  // variables for all things people are searching for
  const [restaurants, setRestaurants] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchZip, setSearchZip] = useState("");
  const [searchCuisine, setSearchCuisine] = useState("");
  const [cuisines, setCuisines] = useState(["All Cuisines"]);
  const [zipcodes, setZipcodes] = useState(["All Zipcodes"]);
  const [totalReturned, setTotalReturned] = useState(0);
  const [currentPage, setPage] = useState(0);

  useEffect(() => {
    retrieveRestaurants();
    retrieveCuisines();
    retrieveZipcodes();
  }, []);

  const findMaxPages = (returnedRestaurants) => {
    let pages;

    pages = Math.ceil(returnedRestaurants / 20);

    // first page is page 0, so we subtract 1
    pages -= 1;

    return pages;
  };

  const maxPages = useMemo(() => {
    return findMaxPages(totalReturned);
  }, [totalReturned]);

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const onChangeSearchZip = (e) => {
    const searchZip = e.target.value;
    setSearchZip(searchZip);
  };

  const onChangeSearchCuisine = (e) => {
    const searchCuisine = e.target.value;
    setSearchCuisine(searchCuisine);
  };

  const retrieveRestaurants = (page = 0) => {
    RestaurantDataService.getAll(page)
      .then((response) => {
        console.log(response.data);
        // if you try to console.log these they will not return anything
        setRestaurants(response.data.restaurants);
        setTotalReturned(response.data.total_results);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveCuisines = () => {
    RestaurantDataService.getCuisines()
      .then((response) => {
        console.log(response.data);
        setCuisines(["All Cuisines"].concat(response.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveZipcodes = () => {
    RestaurantDataService.getZipcodes()
      .then((response) => {
        console.log(response.data);
        setZipcodes(["All Zipcodes"].concat(response.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveRestaurants();
  };

  const find = (query, by) => {
    RestaurantDataService.find(query, by)
      .then((response) => {
        console.log(response.data);
        setRestaurants(response.data.restaurants);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByName = () => {
    find(searchName, "name");
  };

  const findByZip = () => {
    find(searchZip, "zipcode");
  };

  const findByCuisine = () => {
    if (searchCuisine == "All Cuisines") {
      refreshList();
    } else {
      find(searchCuisine, "cuisine");
    }
  };

  return (
    <>
      <div>
        <div className="row pb-1">
          <div className="input-group col-lg-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchName}
              onChange={onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={findByName}
              >
                Search
              </button>
            </div>
          </div>
          <div className="input-group col-lg-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search by zip"
              value={searchZip}
              onChange={onChangeSearchZip}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={findByZip}
              >
                Search
              </button>
            </div>
          </div>

          <div className="input-group col-lg-4">
            <select onChange={onChangeSearchZip}>
              {zipcodes.map((zipcode) => {
                return <option value={zipcode}> {zipcode} </option>;
              })}
            </select>
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={findByZip}
              >
                Search
              </button>
            </div>
          </div>

          <div className="input-group col-lg-4">
            <select onChange={onChangeSearchCuisine}>
              {cuisines.map((cuisine) => {
                return (
                  <option value={cuisine}> {cuisine.substr(0, 20)} </option>
                );
              })}
            </select>
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={findByCuisine}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          {restaurants.map(restaurant => {
            const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;
            return <RestaurantCard address={address} restaurant={restaurant} />
          })}
        </div>
      </div>
    </>
  );
}
