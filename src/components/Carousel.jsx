import React, { useEffect, useState } from "react"
import "./../styles/carousel.scss"
import leftArrow from "./../images/left-arrow.svg"
import rightArrow from "./../images/right-arrow.svg"

const Carousel = props => {
  const { children } = props
  const [currentIndex, setCurrentIndex] = useState(0)
  const [length, setLength] = useState(children.length)
  const [show, setShow] = useState(1)

  // Set the length to match current children from props
  useEffect(() => {
    setLength(children.length)
  }, [children])

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShow(window.innerWidth > 767.98 ? 3 : 1)
    }
  }, [])

  const next = () => {
    if (currentIndex < length - 1) {
      setCurrentIndex(prevState => prevState + 1)
    }
  }

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevState => prevState - 1)
    }
  }

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        {currentIndex > 0 && (
          <button className="left-arrow" onClick={prev}>
            <img src={leftArrow} alt="arrow icon" className="arrow" />
          </button>
        )}
        <div className="carousel-content-wrapper">
          <div
            className={`carousel-content show-${show}`}
            style={{
              transform: `translateX(-${currentIndex * (100 / show)}%)`,
            }}
          >
            {children}
          </div>
        </div>

        {currentIndex < length - show && (
          <button className="right-arrow" onClick={next}>
            <img src={rightArrow} alt="arrow icon" className="arrow" />
          </button>
        )}
      </div>
    </div>
  )
}

export default Carousel
