import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category:"general"
  }

  static propTypes = {
      country:PropTypes.string,
      pageSize:PropTypes.number,
      category:PropTypes.string,
  }
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    // console.log("cdm")
    // let url="https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=148910c2c1324f058a1ee124c7862ae3"
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData)
    // this.setState({articles: parsedData})
    console.log("cdm");
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=148910c2c1324f058a1ee124c7862ae3&page=1&pageSize=${this.props.pageSize}    `;
    try {
      this.setState({loading:true});
      let data = await fetch(url);
      let parsedData = await data.json();

      console.log(parsedData);
      if (parsedData.articles) {
        this.setState({
          articles: parsedData.articles,
          loading: false,
          totalResults: parsedData.totalResults,
        });
      } else {
        this.setState({ loading: false });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      this.setState({ loading: false });
    }
  }

  handlePrevClick = async () => {
    console.log("previous");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=148910c2c1324f058a1ee124c7862ae3&page= ${
      this.state.page - 1} &pageSize=${this.props.pageSize}
  `;
    
      this.setState({loading:true});

      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);

    this.setState({
      page: this.state.page - 1,
      articles:parsedData.articles,
      loading:false
    })
  }

  handleNextClick = async () => {
    console.log("next");
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=148910c2c1324f058a1ee124c7862ae3&page= ${
        this.state.page + 1} &pageSize=${this.props.pageSize}   `;
      this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
      
      this.setState({
        page: this.state.page + 1,
        articles:parsedData.articles,
        loading:false
      });
    }
  };

  render() {
    console.log("render");
    return (
      <div className="container my-3">
      <h1 className="text-center" style={{margin:'35px 0px'}}>NewsMonkey - Top Headlines</h1>
      {this.state.loading && <Spinner/>}
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.id}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imgurl={element.urlToImage}
                    newsurl={element.url}
                    author = {element.author}
                    date = {element.publishedAt}
                    source = {element.source.name}
                  />
                </div>
              );
            })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            class="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
          disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)}
            type="button"
            class="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
