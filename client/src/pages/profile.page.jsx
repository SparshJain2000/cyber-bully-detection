import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Card, CardTitle, CardText, Input, Label, Button } from "reactstrap";
import AuthContext from "../context/auth.context";
import img from "../assets/PNG/Transparent/7 Social Media.png";
// import AnimatedBackground from "../components/animatedBackground.component";
// import { types, images } from "../assets/data";
import axios from "axios";
const Profile = () => {
    const context = useContext(AuthContext);
    const { id } = useParams();
    const [user, setuser] = useState(null);
    useEffect(() => {
        console.log(id);
        axios
            .get(`/api/user/${id}`)
            .then(({ data }) => {
                console.log(data);
                setuser(data.user);
            })
            .catch((err) => console.log(err));
    }, []);
    const follow = () => {
        axios
            .post(
                "/api/user/follow",
                { id },
                {
                    headers: {
                        Authorization: `Bearer ${context.token}`,
                    },
                },
            )
            .then((x) => console.log(x))
            .catch((e) => {
                console.log(e?.response);
                console.log(e);
                alert(e?.response?.data?.error);
            });
    };
    return (
        <>
            {user && (
                <Card className='row flex-row w-100 m-1 profile'>
                    <div className='col-12 col-md-4 p-2 my-auto'>
                        <img src={user.image} alt='photu' />
                    </div>
                    <div className='col-12 col-md-8 p-3 content'>
                        <CardTitle tag='h5' className='row'>
                            <span className='col-4 pl-0'>{user.name}</span>
                            <span className='col-4'>
                                Following : {user.following.length}
                            </span>
                            <span className='col-4 pr-0'>
                                Followers : {user.followers.length}
                            </span>
                        </CardTitle>
                        <CardTitle tag='h5'></CardTitle>
                        <CardTitle tag='h5'></CardTitle>

                        <CardText>
                            <Button onClick={follow} disabled={!context.token}>
                                Follow
                            </Button>
                        </CardText>
                    </div>
                </Card>
            )}
        </>
    );
};
export default Profile;
