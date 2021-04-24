import React, { useContext, useState } from "react";
import { Card, CardTitle, CardText } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge } from "reactstrap";
import {
    faAngleDown,
    faAngleUp,
    faMapMarkedAlt,
    faStar,
    faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
const Item = ({ item }) => {
    const [reviewToggle, setReviewToggle] = useState(false);
    const days = parseInt(
        (new Date() - new Date(item.updatedAt)) / (1000 * 60 * 60 * 24),
        10,
    );

    return (
        <Card className='row flex-row h-100 m-1'>
            <div className='col-12 col-md-4 col-lg-3'>
                <img src={item.image} className='img-fluid p-2 py-3' alt='' />
            </div>
            <div className='col-12 col-md-8 col-lg-9 p-3'>
                <CardTitle tag='h5'>{item.title}</CardTitle>
                <CardText>
                    {/* {item.type.map((type) => (
                        <strong key={type.title}>{type.title}</strong>
                    ))} */}
                    <FontAwesomeIcon icon={faThumbsUp} className='like' />
                    {item.likes.length} Likes
                    <br />
                    <strong>{item.author.username} : </strong>
                    {item.text.slice(0, 100)} ...
                </CardText>
                <CardText>
                    {/* {`${item.location.city}, ${item.location.state}, ${item.location.country}`} */}
                    <div
                        style={{ cursor: "pointer" }}
                        onClick={() => setReviewToggle(!reviewToggle)}>
                        View {item.likes.length} Comments{" "}
                        <span>
                            <FontAwesomeIcon
                                icon={!reviewToggle ? faAngleDown : faAngleUp}
                            />
                        </span>{" "}
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
                    <small className='text-muted'>
                        Last updated {days === 0 ? "today" : `${days} days ago`}
                    </small>
                </CardText>
            </div>
        </Card>
    );
};
export default Item;
