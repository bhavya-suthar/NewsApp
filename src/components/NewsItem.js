import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imgurl, newsurl, author, date, source } =
      this.props;
    return (
      <div className="my-3">
        <div className="card" style={{ width: "18rem" }}>
          <span
            className="position-absolute top-0 translate-middle badge rounded-pill bg-primary"
            style={{ left: "90%", zindex: "1" }}
          >
            {source}
          </span>

          <img
            src={
              !imgurl
                ? "https://th.bing.com/th/id/OIP.PfinDvSsi6hoF_fpw4XoKgHaHa?w=512&h=512&rs=1&pid=ImgDetMain?resize=1920%2C1440"
                : imgurl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">
              {" "}
              {title}{" "}
             
            </h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-body-secondary">
                By {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              rel="noreferal"
              href={newsurl}
              target="_blank"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
