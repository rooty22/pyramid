import * as React from "react"
import PropTypes from "prop-types"
import "bootstrap/dist/css/bootstrap.min.css"
import "./../styles/style.scss"
import Header from "./Header"

const Layout = ({ children, pageTitle }) => {

  return (
    <>
      <div className="spinner" id="spinner">
        <div className="spinner__wrapper">
          <span>Sending</span>
          <div>
            <div>
              <div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <main className="">
        <Header />
        {children}
      </main>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  pageTitle: PropTypes.string,
}

export default Layout
