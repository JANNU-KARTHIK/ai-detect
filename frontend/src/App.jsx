import { useState } from "react"

import { motion } from "framer-motion"

import {
  FiUpload,
  FiShield
} from "react-icons/fi"

import bgImage from "./assets/bg.jpg"

function App() {

  const [selectedFile, setSelectedFile] = useState(null)

  const [preview, setPreview] = useState(null)

  const [loading, setLoading] = useState(false)

  const [result, setResult] = useState(null)

  // =========================================
  // FILE CHANGE
  // =========================================

  const handleFileChange = (e) => {

    const file = e.target.files[0]

    if(file){

      setSelectedFile(file)

      setPreview(URL.createObjectURL(file))

      setResult(null)
    }
  }

  // =========================================
  // SCAN
  // =========================================

  const handleScan = async () => {

    if(!selectedFile) return

    setLoading(true)

    const formData = new FormData()

    formData.append("file", selectedFile)

    try{

      const response = await fetch(
        "/scan",
        {
          method:"POST",
          body:formData
        }
      )

      const data = await response.json()

      setResult(data)

    }catch(error){

      console.log(error)

      alert("Backend Error")
    }

    setLoading(false)
  }

  return (

    <div className="app">

      {/* ========================================= */}
      {/* BACKGROUND */}
      {/* ========================================= */}

      <div
        className="bg-image"
        style={{
          backgroundImage:`url(${bgImage})`
        }}
      ></div>

      <div className="overlay"></div>

      {/* ========================================= */}
      {/* CONTENT */}
      {/* ========================================= */}

      <div className="content">

        {/* BADGE */}

        <motion.div

          initial={{opacity:0,y:20}}

          animate={{opacity:1,y:0}}

          className="badge"
        >

          <FiShield />

          AI Media Detection Platform

        </motion.div>

        {/* TITLE */}

        <motion.h1

          initial={{opacity:0,y:20}}

          animate={{opacity:1,y:0}}

          transition={{delay:0.2}}

          className="title"
        >

          AI Detect

        </motion.h1>

        {/* SUBTITLE */}

        <motion.p

          initial={{opacity:0,y:20}}

          animate={{opacity:1,y:0}}

          transition={{delay:0.4}}

          className="subtitle"
        >

          Advanced forensic intelligence system
          for detecting AI-generated images,
          deepfakes, and synthetic videos.

        </motion.p>

        {/* ========================================= */}
        {/* UPLOAD CARD */}
        {/* ========================================= */}

        <motion.div

          initial={{opacity:0,y:30}}

          animate={{opacity:1,y:0}}

          transition={{delay:0.6}}

          className="upload-card"
        >

          {/* ICON */}

          <div className="upload-icon">

            <FiUpload size={34}/>

          </div>

          {/* TITLE */}

          <h2 className="upload-title">

            Upload Media

          </h2>

          {/* SUBTITLE */}

          <p className="upload-subtitle">

            Analyze images and videos instantly

          </p>

          {/* INPUT */}

          <input
            type="file"
            id="upload"
            hidden
            onChange={handleFileChange}
          />

          {/* BUTTON */}
          <center>
          <label
            htmlFor="upload"
            className="upload-btn"
          >

            Choose File

          </label></center>

          {/* PREVIEW */}

          {
            preview && (

              <motion.div

                initial={{opacity:0}}

                animate={{opacity:1}}

                className="preview-wrapper"
              >

                {
                  selectedFile.type.startsWith("image")

                  ? (

                    <img
                      src={preview}
                      alt="preview"
                      className="preview-media"
                    />

                  )

                  : (

                    <video
                      controls
                      className="preview-media"
                    >

                      <source
                        src={preview}
                        type={selectedFile.type}
                      />

                    </video>

                  )
                }

                {/* SCAN BUTTON */}
                <center>
                <button
                  onClick={handleScan}
                  className="scan-btn"
                >

                  {
                    loading
                    ? "Analyzing..."
                    : "Scan Media"
                  }

                </button></center>

              </motion.div>
            )
          }

        </motion.div>

        {/* ========================================= */}
        {/* RESULT */}
        {/* ========================================= */}

        {
          result && (

            <motion.div

              initial={{opacity:0,y:30}}

              animate={{opacity:1,y:0}}

              className="result-card"
            >

              <h2 className="result-title">

                Detection Result

              </h2>

              {/* GRID */}

              <div className="result-grid">

                {/* VERDICT */}

                <div className="result-box">

                  <p className="result-label">

                    Verdict

                  </p>

                  <h3 className="result-value">

                    {result.verdict}

                  </h3>

                </div>

                {/* AI SCORE */}

                <div className="result-box">

                  <p className="result-label">

                    AI Score

                  </p>

                  <h3 className="result-value">

                    {result.ai_probability}%

                  </h3>

                </div>

                {/* AUTHENTICITY */}

                <div className="result-box">

                  <p className="result-label">

                    Authenticity

                  </p>

                  <h3 className="result-value">

                    {result.authenticity}%

                  </h3>

                </div>

                {/* CONFIDENCE */}

                <div className="result-box">

                  <p className="result-label">

                    Confidence

                  </p>

                  <h3 className="result-value">

                    {result.confidence}%

                  </h3>

                </div>

              </div>

              {/* ANALYSIS */}

              <div className="analysis-box">

                <h3 className="analysis-title">

                  Analysis

                </h3>

                <p className="analysis-text">

                  {result.analysis}

                </p>

              </div>

            </motion.div>
          )
        }

      </div>

    </div>
  )
}

export default App