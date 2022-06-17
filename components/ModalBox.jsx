import {
  blurImageApi,
  contrastImageApi,
  denoiseImageApi,
  grayImageApi,
  negativeImageApi,
  resetImageApi,
  sepiaImageApi,
  sharpenImageApi
} from "api";
import { EditSolidIcon, SpinnerSolidIcon } from "assets/icons";
import React, { memo, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const ModalBox = ({ originImg, apply }) => {
  // IMAGE PROCESSING
  const [state, setState] = useState({
    editedImg: null,
    isLoading: false
  });

  let urlRegex = /(https?:\/\/[^\s]+)/;

  const urlToFileObject = url => {
    const file = new File(
      [ArrayBuffer],
      url?.split("/")?.at(-1)?.split("?")[0],
      { type: "image/jpeg" }
    );
    return file;
    // setState({ editedImg: file });
  };

  urlToFileObject();

  const labelRef = useRef(null);

  const sharpenImage = e => {
    e.preventDefault();
    setState({ isLoading: true });
    const formData = new FormData();
    formData.append(
      "image",
      //   urlRegex.test(state.editedImg)
      //     ? urlToFileObject(state.editedImg)
      //     : state.editedImg
      originImg
    );

    console.log("sharpen image");

    sharpenImageApi(formData)
      .then(res => {
        setState({
          editedImg: res.data.image,
          isLoading: false
        });
        console.log(res);
      })
      .catch(err => console.log("image error ", err));
  };
  const blurImage = e => {
    e.preventDefault();
    setState({ isLoading: true });
    const formData = new FormData();
    formData.append("image", originImg);

    console.log("blur image");

    blurImageApi(formData)
      .then(res => {
        setState({
          editedImg: res.data.image,
          isLoading: false
        });
        console.log(res);
      })
      .catch(err => console.log("image error ", err));
  };
  const negativeImage = e => {
    e.preventDefault();
    setState({ isLoading: true });
    const formData = new FormData();
    formData.append("image", originImg);

    console.log("negative image");

    negativeImageApi(formData)
      .then(res => {
        setState({
          editedImg: res.data.image,
          isLoading: false
        });
        console.log(res);
      })
      .catch(err => console.log("image error ", err));
  };
  const sepiaImage = e => {
    e.preventDefault();
    setState({ isLoading: true });
    const formData = new FormData();
    formData.append("image", originImg);

    console.log("negative image");

    sepiaImageApi(formData)
      .then(res => {
        setState({
          editedImg: res.data.image,
          isLoading: false
        });
        console.log(res);
      })
      .catch(err => console.log("image error ", err));
  };
  const contrastImage = e => {
    e.preventDefault();
    setState({ isLoading: true });
    const formData = new FormData();
    formData.append("image", originImg);

    console.log("negative image");

    contrastImageApi(formData)
      .then(res => {
        setState({
          editedImg: res.data.image,
          isLoading: false
        });
        console.log(res);
      })
      .catch(err => console.log("image error ", err));
  };
  const grayImage = e => {
    e.preventDefault();
    setState({ isLoading: true });
    const formData = new FormData();
    formData.append("image", originImg);

    console.log("negative image");

    grayImageApi(formData)
      .then(res => {
        setState({
          editedImg: res.data.image,
          isLoading: false
        });
        console.log(res);
      })
      .catch(err => console.log("image error ", err));
  };
  const denoiseImage = e => {
    e.preventDefault();
    setState({ isLoading: true });
    const formData = new FormData();
    formData.append("image", originImg);

    console.log("negative image");

    denoiseImageApi(formData)
      .then(res => {
        setState({
          editedImg: res.data.image,
          isLoading: false
        });
        console.log(res);
      })
      .catch(err => console.log("image error ", err));
  };
  const resetImage = e => {
    e.preventDefault();
    setState({ isLoading: true });
    const formData = new FormData();
    formData.append("image", originImg);

    console.log("reset image");
    console.log("reset data: ", formData.get("image"));

    resetImageApi(formData)
      .then(res => {
        setState({
          editedImg: res.data.image,
          isLoading: false
        });
        console.log(res);
      })
      .catch(err => console.log("image error ", err));
  };

  const applyChanges = () => {
    // if (state.editedImg) {
    apply(state.editedImg);
    // }
  };

  console.log("edited ", state.editedImg);
  console.log("origin ", originImg);
  console.log(state.isLoading);

  console.log("modalbox rerender");

  return (
    <>
      <input type="checkbox" id="editImg-modal" className="modal-toggle" />
      <label
        for="editImg-modal"
        className="modal cursor-pointer scrollbar bg-red-100">
        <div
          style={{
            backgroundColor: "#2d2d2d",
            borderRadius: 10,
            padding: 20
          }}>
          <div style={{ width: 1050 }}>
            <h5 className="font-bold text-2xl mb-3">Edit image</h5>
            <div className="flex flex-row justify-between">
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col items-center">
                  <img
                    src={URL.createObjectURL(originImg)}
                    alt="original"
                    style={{
                      width: 450,
                      height: 450,
                      borderRadius: 10,
                      objectFit: "contain",
                      position: "relative",
                      marginRight: 15
                    }}
                  />
                  <p className="text-3xl font-bold mt-3">Before</p>
                </div>
                {state.isLoading ? (
                  <div className="flex justify-center items-center">
                    <FontAwesomeIcon
                      icon={faSpinner}
                      size="10x"
                      className="fa-spinner"
                    />
                  </div>
                ) : state.editedImg ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={state.editedImg}
                      alt="edited"
                      style={{
                        width: 450,
                        height: 450,
                        borderRadius: 10,
                        objectFit: "contain",
                        position: "relative",
                        marginRight: 15
                      }}
                    />
                    <p className="text-3xl font-bold mt-3">After</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <img
                      src={
                        urlRegex.test(originImg)
                          ? originImg
                          : URL.createObjectURL(originImg)
                      }
                      alt="original"
                      style={{
                        width: 450,
                        height: 450,
                        borderRadius: 10,
                        objectFit: "contain",
                        position: "relative",
                        marginRight: 15
                      }}
                    />
                    <p className="text-3xl font-bold mt-3">After</p>
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-between">
                <div
                  className="flex flex-col justify-between"
                  style={{ height: "80%" }}>
                  <button
                    className="btn btn-info"
                    name="sharpen"
                    onClick={sharpenImage}>
                    Sharpened
                  </button>
                  <button
                    className="btn btn-info"
                    name="blur"
                    onClick={blurImage}>
                    Blur
                  </button>
                  <button
                    className="btn btn-info"
                    name="negative"
                    onClick={negativeImage}>
                    Negative
                  </button>
                  <button
                    className="btn btn-info"
                    name="negative"
                    onClick={sepiaImage}>
                    Sepia
                  </button>
                  <button
                    className="btn btn-info"
                    name="negative"
                    onClick={contrastImage}>
                    Contrast
                  </button>
                  <button
                    className="btn btn-info"
                    name="negative"
                    onClick={grayImage}>
                    Gray
                  </button>
                  <button
                    className="btn btn-info"
                    name="negative"
                    onClick={denoiseImage}>
                    Denoise
                  </button>
                </div>
                <div
                  className="flex flex-col justify-between"
                  style={{ height: "15%" }}>
                  <button
                    className="btn"
                    name="reset"
                    onClick={resetImage}
                    style={{ backgroundColor: "red" }}>
                    Reset
                  </button>
                  {/* <button className="btn btn-info" onClick={applyChanges}>
                    Apply
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </label>
    </>
  );
};

export default ModalBox;
