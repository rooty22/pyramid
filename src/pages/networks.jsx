import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import Carousel from "../components/Carousel"
import Modal from "react-bootstrap/Modal"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

const Networks = () => {
  const [modalShow, setModalShow] = React.useState(null)

  const data = useStaticQuery(graphql`
    query {
      contentfulNetworkPage {
        boardMembers {
          id
          title
          image {
            file {
              url
            }
            title
          }
          description {
            raw
          }
        }

        teamSection {
          title
          logo {
            file {
              url
            }
          }
          link {
            text
            url
          }
          description {
            description
          }
        }
      }
    }
  `)

  const boardMembers = data.contentfulNetworkPage.boardMembers
  const teamSection = data.contentfulNetworkPage.teamSection

  return (
    <>
      <div className="container pyramids" id="board">
        <section className="networks__members row">
          <h2 className="text-primary col-12 mb-5">Board Members</h2>
          {boardMembers?.length && (
            <Carousel>
              {boardMembers?.map((member, i) => {
                return (
                  <div
                    key={member.id}
                    className="networks__members__item px-4"
                    data-sal="slide-left"
                    data-sal-delay={(2 * i + 1) * 200}
                  >
                    <div className="networks__members__item__image">
                      <img
                        src={member.image.file.url}
                        alt={member.image.title}
                        className=""
                      />
                    </div>
                    <h5 className="my-3 text-uppercase">{member.title}</h5>
                    <div className="networks__members__item__description text-ellipsis">
                      {documentToReactComponents(
                        JSON.parse(member.description.raw)
                      )}
                    </div>
                    <button
                      className="bg-transparent btn-link"
                      variant="primary"
                      onClick={() => setModalShow(member.id)}
                    >
                      Read More
                    </button>

                    <Modal
                      show={modalShow === member.id}
                      onHide={() => setModalShow(null)}
                      size="lg"
                      aria-labelledby="contained-modal-title-vcenter"
                      centered
                    >
                      <Modal.Body>
                        <div className="w-50  mx-auto">
                          <img
                            src={member.image.file.url}
                            alt={member.image.title}
                            className=""
                          />
                        </div>
                        <p className="my-2 text-uppercase text-center font-weight-bold text-primary">
                          {member.title}
                        </p>
                        <div className="networks__members__item__description">
                          {documentToReactComponents(
                            JSON.parse(member.description.raw)
                          )}
                        </div>
                      </Modal.Body>
                      <Modal.Footer>
                        <button
                          className="btn btn-primary py-1"
                          onClick={() => setModalShow(null)}
                        >
                          Close
                        </button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                )
              })}
            </Carousel>
          )}
        </section>

        <section className="mb-5 pb-5">
          <h2 className="text-primary  mb-3">{teamSection.title}</h2>

          <div>
            <img src={teamSection.logo.file.url} alt="" className="w-auto" />
          </div>

          <p className="team-description my-2">
            {teamSection.description.description}
          </p>

          <a href={teamSection.link.url} className="btn-link h6">
            {teamSection.link.text}
          </a>
        </section>
      </div>
    </>
  )
}

export default Networks
