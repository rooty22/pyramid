import * as React from "react"
import { Helmet } from "react-helmet"
import PropTypes from "prop-types"
import { Container, Nav, Navbar } from "react-bootstrap"
import logo from "./../images/logo.png"
import AniLink from "gatsby-plugin-transition-link/AniLink"

const Header = () => {
  const [expanded, setExpanded] = React.useState(false)
  React.useEffect(() => {
    document.onscroll = () => {
      document
        .querySelector("header")
        .classList.toggle("scrolled", window.pageYOffset > 30)
    }
  }, [])

  return (
    <>
      <Helmet>
        <title>138 Pyramids</title>
        <link rel="shortcut icon" href={logo} type="image/x-icon" />
      </Helmet>
      <header>
        <Container>
          <Navbar expand="lg" expanded={expanded}>
            <AniLink swipe direction="down" to="/" className="navbar-brand">
              <img src={logo} alt="logo"></img>
            </AniLink>
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              onClick={() => {
                setExpanded(!expanded)
              }}
            />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <AniLink
                  swipe
                  direction="down"
                  onClick={() => {
                    setExpanded(!expanded)
                  }}
                  to="/"
                  className="navbar-link nav-link"
                  activeClassName="active"
                >
                  Home
                </AniLink>
                <AniLink
                  swipe
                  direction="down"
                  onClick={() => {
                    setExpanded(!expanded)
                  }}
                  to="/story/"
                  className="navbar-link nav-link"
                  activeClassName="active"
                >
                  Our story
                </AniLink>
                <AniLink
                  swipe
                  direction="down"
                  onClick={() => {
                    setExpanded(!expanded)
                  }}
                  to="/pyramids/"
                  className="navbar-link nav-link"
                  activeClassName="active"
                >
                  Our Pyramids
                </AniLink>
                <AniLink
                  swipe
                  direction="down"
                  onClick={() => {
                    setExpanded(!expanded)
                  }}
                  to="/networks/"
                  className="navbar-link nav-link"
                  activeClassName="active"
                >
                  Networks
                </AniLink>
                <AniLink
                  swipe
                  direction="down"
                  onClick={() => {
                    setExpanded(!expanded)
                  }}
                  to="/apply/"
                  className="navbar-link nav-link"
                  activeClassName="active"
                >
                  Apply now
                </AniLink>
                <AniLink
                  swipe
                  direction="down"
                  onClick={() => {
                    setExpanded(!expanded)
                  }}
                  to="/contact/"
                  className="navbar-link nav-link"
                  activeClassName="active"
                >
                  contact
                </AniLink>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Container>
      </header>
    </>
  )
}

Header.propTypes = {
  title: PropTypes.string,
}

Header.defaultProps = {
  title: "",
}

export default Header
