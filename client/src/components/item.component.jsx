import React, { useContext, useState } from "react";
import { Card, CardTitle, CardText, Input, Label, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleDown,
    faAngleUp,
    faPlusCircle,
    faPlusSquare,
    faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
const Item = ({ item }) => {
    const [reviewToggle, setReviewToggle] = useState(false);
    const [addComment, setaddComment] = useState(false);
    const [comment, setcomment] = useState("");
    const days = parseInt(
        (new Date() - new Date(item.updatedAt)) / (1000 * 60 * 60 * 24),
        10,
    );
    const handleChange = (e) => setcomment(e.target.value);
    const postComment = () => {
        console.log(comment);
        const query = {
            comment,
            id: item._id,
        };
        axios
            .post("/api/post/comment", query)
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
    };
    return (
        <Card className='row flex-row w-100 m-1 '>
            <div className='col-12 col-md-4 col-lg-3 p-2 my-auto'>
                <img src={item.image} className='img-fluid' alt='photu' />
            </div>
            <div className='col-12 col-md-8 col-lg-9 p-3 content'>
                <CardTitle tag='h5'>{item.title}</CardTitle>
                <CardText>
                    <FontAwesomeIcon
                        icon={faThumbsUp}
                        className='like'
                        title='Like the post'
                    />
                    {item.likes.length} Likes
                    <br />
                    <strong>{item.author.username} : </strong>
                    {item.text.slice(0, 100)} ...
                </CardText>
                <CardText>
                    <div className='d-flex flex-row justify-content-between'>
                        {item.comments.length !== 0 && (
                            <span
                                style={{ cursor: "pointer" }}
                                className='text-primary'
                                onClick={() => setReviewToggle(!reviewToggle)}>
                                View {item.comments.length} Comments{" "}
                                <span>
                                    <FontAwesomeIcon
                                        icon={
                                            !reviewToggle
                                                ? faAngleDown
                                                : faAngleUp
                                        }
                                    />
                                </span>
                            </span>
                        )}
                        <span
                            className='link'
                            onClick={() => setaddComment(!addComment)}>
                            <FontAwesomeIcon
                                className='mr-1'
                                icon={faPlusSquare}
                            />
                            Comment
                        </span>
                    </div>
                    <div>
                        {reviewToggle &&
                            item.comments.map((comment, ind) => (
                                <div className='review'>
                                    <strong>
                                        {comment?.author?.username} :{" "}
                                    </strong>
                                    {comment.text}
                                </div>
                            ))}
                    </div>
                    {addComment && (
                        <div className='d-flex flex-row new-comment'>
                            <Label className='d-flex flex-column justify-content-center m-0'>
                                <strong>Current User : </strong>
                            </Label>
                            <div className='flex-grow-1 ml-1 d-flex flex-row justify-content-between'>
                                <Input
                                    type='textarea'
                                    name='comment'
                                    id='comment'
                                    placeholder='add a comment ...'
                                    onChange={handleChange}
                                    className='flex-grow-1 mr-1'
                                    value={comment}
                                    rows={1}
                                />
                                <Button
                                    size='sm'
                                    color='primary'
                                    disabled={comment.length === 0}
                                    onClick={postComment}>
                                    Post
                                </Button>
                            </div>
                        </div>
                    )}
                    <small className='text-muted'>
                        Last updated {days === 0 ? "today" : `${days} days ago`}
                    </small>
                </CardText>
            </div>
        </Card>
    );
};
export default Item;
