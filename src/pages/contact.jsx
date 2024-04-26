import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { ajax } from "jquery"
import AniLink from "gatsby-plugin-transition-link/AniLink"

const Contact = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulContactPage {
        nodes {
          description {
            raw
          }
          phones {
            raw
          }
          socialLinks {
            link
            name
            id
            icon {
              file {
                url
              }
              title
            }
          }
        }
      }
    }
  `)

  let submitContactForm = e => {
    document.getElementById("spinner").classList.add("d-flex")
    e.preventDefault()
    let data = {
      name: document.getElementById("contactName").value,
      email: document.getElementById("contactEmail").value,
      message: document.getElementById("contactMessage").value,
    }
    const url = "https://softworx-mailer.herokuapp.com/pyramids/contact"
    ajax({
      url,
      type: "post",
      data: data,
      cache: false,
      success: function (respone) {
        console.log(respone)
        document.getElementById("spinner").classList.remove("d-flex")
        alert("Your message was sent successfully.")
      },
      error: function (e) {
        document.getElementById("spinner").classList.remove("d-flex")
        alert("Error:" + e.responseText)
      },
    })
  }

  return (
    <>
      <div className="contact container">
        <h1 className="text-primary mb-5">
          <small> Get in touch!</small>
        </h1>
        <div className="row">
          <div
            className="col-12 col-lg-5 mb-5"
            data-sal="slide-right"
            data-sal-delay="300"
          >
            <form id="contact-form" onSubmit={submitContactForm}>
              <input
                name="name"
                id="contactName"
                className="form-control "
                type="text"
                placeholder="Your Name"
                required
              />
              <input
                name="email"
                id="contactEmail"
                className="form-control my-3"
                type="email"
                placeholder="Your Email"
                required
              />
              <textarea
                name="message"
                id="contactMessage"
                rows="8"
                className="form-control"
                placeholder="Your Message"
                required
              ></textarea>
              <button type="submit" className="">
                SEND
              </button>
            </form>
          </div>
          <div className="col-12 col-lg-5 px-lg-5 mb-5">
            <div data-sal="slide-left" data-sal-delay="300">
              {documentToReactComponents(
                JSON.parse(
                  data.allContentfulContactPage.nodes[0].description.raw
                )
              )}
            </div>
            <AniLink
              swipe
              direction="down"
              to="/"
              className="text-uppercase mb-3"
              data-sal="slide-left"
              data-sal-delay="300"
            >
              see our FAQ
            </AniLink>
            <div className="" data-sal="slide-left" data-sal-delay="300">
              {documentToReactComponents(
                JSON.parse(data.allContentfulContactPage.nodes[0].phones.raw)
              )}
            </div>
            <div className="contact__social-icons">
              {data.allContentfulContactPage.nodes[0].socialLinks.map(
                (link, i) => {
                  return (
                    <a
                      href={link.link}
                      key={link.id}
                      target="_blank"
                      data-sal="slide-left"
                      data-sal-delay={(i + 1) * 300}
                      data-sal-duration="800"
                      rel="noreferrer"
                    >
                      <img src={link.icon.file.url} alt={link.icon.title} />
                    </a>
                  )
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact
