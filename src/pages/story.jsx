import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

const Story = () => {
  const data = useStaticQuery(graphql`
    query {
      contentfulOurStoryPage {
        story {
          description {
            raw
          }
          storyPageImage {
            file {
              url
            }
          }
        }

        cards {
          id
          image{
            file{
              url
            }
          }
          title
          description {
            raw
          }
        }
      }
    }
  `).contentfulOurStoryPage

  return (
    <>
      <section
        className="story__hero row mx-0 align-items-center"
        style={{
          backgroundImage: `url(${data.story.storyPageImage.file.url})`,
        }}
      >
        <div className="offset-sm-1 offset-lg-2"></div>
        <div
          className="col-12 col-sm-9 col-lg-6"
          data-sal="slide-left"
          data-sal-delay="200"
          data-sal-duration="1000"
        >
          <div className="story__hero__content ">
            <h1 className="text-secondary font-weight-normal mb-3">
              Our Story
            </h1>
            <div>
              {documentToReactComponents(
                JSON.parse(data.story.description.raw)
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="container story__cards py-5">
        {data.cards?.map((card, i) => {
          let isCardEven = i % 2 === 0
          return (
            <div key={card.id} className="row my-5 py-5 align-items-center">
              <div
                data-sal={isCardEven ? "slide-left" : "slide-right"}
                className={`col-12 col-lg-6 card-img px-4 ${isCardEven ? "order-lg-2" : ""
                  }`}
              >
                <img src={card.image.file.url} alt={card.title} />
              </div>
              <div
                data-sal={isCardEven ? "slide-right" : "slide-left"}
                className={`col-12 col-lg-6 px-4 ${isCardEven ? "order-lg-1" : ""
                  }`}
              >
                <h4 className="text-primary my-3 mt-lg-0">{card.title}</h4>
                <div className="mb-4">
                  {documentToReactComponents(JSON.parse(card.description.raw))}
                </div>
                
              </div>
            </div>
          )
        })}
      </section>
    </>
  )
}

export default Story