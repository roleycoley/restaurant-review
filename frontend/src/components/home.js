export default function Home() {
  return (
    <>
      <div className="flexbox-title">
        <div className="title">FOOD FINDER</div>
        <img src="breakfast.svg" alt="breakfast" className="fpage-image" />
        <div
          style={{
            color: "white",
            marginTop: "30px",
            fontSize: "60px",
            letterSpacing: "5px",
            fontStyle: "italic",
          }}
        >
          Let's Eat!
        </div>
      </div>

      <div style={{ padding: "30px", background:"white" }}>
        <div
          style={{
            fontSize: "40px",
            letterSpacing: "2px",
            textAlign: "center",
          }}
        >
          How does it work?
        </div>
        <div
          style={{
            fontSize: "25px",
            letterSpacing: "2px",
            textAlign: "center",
            color: "darkgray",
          }}
        >
          <em>It takes a "SEC"</em>
        </div>
        <div className="flexbox-info">
          <div className="flexbox-search">
            <img
              src="search.svg"
              alt="people searching for restaurants"
              className="info-image"
            />
            <div>
              <em>Search</em>
            </div>
            <div className="description">
              Look for restaurants near you! View restaurants by name, zipcode,
              or cuisine type.
            </div>
          </div>
          <div className="flexbox-eat">
            <img src="eat.svg" alt="people eating" className="info-image" />
            <div>
              <em>Eat</em>
            </div>
            <div className="description">Self explanatory!</div>
          </div>
          <div className="flexbox-review">
            <img
              src="comment.svg"
              alt="people reviewing restaurants"
              className="info-image"
            />
            <div>
              <em>Comment</em>
            </div>
            <div className="description">
              Was the food good? Help others out by leaving a comment/review on
              a restaurant! Must login first.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
