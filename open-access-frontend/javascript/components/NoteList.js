import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";

import ContentPreview from "./ContentPreview";
import PreviewPlaceholder from "./PreviewPlaceholder";
import CustomButton from "./CustomButton";

const styles = (theme) => ({
  container: {
    textAlign: "center",
    margin: "32px 0",
  },
  contentList: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    maxWidth: 1260,
    padding: 0,
  },
});

class NoteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notePage: 0,
    };
    this.loadMore = this.loadMore.bind(this);
  }

  loadMore = () => {
    this.props.loadMore(this.state.notePage + 1);
    this.setState({
      notePage: this.state.notePage + 1,
    });
  };

  render() {
    const { classes, loading, hasMore } = this.props;

    const noteListHTML = loading
      ? Array.from({ length: 8 }).map((preview, i) => {
          return <PreviewPlaceholder key={i} />;
        })
      : this.props.notes.map((note, i) => {
          return (
            <ContentPreview
              contentType="note"
              id={note._id}
              user={note.user}
              body={note.body}
              commentCount={note.commentCount}
              uploadedAt={note.uploadedAt}
              key={i}
            />
          );
        });

    return (
      <div className={classes.container}>
        <div className={classes.contentList}>{noteListHTML}</div>
        {hasMore && (
          <div>
            <CustomButton text="Load more" onClick={this.loadMore} />
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(NoteList);
