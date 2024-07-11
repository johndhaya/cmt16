import {Component} from 'react'
import {v4} from 'uuid'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here
class Comments extends Component {
  state = {
    nameInput: '',
    commentInput: '',
    commentsList: [],
  }

  deleteComment = commentId => {
    const {commentsList} = this.state

    this.setState({
      commentsList: commentsList.filter(comment => comment.id !== commentId),
    })
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(each => {
        if (id === each.id) {
          return {...each, isLiked: !each.isLiked}
        }
        return each
      }),
    }))
  }

  renderCommentsList = () => {
    const {commentsList} = this.state

    return commentsList.map(each => (
      <CommentItem
        key={each.id}
        commentDetails={each}
        toggleIsLiked={this.toggleIsLiked}
        deleteComment={this.deleteComment}
      />
    ))
  }

  onAddComment = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state
    const initialBgColorClass = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.floor(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newComment = {
      id: v4(),
      name: nameInput,
      comment: commentInput,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBgColorClass,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      nameInput: '',
      commentInput: '',
    }))
  }

  onChangeCommentInput = event => {
    this.setState({
      commentInput: event.target.value,
    })
  }

  onChangeNameInput = event => {
    this.setState({
      nameInput: event.target.value,
    })
  }

  render() {
    const {nameInput, commentInput, commentsList} = this.state

    return (
      <div className="app-cont">
        <div className="cmt-cont">
          <h1 className="head">Comments</h1>
          <div className="cmt-input">
            <form className="form" onSubmit={this.onAddComment}>
              <p className="form-descp">Say something about 4.0 Technologies</p>
              <input
                className="name-input"
                type="text"
                placeholder="Your Name"
                value={nameInput}
                onChange={this.onChangeNameInput}
              />
              <textarea
                className="cmt-input"
                placeholder="Your Comment"
                value={commentInput}
                onChange={this.onChangeCommentInput}
              />
              <button type="submit" className="add-btn">
                Add Comment
              </button>
            </form>
            <img
              className="img"
              alt="comments"
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            />
          </div>
          <hr className="line" />
          <p className="cmt-head">
            <span className="cmt-count">{commentsList.length}</span> Comments
          </p>
          <ul className="cmt-list">{this.renderCommentsList()}</ul>
        </div>
      </div>
    )
  }
}
export default Comments
