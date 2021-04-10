import React, { Fragment } from "react";
import { Link } from "react-router-dom";
// import img from "../assets/home.png";
// import AnimatedBackground from "../components/animatedBackground.component";
// import { types, images } from "../assets/data";
const Home = () => {
    return (
        <>
            <div className='position-relative'>
                <div className='row mx-0' style={{ minHeight: "30vh" }}>
                    <div className='col-12 col-md-6 my-auto pl-5 '>
                        <h1 className='text-white'>JobHub </h1>
                        <p style={{ color: "var(--gray)" }}>
                            A platform for connecting professionals and
                            employers
                        </p>
                        <div>
                            <Link
                                to='/professionals'
                                className='btn btn-sm btn-secondary ml-1'>
                                Hire Professionals
                            </Link>
                            <Link
                                to='/jobs'
                                className='btn btn-sm btn-outline-secondary ml-1'>
                                Get Jobs
                            </Link>
                        </div>
                    </div>
                    {/* <div className='col-12 col-md-6 d-none d-md-flex justify-content-center'>
                        <img src={img} className='img-fluid' alt='photu' />
                    </div> */}
                </div>
            </div>
        </>
    );
};
export default Home;
