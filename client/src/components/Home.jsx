import React, { useState } from 'react'

function Home() {
    const [inpImage , setInpImage] = useState();
    const [spin , setSpin] = useState();
    const [outImage , setOutImage] = useState(false);
    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
          const selectedImage = event.target.files[0];
          setInpImage(selectedImage);
        }
      };
      const handleCensorClick = () => {
        if(inpImage)
        setSpin(true); 
      };
  return (
    <div className='home'>
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
          {!inpImage ? <label htmlFor="file">
            <h4  style={{ cursor: 'pointer' }} >Uplaod Image</h4>
          </label>: <img src={URL.createObjectURL(inpImage) }alt="uploaded" className='inpImage'/> }
            </div>
            <div className="progress">
            {( inpImage && spin && !outImage) && <div className="spinner"></div>}
            <button className='button' onClick={handleCensorClick}
                >CensorIt</button>
            </div>
            <div className="output">
                {!outImage ? <><p>1. click on Upload Image</p>
                <p>2. click on button CensorIt</p></> : <img src={URL.createObjectURL(inpImage) }alt="uploaded" className='outImage'/> }
            </div>

        </div>
    </div>
  )
}

export default Home
