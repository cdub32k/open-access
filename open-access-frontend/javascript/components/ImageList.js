import React, { Component } from "react";

import Image_C from "./Image";

const images = [
  {
    title: "First image",
    caption: "Me and my friends",
    url: "https://via.placeholder.com/300x400.png",
  },
  {
    title: "First image",
    caption: "Me and my friends",
    url: "https://via.placeholder.com/300x400.png",
  },
  {
    title: "First image",
    caption: "Me and my friends",
    url: "https://via.placeholder.com/300x400.png",
  },
  {
    title: "First image",
    caption: "Me and my friends",
    url: "https://via.placeholder.com/300x400.png",
  },
  {
    title: "First image",
    caption: "Me and my friends",
    url: "https://via.placeholder.com/300x400.png",
  },
];

class ImageList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const imageListHTML = /*this.props.*/ images.map((image, i) => {
      return (
        <Image_C
          url={image.url}
          title={image.title}
          caption={image.caption}
          width={300}
          height={400}
          key={i}
        />
      );
    });

    return <div>{imageListHTML}</div>;
  }
}

export default ImageList;
