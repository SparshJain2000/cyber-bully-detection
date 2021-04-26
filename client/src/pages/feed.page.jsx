import React, { useState, useEffect } from "react";

import Item from "../components/item.component";
import img from "../assets/PNG/Transparent/19 Coming soon.png";
// import AnimatedBackground from "../components/animatedBackground.component";
// import { types, images } from "../assets/data";
import axios from "axios";
const Items = ({ feed }) => {
    return (
        <div className='row flex-row m-2 p-2'>
            {feed && feed.length === 0 ? (
                <p className='w-75 mx-auto text-align-center'>
                    <h2>Nothing Found</h2>
                    <img src={img} className='img-fluid' alt='' />
                </p>
            ) : (
                feed?.map((item) => <Item key={item._id} post={item} />)
            )}
        </div>
    );
};
const Feed = () => {
    const [data, setdata] = useState([]);
    useEffect(() => {
        axios
            .get("/api/post")
            .then(({ data }) => setdata(data))
            .catch((err) => console.log(err));
    }, []);
    return (
        <>
            <div className='flex-grow-1 pt-3  position-relative'>
                <h4 className='text-align-center'>Your Feed</h4>

                <hr />
                <div className='col-12 col-md-10 col-lg-9 col-xl-8 mx-auto px-0'>
                    <Items feed={data.feed} />
                </div>
            </div>
        </>
    );
};
export default Feed;
