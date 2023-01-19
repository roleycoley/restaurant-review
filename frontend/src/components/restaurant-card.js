import { Link } from "react-router-dom";

export default function RestaurantCard({ address, restaurant }) {
  return (
    <div className="col-lg-4 pb-1">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{restaurant.name}</h5>
          <p className="card-text">
            <strong>Cuisine: </strong>
            {restaurant.cuisine}
            <br />
            <strong>Address: </strong>
            {address}
          </p>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Link to={"/restaurants/" + restaurant._id}>
              <button className="red-button" >View Reviews</button>
            </Link>
            <a
              target="_blank"
              href={"https://www.google.com/maps/place/" + address}
            >
              <button className="red-button">View Map</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
