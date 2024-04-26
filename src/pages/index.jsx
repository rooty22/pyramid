import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import AniLink from "gatsby-plugin-transition-link/AniLink"

const Index = () => {
  const data = useStaticQuery(graphql`
    query {
      contentfulOurStory {
        description {
          raw
        }
        homePageImage {
          file {
            url
          }
        }
      }
      allContentfulHomePage {
        nodes {
          heroImage {
            title
            file {
              url
            }
          }
          offerings {
            id
            title
            description {
              description
            }
            icon {
              file {
                url
              }
              id
            }
          }
          footer {
            footer
          }
        }
      }
    }
  `)
  const offerings = data.allContentfulHomePage.nodes[0].offerings

  return (
    <>
      <section className="home__hero text-center">
        <h6
          className="text-uppercase text-secondary"
          data-sal="slide-up"
          data-sal-delay="300"
          data-sal-reset={true}
        >
          early-stage, long-term investors
        </h6>
        <h1 className="text-primary  d-flex flex-column">
          <span data-sal="slide-up" data-sal-delay="450">
            We invest in people
          </span>
          <span data-sal="slide-up" data-sal-delay="600">
            {" "}
            who change the way
          </span>
          <span data-sal="slide-up" data-sal-delay="750">
            {" "}
            the world works.
          </span>
        </h1>
      </section>
      <section
        data-sal="slide-up"
        data-sal-delay="900"
        data-sal-duration="800"
        className="home__hero-image mt-3"
      >
        <img
          src={data.allContentfulHomePage.nodes[0].heroImage.file.url}
          alt=""
        />
      </section>
      <section
        className="home__story d-flex align-items-center my-5"
        style={{
          backgroundImage: `url(${data.contentfulOurStory.homePageImage.file.url})`,
        }}
        data-sal="slide-left"
        data-sal-delay="100"
        data-sal-duration="800"
      >
        <div className="offset-lg-1 "></div>
        <div
          className=""
          data-sal="slide-left"
          data-sal-delay="800"
          data-sal-duration="800"
        >
          <div className="home__story__content">
            <AniLink
              swipe
              direction="down"
              to="story"
              className="text-secondary font-weight-normal mb-3"
              data-sal="slide-up"
              data-sal-duration="1000"
            >
              <h2>Our Story</h2>
            </AniLink>
            <div>
              {documentToReactComponents(
                JSON.parse(data.contentfulOurStory.description.raw)
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="container home__offerings mt-4">
        <h2 className="text-primary mb-4">Our Offerings</h2>
        <div className="row justify-content-around align-items-center">
          <div
            className="col-6 col-sm-5 col-lg-4 home__offerings__item"
            data-sal="slide-left"
            data-sal-delay="100"
          >
            <div className="home__offerings__item__img">
              <img
                src={offerings[0].icon.file.url}
                alt={offerings[0].icon.title}
              />
            </div>
            <h5 className="text-primary font-weight-normal my-2">
              {offerings[0].title}
            </h5>
            <p>{offerings[0].description.description}</p>
          </div>
          <div
            className="col-6 col-sm-5 col-lg-4 home__offerings__item"
            data-sal="slide-left"
            data-sal-delay="200"
          >
            <div className="home__offerings__item__img">
              <img
                src={offerings[1].icon.file.url}
                alt={offerings[1].icon.title}
              />
            </div>
            <h5 className="text-primary font-weight-normal my-2">
              {offerings[1].title}
            </h5>
            <p>{offerings[1].description.description}</p>
          </div>
          <div className="offset-sm-1 offset-lg-2"></div>
        </div>

        <div className="row justify-content-around">
          <div className="offset-sm-1"></div>
          <div
            className="col-6 col-sm-5 col-lg-4 home__offerings__item"
            data-sal="slide-left"
            data-sal-delay="400"
          >
            <div className="home__offerings__item__img">
              <img
                src={offerings[2].icon.file.url}
                alt={offerings[2].icon.title}
              />
            </div>
            <h5 className="text-primary font-weight-normal my-2">
              {offerings[2].title}
            </h5>
            <p>{offerings[2].description.description}</p>
          </div>
          <div
            className="col-6 col-sm-5 col-lg-4 home__offerings__item"
            data-sal="slide-left"
            data-sal-delay="600"
          >
            <div className="home__offerings__item__img">
              <img
                src={offerings[3].icon.file.url}
                alt={offerings[3].icon.title}
              />
            </div>
            <h5 className="text-primary font-weight-normal my-2">
              {offerings[3].title}
            </h5>
            <p>{offerings[3].description.description}</p>
          </div>
        </div>
      </section>

      <section className="home__apply ">
        <div
          className="home__apply__wrapper d-flex flex-column justify-content-center align-items-center"
          data-sal="slide-left"
        >
          <h2
            className="text-center"
            data-sal="slide-up"
            data-sal-duration="1500"
          >
            <pre className="text-primary">
              {data.allContentfulHomePage.nodes[0].footer.footer}
            </pre>
          </h2>
          <AniLink
            swipe
            direction="down"
            to="apply"
            className="mt-5"
            data-sal="slide-up"
            data-sal-duration="1000"
          >
            Apply here
          </AniLink>
        </div>
      </section>
    </>
  )
}

export default Index
