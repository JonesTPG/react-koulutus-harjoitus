import React from "react";
import CommentList from "./CommentList";

class SinglePost extends React.Component {
  render() {
    const post = this.props.post;

    return (
      <div>
        <button onClick={this.props.clearPost} className="close-button">
          x
        </button>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
        {/* "key" oleellinen tässä jotta CommentList luodaan uudestaan postId:n vaihtuessa.
            Todellisessa sovelluksessa kommentit kannattaisi tallentaa ylemmälle tasolle
            jotta saman viestin kommentteja ei ladattaisi useaan kertaan. */}
        <CommentList key={post.id} postId={post.id} />
      </div>
    );
  }
}

export default SinglePost;
