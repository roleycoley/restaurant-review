import React, { useState } from "react";
import RestaurantDataService from "../services/restaurant";
import { Link, useParams, useLocation } from "react-router-dom";
import { columnTransformDependencies } from "mathjs";
import restaurant from "../services/restaurant";

const AddReview = (props) => {
  let initialReviewState = "";

  let editing = false;

  let { id } = useParams();

  const location = useLocation();

  if (location.state && location.state.currentReview) {
    editing = true;
    initialReviewState = location.state.currentReview.text;
  }

  let restaurantName = location.state.restaurantName;

  const [review, setReview] = useState(initialReviewState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    setReview(event.target.value);
  };

  const saveReview = () => {
    var data = {
      text: review,
      name: props.user.name,
      user_id: props.user.id,
      restaurant_id: id,
    };

    if (editing) {
      data.review_id = location.state.currentReview._id;
      RestaurantDataService.updateReview(data)
        .then((response) => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      RestaurantDataService.createReview(data)
        .then((response) => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <div>
      {props.user ? (
        <div className="submit-form">
          {submitted ? (
            <div
              style={{
                padding: "20px",
                color: "white",
                letterSpacing: "2px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <div style={{ fontSize: "30px" }}>
                <em>Your review was submitted successfully!</em>
              </div>
              <button
                style={{ height: "40px", width: "20%", fontSize: "20px" }}
                className="white-button"
              >
                <Link to={`/restaurants/${id}`} className="nav-link">
                  Back to Restaurant
                </Link>
              </button>
            </div>
          ) : (
            <div style={{ padding: "40px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <div
                  style={{
                    color: "white",
                    fontSize: "40px",
                    letterSpacing: "1px",
                  }}
                >
                  <em>{restaurantName}</em>
                </div>
                <label
                  style={{
                    color: "white",
                    fontSize: "20px",
                    letterSpacing: "1px",
                  }}
                  htmlFor="description"
                >
                  {editing ? "Edit" : "Create"} Review
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="text"
                  required
                  value={review}
                  onChange={handleInputChange}
                  name="text"
                />
                <button
                  style={{ margin: "auto", width: "20%", height: "50px" }}
                  onClick={saveReview}
                  className="white-button"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div
          style={{
            padding: "20px",
            color: "white",
            letterSpacing: "2px",
            fontSize: "30px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>
            Please login{" "}
            <em>
              <Link
                to="/login"
                style={{ display: "inline" }}
                className="nav-link"
              >
                here
              </Link>
            </em>{" "}
            before making a review.
          </div>
        </div>
      )}
    </div>
  );
};

export default AddReview;
