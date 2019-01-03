import React from "react";
import { getCommentsForPost } from "octo-sample-api";

class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    };
  }

  componentDidMount() {
    getCommentsForPost(this.props.postId).then(comments => {
      this.setState({ comments: comments });
    });
  }

  render() {
    return (
      <ul className="comment-list">
        {this.state.comments.map(comment => (
          <li key={comment.id} className="comment-list-comment">
            {comment.body}{" "}
            <span className="comment-author">{comment.email}</span>
          </li>
        ))}
      </ul>
    );
  }
}

export default CommentList;
