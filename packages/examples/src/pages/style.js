const scrollbarStyle = () => {
  const barWidth = 5;
  const radius = 0; //barWidth / 2;
  return {
    "::-webkit-scrollbar": {
      width: barWidth + "px"
    },
    "::-webkit-scrollbar-track": {
      "-webkit-border-radius": radius + "px",
      borderRadius: radius + "px",
      background: "rgba(0,0,0,0.1)"
    },
    "::-webkit-scrollbar-thumb": {
      "-webkit-border-radius": radius + "px",
      borderRadius: radius + "px",
      background: "rgba(0,0,0,0.2)"
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "rgba(0,0,0,0.4)"
    },
    "::-webkit-scrollbar-thumb:window-inactive": {
      background: "rgba(0,0,0,0.05)"
    }
  };
};

export default [{
  ".example.pages": {
    "&.slider, .content, .page": {
      height: "inherit"
    },
    " .page-content": [
      scrollbarStyle(), {
        height: "inherit",
        "-webkit-overflow-scrolling": "touch",
        "-webkit-transform": "translate3d(0, 0, 0)",
        overflowX: "hidden",
        overflowY: "auto",

        " .article-content": {
          padding: "20px 16px"
        },
        " .title": {
          fontSize: "21px",
          lineHeight: 21 * 1.4 + "px",
          margin: "0 0 16px 0"
        },
        " p": {
          fontSize: "15px",
          lineHeight: 15 * 1.4 + "px",
          color: "#777",
          margin: "0 0 16px 0"
        }
      }
    ]
  }
}];
