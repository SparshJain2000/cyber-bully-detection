import React, { useEffect, useState, useContext } from "react";
import {
    Form,
    FormGroup,
    Input,
    FormFeedback,
    Label,
    Button,
    Progress,
} from "reactstrap";
import { useHistory } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleDown,
    faAngleUp,
    faThumbsUp,
    faUpload,
} from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../context/auth.context";
import Axios from "axios";
const CreatePost = () => {
    const context = useContext(AuthContext);
    let history = useHistory();
    const [data, setData] = useState({});
    const [logo, setLogo] = useState("");
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [img, setImg] = useState({});
    const [uploadingLogo, setUploadingLogo] = useState(false);
    const [valid, setValid] = useState({
        title: true,
        description: true,
        price: true,
        location: false,
        type: false,
        date: true,
    });
    const [disable, setDisable] = useState(false);
    const uploadLogo = (e) => {
        const files = Array.from(e.target.files);
        console.log(files);

        if (files.length !== 0) {
            setUploadingLogo(true);
            if (
                files[0].type.split("/")[0] !== "image" ||
                files[0].size > 5000000
            ) {
                console.log("wrong");
                setUploadingLogo(false);
                this.logo.current.value = "";
                return;
            }
            let reader = new FileReader();
            let file = files[0];
            setFile(file);
            // console.log(URL.createObjectURL(file));
            // setLogo(URL.createObjectURL(file));
            reader.readAsDataURL(file);
            reader.onload = () => {
                console.log(reader.result);
                setLogo(reader.result);
            };
        }
    };
    const handleChange = async (e, name) => {
        setData({
            ...data,
            [e.target.name]:
                e.target.name === "price" ? +e.target.value : e.target.value,
        });
    };

    const submit = async (e) => {
        e.preventDefault();
        let post = new FormData();
        await post.append("text", data.description);

        await post.append("image", file);

        for (var pair of post.entries()) {
            console.log(pair[0], pair[1]);
        }

        Axios.post("http://localhost:8080/api/post", post, {
            headers: {
                Authorization: `Bearer ${context.token}`,
            },
        })
            .then(({ data }) => {
                console.log(data);
                setLogo(`http://localhost:8080/${data.image}`);
                history.push("/feed");
            })
            .catch(({ response }) => console.log(response));
    };
    return (
        <div className='col-11 col-md-10 col-lg-9 job-form mx-auto p-2 p-md-3 my-2 my-md-3'>
            <h2>Create a Post</h2>
            <hr className='col-10 col-md-3 header-line mx-0' />

            <Form onSubmit={submit}>
                <div className='row mx-md-5'>
                    <div className='col-12 px-2 px-md-5'>
                        <div className='col-12 text-align-center'>
                            {logo && logo !== "" && (
                                <img
                                    src={logo ? logo : "ad"}
                                    className='img-fluid img-thumbnail width-100'
                                    alt='logo'
                                />
                            )}
                            <div className='col-12'>
                                {uploadingLogo &&
                                    progress !== 1 &&
                                    progress !== 0 && (
                                        <Progress
                                            animated
                                            color='info'
                                            value={this.state.progress * 100}>
                                            <h6 className='m-0'>
                                                {Math.round(
                                                    this.state.progress * 100,
                                                )}
                                                {"%"}
                                            </h6>
                                        </Progress>
                                    )}
                            </div>
                            <div className='mx-auto mx-sm-2'>
                                <div className='my-1 mt-3'>
                                    <div className='flex-row-center '>
                                        <button className='btn btn-secondary m-2 btn-float'>
                                            <label
                                                htmlFor='logo'
                                                style={{
                                                    display: "inline-block",
                                                    margin: 0,
                                                    cursor: "pointer",
                                                    width: "100%",
                                                }}>
                                                {logo && logo !== ""
                                                    ? "Change Image"
                                                    : "Upload Image"}

                                                <FontAwesomeIcon
                                                    icon={faUpload}
                                                    className='like ml-2'
                                                    title='Like the post'
                                                />
                                            </label>
                                        </button>

                                        <input
                                            type='file'
                                            style={{
                                                // position: "absolute",
                                                zIndex: "-1",
                                                overflow: "hidden",
                                                opacity: 0,
                                                cursor: "pointer",
                                            }}
                                            id='logo'
                                            accept='image/*'
                                            // ref={this.logo}
                                            // disabled={this.state.uploadingLogo}
                                            onChange={uploadLogo}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 px-2 px-md-5 mt-5'>
                        <FormGroup>
                            <Label className='job-title'>
                                <h6>Caption</h6>
                            </Label>
                            <Input
                                type='textarea'
                                name='description'
                                id='description'
                                placeholder=''
                                onChange={handleChange}
                                rows={5}
                                invalid={
                                    data?.description === "" ||
                                    !valid.description
                                }
                            />
                            <FormFeedback>
                                Please enter a valid Caption
                            </FormFeedback>
                        </FormGroup>
                    </div>
                    <FormGroup className='col-12  ml-auto mr-5 px-2 px-md-5'>
                        <Button
                            color='secondary'
                            className='ml-auto float-right'
                            disabled={!context.token}>
                            POST
                        </Button>
                    </FormGroup>
                </div>
            </Form>
        </div>
    );
};
export default CreatePost;
