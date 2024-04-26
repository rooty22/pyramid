import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Carousel from "../components/Carousel"

const Pyramids = () => {
  const data = useStaticQuery(graphql`
    query {
      contentfulPyramidsPage {
        categories {
          id
          categoryName
          cards {
            id
            name
            image {
              file {
                url
              }
              title
            }
            description {
              raw
            }
            websiteLink
            facebookLink
            instagramLink
          }
        }
        websiteIcon {
          file {
            url
          }
        }
        instagramIcon {
          file {
            url
          }
        }
        facebookIcon {
          file {
            url
          }
        }
      }
    }
  `)

  return (
    <>
      <div className="container pyramids" id="board">
        {data.contentfulPyramidsPage.categories.map(category => {
          return (
            <section key={category.id} className="pyramids__members row">
              <h2 className="text-primary col-12 mb-5">
                {category.categoryName}
              </h2>
              <div className="col-12">
                <Carousel>
                  {category.cards.map((catItem, i) => {
                    return (
                      <div
                        key={catItem.id}
                        className="pyramids__members__item px-4"
                        data-sal="slide-left"
                        data-sal-delay={(2 * i + 1) * 200}
                      >
                        <div className="pyramids__members__item__image">
                          <div className="overlay">
                            {catItem.websiteLink && (
                              <a
                                href={catItem.websiteLink}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <img
                                  src={
                                    data.contentfulPyramidsPage.websiteIcon.file
                                      .url
                                  }
                                  alt="website icon"
                                />
                              </a>
                            )}

                            {catItem.facebookLink && (
                              <a
                                href={catItem.facebookLink}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <img
                                  src={
                                    data.contentfulPyramidsPage.facebookIcon
                                      .file.url
                                  }
                                  alt="facebook icon"
                                />
                              </a>
                            )}

                            {catItem.instagramLink && (
                              <a
                                href={catItem.instagramLink}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <img
                                  src={
                                    data.contentfulPyramidsPage.instagramIcon
                                      .file.url
                                  }
                                  alt="instagram icon"
                                />
                              </a>
                            )}
                          </div>
                          <img
                            src={catItem.image.file.url}
                            alt={catItem.image.title}
                            className=""
                          />
                        </div>
                        <h5 className="my-3 text-uppercase">{catItem.name}</h5>
                        <div className="pyramids__members__item__description text-ellipsis">
                          {documentToReactComponents(
                            JSON.parse(catItem.description.raw)
                          )}
                        </div>
                      </div>
                    )
                  })}
                </Carousel>
              </div>
            </section>
          )
        })}
      </div>
    </>
  )
}

export default Pyramids
