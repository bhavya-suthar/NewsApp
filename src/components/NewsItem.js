import React, { Component } from "react";

export class NewsItem extends Component {
  

  render() {
   let {title, description, imgurl, newsurl} = this.props;
    return (
      <div className="my-3">
        <div className="card" style={{width: "18rem"}}>
          <img src={!imgurl?"https://th.bing.com/th/id/OIP.PfinDvSsi6hoF_fpw4XoKgHaHa?w=512&h=512&rs=1&pid=ImgDetMain?resize=1920%2C1440":imgurl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title"> {title}</h5>
            <p className="card-text">{description}</p>
            <a rel="noreferal" href={newsurl} target="_blank" className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
