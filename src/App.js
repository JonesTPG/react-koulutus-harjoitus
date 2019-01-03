import React, { Component } from "react";
import { getPosts } from "octo-sample-api";

import SinglePost from "./Components/SinglePost";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null,
      filter: "",
      reverse: false,
      // Nyt koko "postaus", "oikeassa" sovelluksessa olisi todennäköisesti järkevää tallentaa
      // vain ID.
      selectedPost: null
    };
    this.setFilter = this.setFilter.bind(this);
    this.setReverse = this.setReverse.bind(this);
    this.setSelectedPost = this.setSelectedPost.bind(this);
    this.clear = this.clear.bind(this);
  }

  componentDidMount() {
    getPosts().then(posts => {
      this.setState({ posts: posts });
    });
  }

  setFilter(e) {
    this.setState({ filter: e.target.value });
  }

  setReverse() {
    // Käytetty setState():n muotoa jossa parametrina on funktio joka taas saa ensimmäisenä
    // parametrina nykyisen tilan. Turvallinen jos setState() kutsutaan useita kertoja
    // peräkkäin (tässä lähinnä esimerkin vuoksi).
    this.setState(state => {
      return { reverse: !state.reverse };
    });
  }

  setSelectedPost(post) {
    this.setState({ selectedPost: post });
  }

  clear() {
    this.setState({ selectedPost: null });
  }

  render() {
    if (this.state.posts === null) {
      return "Ladataan";
    }

    /* Jos tämä komponentti renderöitäisiin usein tai tämä posts-lista olisi suuri,
       kannattaisi tämä "memota". */
    const filtered = this.state.posts.filter(
      post =>
        post.title.toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1
    );

    if (this.state.reverse) {
      // Ok koska .filter() on palauttanut uuden taulukon eikä muokata statea
      filtered.reverse();
    }

    return (
      <div className="posts-app">
        <div className="post-list">
          <input
            value={this.state.filter}
            type="text"
            onChange={this.setFilter}
          />
          <ul>
            {filtered.map(post => (
              <li
                key={post.id}
                className="post-list-item"
                onClick={() => this.setSelectedPost(post)}
              >
                {post.title}
              </li>
            ))}
          </ul>
          <button onClick={this.setReverse}>Käännä järjestys</button>
          <div className="post-count">
            {filtered.length} / {this.state.posts.length}
          </div>
        </div>
        <div className="single-post">
          {this.state.selectedPost ? (
            <SinglePost clearPost={this.clear} post={this.state.selectedPost} />
          ) : (
            "Ei valittua viestiä"
          )}
        </div>
      </div>
    );
  }
}

export default App;
