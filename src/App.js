import React, { Component } from 'react';
import Image from "./Image.js";

class App extends Component {

  constructor (props) {
    super(props);

    this.state = {
      imgUrls:[
        {id: 0,
        url: "https://d17fnq9dkz9hgj.cloudfront.net/uploads/2012/11/91615172-find-a-lump-on-cats-skin-632x475.jpg",
        score: 80},
        {id: 1,
        url: "https://proxy.topixcdn.com/ipicimg/R0GN8TA70MQ8FF5N-cp0x237x1600x1038-fill810x415x",
        score: 1000},
        {id: 2,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSWeFeN5gO_iCKZSZv22FsI_GnSQNLqYZLZ9t5BP91X8Pm150M",
        score: 17},
        {id: 3,
        url: "https://static1.comicvine.com/uploads/original/6/63459/5391391-8476188794-_8682.png",
        score: 10},
      ],
      currentImage: "https://proxy.topixcdn.com/ipicimg/R0GN8TA70MQ8FF5N-cp0x237x1600x1038-fill810x415x",
    };
  };

  render() {
    return (
      <div className="App">
        <div className="gallery">
          <button className="button" onClick={this._switchImageBackward}>&lt;</button>
          {this._convertImgUrlToImgElement(this._getCurrentImageUrl())}
          <button className="button" onClick={this._switchImageForward}>&gt;</button>
        </div>
        <div className="score">
          Score = {this._getCurrentImageObjectScore()}
        </div>
        <button className="button" onClick={this._subtractPointFromImg}>-</button>  
        <button className="button" onClick={this._addPointToImg}>+</button>
      </div>
    );
  }

  // _convertImgUrlToImgElements = () => {
  //   const returnArray = this.state.imgUrls.map(url => {
  //     return (
  //       <Image imgUrl={url} />
  //     );
  //   });

  //   return returnArray;
  // }

  _addPointToImg = () => {
    const currentImg = this._getCurrentImageObject();
    currentImg.score++;

    const newArray = this.state.imgUrls.map(obj => {
      if (obj.id !== currentImg.id) {
        return obj;
      } else {
        return currentImg;
      }
    });
    
    this.setState({
      imgUrls: newArray,
    });
  }

  _subtractPointFromImg = () => {
    const currentImg = this._getCurrentImageObject();
    if (currentImg.score > 0) {
      currentImg.score--;
    }

    const newArray = this.state.imgUrls.map(obj => {
      if (obj.id !== currentImg.id) {
        return obj;
      } else {
        return currentImg;
      }
    });
    
    this.setState({
      imgUrls: newArray,
    });
  }

  _getAllButCurrentImage = () => {
    let subArray = [];
    this.state.imgUrls.forEach(obj => {
      if (obj.url !== this.state.currentImage) {
        subArray.push(obj);
      }
    });
    return subArray;
  }

  _switchImageForward = () => {
    let newCurrentImage;
    let newCurrentImageIndex = 0;
    const imgUrls = this._getImgUrls();
    
    imgUrls.forEach((url, index) => {
      if (url === this.state.currentImage) {
        newCurrentImageIndex = index + 1;
      }
    });

    if (newCurrentImageIndex === this.state.imgUrls.length) {
      newCurrentImageIndex = 0;
    }
    
    newCurrentImage = imgUrls[newCurrentImageIndex];

    this.setState({
      currentImage: newCurrentImage,
    });
  }
  _switchImageBackward = () => {
    let newCurrentImage;
    let newCurrentImageIndex = 0;
    const imgUrls = this._getImgUrls();
    
    imgUrls.forEach((url, index) => {
      if (url === this.state.currentImage) {
        newCurrentImageIndex = index - 1;
      }
    });

    if (newCurrentImageIndex === -1) {
      newCurrentImageIndex = this.state.imgUrls.length - 1;
    }
    
    newCurrentImage = imgUrls[newCurrentImageIndex];

    this.setState({
      currentImage: newCurrentImage,
    });
  }

  _convertImgUrlToImgElement = (url) => {
    return (
      <Image imgUrl={url} />
    );
  }

  _getCurrentImageUrl = () => {
    const imgUrls = this._getImgUrls();
    const returnThing = imgUrls.find(url => {
      return url === this.state.currentImage;
    });
    return returnThing;
  }

  _getCurrentImageObjectScore = () => {
    const imgObj = this.state.imgUrls.find((obj) => {
      return obj.url === this.state.currentImage;
    });

    return imgObj.score;
  }

  _getCurrentImageObject = () => {
    const imgObj = this.state.imgUrls.find((obj) => {
      return obj.url === this.state.currentImage;
    });

    return imgObj;
  }

  _getImgUrls = () => {
    let arrayOfUrls = [];
    this.state.imgUrls.forEach(obj => {
      arrayOfUrls.push(obj.url);
    });
    return arrayOfUrls;
  }
}

export default App;
