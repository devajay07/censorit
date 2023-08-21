import React, { useState } from "react";
import axios from "axios";

function Home() {
  const [inpImage, setInpImage] = useState();
  const [spin, setSpin] = useState();
  const [outImage, setOutImage] = useState(false);
  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const selectedImage = event.target.files[0];
      setInpImage(selectedImage);
      document.getElementById("canvas").classList.add("canvas");
    }
  };

  const getSelectedArea = () => {
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");
    let isDrawing = false;
    let startCords = {};
    let markedAreas = [];

    canvas.addEventListener("mousedown", (e) => {
      isDrawing = true;
      startCords = getMouseCords(canvas, e);
    });

    canvas.addEventListener("mousemove", (e) => {
      if (!isDrawing) return;
      const currentCords = getMouseCords(canvas, e);
      drawRectangle(startCords, currentCords);
    });

    canvas.addEventListener("mouseup", () => {
      isDrawing = false;
      markedAreas.push({ start: startCords, end: currentCords });
      console.log("marked areas", markedAreas);
    });

    function getMouseCords(canvas, event) {
      const rect = canvas.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    }

    function drawRectangle(start, end) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
      ctx.fillRect(start.x, start.y, end.x - start.x, end.y - start.y);
    }
  };

  const handleCensorClick = () => {
    if (!inpImage || spin) {
      return;
    }

    setSpin(true);
    const formData = new FormData();
    formData.append("photo", inpImage);

    axios
      .post("http://localhost:3000/blur-photo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "arraybuffer", // Tell Axios to treat the response as an ArrayBuffer
      })
      .then((response) => {
        const blob = new Blob([response.data], { type: "image/jpeg" });
        setOutImage(blob);
        setSpin(false);
      })
      .catch((error) => {
        console.error(error);
        setSpin(false);
      });
  };
  return (
    <div className="home">
      <div className="heading">
        <h3>Uplaod an Image to Start!</h3>
      </div>
      <div className="content">
        <div className="input">
          <input
            type="file"
            name="image"
            style={{ display: "none" }}
            id="file"
            onChange={handleImageChange}
          />
          {!inpImage ? (
            <label htmlFor="file">
              <h4 style={{ cursor: "pointer" }}>Uplaod Image</h4>
            </label>
          ) : (
            <img
              src={URL.createObjectURL(inpImage)}
              alt="uploaded"
              className="inpImage"
            />
          )}
          <canvas id="canvas"></canvas>
        </div>
        <div className="progress">
          {inpImage && spin && !outImage && <div className="spinner"></div>}
          <button className="button" onClick={handleCensorClick}>
            CensorIt
          </button>
        </div>
        <div className="output">
          {!outImage ? (
            <>
              <p>1. click on Upload Image</p>
              <p>2. click on button CensorIt</p>
            </>
          ) : (
            <img
              src={URL.createObjectURL(outImage)}
              alt="uploaded"
              className="outImage"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
