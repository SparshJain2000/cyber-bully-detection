import React, { useEffect, useState } from "react";
// import AsyncSelect from "react-select/async";
// import Select from "react-select";
// import cities from "../assets/cities.min.json";
// import { types } from "../assets/data";
import {
    Form,
    FormGroup,
    Input,
    FormFeedback,
    Label,
    Button,
    Progress,
} from "reactstrap";

const validateField = (field, value) => {
    // console.log(field);
    switch (field) {
        case "location":
            return value !== undefined && value !== null;
        case "type":
            return value !== undefined && value !== null && value !== "";
        case "price":
            return value !== "" && value !== 0;
        case "title":
        case "description":
        case "date":
            return value !== "";
        default:
            return false;
    }
};
const CreatePost = () => {
    const [data, setData] = useState({});
    const [logo, setLogo] = useState("");
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

                // this.setState({
                //     loading: false,
                //     showError2: true,
                //     logoError: "Invalid File Format or Size",
                //     loading: false,
                //     uploadingLogo: false,
                // });
                this.logo.current.value = "";
                return;
            }
            let reader = new FileReader();
            let file = files[0];
            // console.log(URL.createObjectURL(file));
            // setLogo(URL.createObjectURL(file));
            reader.readAsDataURL(file);
            reader.onload = () => {
                console.log(reader.result);
                setLogo(reader.result);
                //     var matches = reader.result.match(
                //         /^data:([A-Za-z-+\/]+);base64,(.+)$/,
                //     );
                //     var buffer = new Buffer(matches[2], "base64");
                //     const image = {
                //         name: `sparsh_${file.name}`,
                //         data: buffer,
                //         mimeType: file.type,
                //         size: file.size,
                //     };
                //     console.log(image);
                // setImg(image);
            };
        }
    };
    // useEffect(() => {
    //     let notDisable = true;
    //     for (const x in valid) notDisable &= valid[x];
    //     notDisable &= data.description !== undefined;
    //     notDisable &= data.title !== undefined;
    //     notDisable &= data.location !== undefined;
    //     notDisable &= data.type !== undefined;
    //     notDisable &= data.price !== undefined;
    //     notDisable &= data.date !== undefined;
    //     setDisable(!notDisable);
    // }, [data, valid]);
    const handleChange = async (e, name) => {
        console.log(e, name);
        if (name === "location") {
            setData({
                ...data,
                [name]: e
                    ? {
                          city: e.value.split(", ")[0],
                          state: e.value.split(", ")[1],
                          country: "",
                      }
                    : null,
            });
            await setValid({
                ...valid,
                [name]: validateField(name, e),
            });
        } else if (name === "type") {
            setData({
                ...data,
                [name]: e ? e.label : null,
            });
            await setValid({
                ...valid,
                [name]: validateField(name, e),
            });
        } else {
            setData({
                ...data,
                [e.target.name]:
                    e.target.name === "price"
                        ? +e.target.value
                        : e.target.value,
            });
            await setValid({
                ...valid,
                [e.target.name]: validateField(e.target.name, e.target.value),
            });
        }
    };

    const submit = async (e) => {
        e.preventDefault();
        console.log(data);
    };
    return (
        <div className='col-11 col-md-10 col-lg-9 job-form mx-auto p-2 p-md-3 my-2 my-md-3'>
            <h2>Create a POST</h2>
            <hr className='col-10 col-md-3 header-line mx-0' />

            <Form onSubmit={submit}>
                <div className='row mx-5'>
                    <div className='col-12 px-5'>
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
                                    <div className=''>
                                        <button className='btn btn-secondary m-2 btn-float'>
                                            <label
                                                htmlFor='logo'
                                                style={{
                                                    display: "inline-block",
                                                    margin: 0,
                                                    cursor: "pointer",
                                                    width: "100%",
                                                }}>
                                                Upload Logo
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
                    <div className='col-12 px-5 '>
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
                                Please enter a valid Description
                            </FormFeedback>
                        </FormGroup>
                    </div>
                    <FormGroup className='col-12  ml-auto mr-5 px-5'>
                        <Button
                            color='secondary'
                            className='ml-auto float-right'
                            disabled={disable}>
                            Create
                        </Button>
                    </FormGroup>
                </div>
            </Form>
        </div>
    );
};
export default CreatePost;
