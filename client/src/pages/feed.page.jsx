import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import Item from "../components/item.component";
import data from "../assets/data";
import img from "../assets/PNG/Transparent/19 Coming soon.png";
// import AnimatedBackground from "../components/animatedBackground.component";
// import { types, images } from "../assets/data";
import { Button } from "reactstrap";
const Items = ({ feed }) => {
    console.log(data);
    return (
        <div className='row flex-row m-2 p-2'>
            {feed && feed.length === 0 ? (
                <p className='w-75 mx-auto text-align-center'>
                    <h2>Nothing Found</h2>
                    <img src={img} className='img-fluid' alt='' />
                </p>
            ) : (
                data?.feed?.map((item) => <Item key={item._id} item={item} />)
            )}
        </div>
    );
};
const Feed = () => {
    return (
        <>
            <div className='flex-grow-1 pt-3  position-relative'>
                <h4 className='text-align-center'>Your Feed</h4>

                <hr />
                <Items feed={data.feed} />
            </div>
        </>
    );
};
export default Feed;
