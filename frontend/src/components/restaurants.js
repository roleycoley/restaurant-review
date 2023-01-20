import React, { useState, useEffect } from "react";
import RestaurantDataService from "../services/restaurant";
import { Link, useParams } from "react-router-dom";

const Restaurant = (props) => {
  const initialRestaurantState = {
    id: null,
    name: "",
    address: {},
    cuisine: "",
    reviews: [],
  };

  let { id } = useParams();

  const [restaurant, setRestaurant] = useState(initialRestaurantState);

  const getRestaurant = (id) => {
    RestaurantDataService.get(id)
      .then((response) => {
        setRestaurant(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // how we find a unique restaurant review page
  useEffect(() => {
    getRestaurant(`${id}`);
  }, `${id}`);

  const deleteReview = (reviewId, index) => {
    RestaurantDataService.deleteReview(reviewId, props.user.id)
      .then((response) => {
        setRestaurant((prevState) => {
          prevState.reviews.splice(index, 1);
          return {
            ...prevState,
          };
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {restaurant ? (
        <>
          <div style={{ padding: "40px" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="restaurant-page-info">
                <div style={{ fontSize: "45px", letterSpacing: "1px" }}>
                  {restaurant.name}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    fontSize: "25px",
                  }}
                >
                  <div>
                    <strong>
                      <span style={{ letterSpacing: "1px" }}>Cuisine:</span>{" "}
                    </strong>
                    {restaurant.cuisine}
                  </div>
                  <div>
                    <strong>
                      <span style={{ letterSpacing: "1px" }}>Address: </span>
                    </strong>
                    {restaurant.address.building} {restaurant.address.street},{" "}
                    {restaurant.address.zipcode}
                  </div>
                </div>
                <Link to={`/restaurants/${id}/review`}>
                  <button
                    className="red-button"
                    style={{ width: "300px", height: "50px", fontSize: "20px" }}
                  >
                    Add Review
                  </button>
                </Link>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                color: "white",
                fontSize: "40px",
                letterSpacing: "2px",
                margin: "25px auto",
              }}
            >
              <em>Reviews</em>
            </div>

            <div className="row">
              {restaurant.reviews.length > 0 ? (
                restaurant.reviews.map((review, index) => {
                  return (
                    <div className="col-lg-4 pb-1" key={index}>
                      <div className="card">
                        <div className="card-body">
                          <p className="card-text">
                            {review.text}
                            <br />
                            <strong>User: </strong>
                            {review.name}
                            <br />
                            <strong>Date: </strong>
                            {review.date}
                          </p>
                          {props.user && props.user.id === review.user_id && (
                            <div className="row">
                              <a
                                onClick={() => deleteReview(review._id, index)}
                                className="btn btn-primary col-lg-5 mx-1 mb-1"
                              >
                                Delete
                              </a>
                              <Link
                                to={`/restaurants/${id}/review`}
                                state={{
                                  currentReview: review,
                                }}
                                className="btn btn-primary col-lg-5 mx-1 mb-1"
                              >
                                Edit
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "30px",
                    letterSpacing: "1px",
                  }}
                >
                  Be the first to leave a review!
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div>
          <br />
          <p>No restaurant selected.</p>
        </div>
      )}
    </div>
  );
};

export default Restaurant;
