import React from "react";

const style = {
  root:{
    padding:"0 15px",
    margin:"20px 0"
  }
}
export default class Article extends React.Component {

  render() {
    return (
      <div style={style.root}>
         Article
      </div>
    )
  }
}
