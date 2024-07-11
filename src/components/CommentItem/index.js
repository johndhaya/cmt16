import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {commentDetails} = props
  const {id, name, comment, isLiked, initialClassName, date} = commentDetails

  const initial = name ? name[0].toUpperCase() : ''
  const likeClass = isLiked ? 'btn active' : 'btn'
  const likeImg = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const postedAt = formatDistanceToNow(date)

  const onClickLike = () => {
    const {toggleIsLiked} = props
    toggleIsLiked(id)
  }

  const onDeleteComment = () => {
    const {deleteComment} = props
    deleteComment(id)
  }

  return (
    <li className="cmt-item">
      <div className="cmt-cont">
        <div className={initialClassName}>
          <p className="initial">{initial}</p>
        </div>
        <div>
          <div className="user-cont">
            <p className="name">{name}</p>
            <p className="time">{postedAt}</p>
          </div>
          <p className="cmt">{comment}</p>
        </div>
      </div>
      <div className="btn-cont">
        <div className="like-cont">
          <img src={likeImg} alt="like" className="like-img" />
          <button className={likeClass} type="button" onClick={onClickLike}>
            Like
          </button>
        </div>
        <button
          className="btn"
          type="button"
          onClick={onDeleteComment}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="delete-img"
          />
        </button>
      </div>
      <hr className="cmt-line" />
    </li>
  )
}

export default CommentItem
