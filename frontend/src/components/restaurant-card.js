import { Link } from "react-router-dom";

export default function RestaurantCard({ address, restaurant }) {
  return (
    <div className="restaurant-card">
      <h5 className="card-title">{restaurant.name}</h5>
      <p className="card-text">
        <strong>Cuisine: </strong>
        {restaurant.cuisine}
        <br />
        <strong>Address: </strong>
        {address}
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "auto",
        }}
      >
        <Link to={"/restaurants/" + restaurant._id}>
          <button
            style={{ width: "175px", height: "40px" }}
            className="red-button"
          >
            View Reviews
          </button>
        </Link>
        <a
          target="_blank"
          href={"https://www.google.com/maps/place/" + address}
        >
          <button
            style={{ width: "175px", height: "40px" }}
            className="red-button"
          >
            View Map
          </button>
        </a>
      </div>
    </div>
  );
}
