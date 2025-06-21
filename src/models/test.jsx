import { graphql, useStaticQuery } from "gatsby"
import React, { useState } from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Carousel from "../components/Carousel"

const Pyramids = () => {
  const [selectedCard, setSelectedCard] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCardIndex, setSelectedCardIndex] = useState(null)

  // Additional content for first card only
  const additionalContent = {
    title: "Details More",
    content: `
      
      In October 2015, 138 Pyramids partnered with a 10% ownership in InterModa. At that time, Intermoda was primarily a family business, established in 1971.
      The official company name and brand name: Intermoda Ready-Made Garments – Egyptian Joint Stock Company / Intermoda Group – Brand name: Dockland
      Nature of activity: Trading and distribution of all types of ready-made garments, fabrics, textiles, accessories, footwear, and leather products – general supplies – import, export, and commercial agencies.
      Legal form of company: Egyptian joint-stock company subject to the provisions of Law No. 159 of 1981
      Manager in charge: Ismail Seif El Nasr – Chairman of the Board of Directors.
      The Exit transaction took place on the 18th of March 2024, as a management buyout transaction, where Mr. Ismail Seif El Nasr bought all the shares of 138 Pyramids at almost four times the initial investment.



      في أكتوبر 2015،  قامت شركة 138 براميدز لإدارة المشروعات  بشراء نسبة 10% من اسهم شركة انترمودا و كانت وقتئذ شركة عائلية بالدرجة الأولى تم تأسيسها في عام 1971.
      اسم الشركة الرسمي واسم العلامة التجارية: انترمودا للملابس الجاهزة – شركة مساهمة مصرية / Intermoda Group – والعلامة التجارية Dockland
      طبيعة النشاط: تجارة وتوزيع كافة الملابس الجاهزة والأقمشة والمنسوجات ومستلزمتها وإكسسواراتها والاحذية والمنتجات الجلدية بكافة أنواعها – التوريدات العمومية – الاستيراد والتصدير والتوكيلات التجارية. 
      الشكل القانوني للشركة: شركة مساهمة مصرية خاضعة لأحكام القانون رقم 159 لسنة 1981 م 
      المدير المسؤول عن الشركة: إسماعيل سيف النصر – رئيس مجلس الإدارة.

      هذا وقد تم التخارج بتاريخ 18 مارس 2024، بشراء السيد / إسماعيل سيف النصر لكامل أسهم شركة 138 براميدز لإدارة المشروعات بحوالي أربع أضعاف مبلغ الاستثمار.
      
    `,
  }

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

  const openModal = (card, cardIndex) => {
    setSelectedCard(card)
    setSelectedCardIndex(cardIndex)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedCard(null)
    setSelectedCardIndex(null)
  }

  // Function to truncate text content
  const truncateContent = (rawContent, maxLength = 100) => {
    const parsedContent = JSON.parse(rawContent)

    // Extract text from rich text content
    const extractText = node => {
      if (typeof node === "string") return node
      if (node.nodeType === "text") return node.value
      if (node.content) {
        return node.content.map(extractText).join("")
      }
      return ""
    }

    const fullText = parsedContent.content.map(extractText).join(" ")

    if (fullText.length <= maxLength) return fullText

    return fullText.substring(0, maxLength) + "..."
  }

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
                {/* <Carousel>
                  {category.cards.map((catItem, i) => {
                    // Calculate global card index across all categories
                    const globalCardIndex = data.contentfulPyramidsPage.categories
                      .slice(0, data.contentfulPyramidsPage.categories.indexOf(category))
                      .reduce((acc, cat) => acc + cat.cards.length, 0) + i
                    
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
                        <h5 className="my-3 text-uppercase">
                          <span 
                            style={{ cursor: 'pointer', textDecoration: 'underline' }}
                            onClick={() => openModal(catItem, globalCardIndex)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                openModal(catItem, globalCardIndex)
                              }
                            }}
                          >
                            {catItem.name}
                          </span>
                        </h5>
                        <div className="pyramids__members__item__description text-ellipsis">
                          <p>{truncateContent(catItem.description.raw, 120)}</p>
                          {JSON.parse(catItem.description.raw).content.map(node => 
                            node.content?.map(textNode => textNode.value).join('')
                          ).join(' ').length > 120 && (
                            <span 
                              className="text-primary d-none"
                              style={{ cursor: 'pointer', textDecoration: 'underline' }}
                              onClick={() => openModal(catItem, globalCardIndex)}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  openModal(catItem, globalCardIndex)
                                }
                              }}
                            >
                              اقرأ المزيد
                            </span>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </Carousel> */}

                <Carousel>
                  {category.cards
                    .filter((catItem, i) => {
                      // Calculate global card index across all categories
                      const globalCardIndex =
                        data.contentfulPyramidsPage.categories
                          .slice(
                            0,
                            data.contentfulPyramidsPage.categories.indexOf(
                              category
                            )
                          )
                          .reduce((acc, cat) => acc + cat.cards.length, 0) + i

                      // Hide card number 2 (index 1 since we start from 0)
                      return globalCardIndex !== 2
                    })
                    .map((catItem, i) => {
                      // Calculate global card index for remaining cards
                      const originalIndex = category.cards.indexOf(catItem)
                      const globalCardIndex =
                        data.contentfulPyramidsPage.categories
                          .slice(
                            0,
                            data.contentfulPyramidsPage.categories.indexOf(
                              category
                            )
                          )
                          .reduce((acc, cat) => acc + cat.cards.length, 0) +
                        originalIndex

                      return (
                        <div
                          key={catItem.id}
                          className="pyramids__members__item px-4"
                          data-sal="slide-left"
                          data-sal-delay={(2 * i + 1) * 200}
                        >
                          {/* باقي محتوى الكارد يبقى كما هو */}
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
                                      data.contentfulPyramidsPage.websiteIcon
                                        .file.url
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
                          <h5 className="my-3 text-uppercase">
                            <span
                              style={{
                                cursor: "pointer",
                                textDecoration: "underline",
                              }}
                              onClick={() =>
                                openModal(catItem, globalCardIndex)
                              }
                              role="button"
                              tabIndex={0}
                              onKeyDown={e => {
                                if (e.key === "Enter" || e.key === " ") {
                                  openModal(catItem, globalCardIndex)
                                }
                              }}
                            >
                              {catItem.name}
                            </span>
                          </h5>
                          <div className="pyramids__members__item__description text-ellipsis">
                            <p>
                              {truncateContent(catItem.description.raw, 120)}
                            </p>
                            {JSON.parse(catItem.description.raw)
                              .content.map(node =>
                                node.content
                                  ?.map(textNode => textNode.value)
                                  .join("")
                              )
                              .join(" ").length > 120 && (
                              <span
                                className="text-primary d-none"
                                style={{
                                  cursor: "pointer",
                                  textDecoration: "underline",
                                }}
                                onClick={() =>
                                  openModal(catItem, globalCardIndex)
                                }
                                role="button"
                                tabIndex={0}
                                onKeyDown={e => {
                                  if (e.key === "Enter" || e.key === " ") {
                                    openModal(catItem, globalCardIndex)
                                  }
                                }}
                              >
                                اقرأ المزيد
                              </span>
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

      {/* Modal */}
      {isModalOpen && selectedCard && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          role="dialog"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          tabIndex={-1}
        >
          {/* Background overlay - clickable area */}
          <button
            className="modal-backdrop"
            onClick={closeModal}
            onKeyDown={e => {
              if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                closeModal()
              }
            }}
            aria-label="إغلاق النافذة"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "transparent",
              border: "none",
              cursor: "default",
            }}
          />

          <div
            className="modal-dialog modal-lg"
            style={{ position: "relative", zIndex: 1 }}
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h4 id="modal-title" className="modal-title text-primary">
                  {selectedCard.name}
                </h4>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                  aria-label="إغلاق"
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "1.5rem",
                    cursor: "pointer",
                    padding: "0.5rem",
                  }}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body" id="modal-description">
                <div className="row">
                  <div className="col-md-4">
                    <img
                      src={selectedCard.image.file.url}
                      alt={selectedCard.image.title}
                      className="img-fluid rounded"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="content">
                      <h5 className="text-secondary mb-3">More Details</h5>
                      {documentToReactComponents(
                        JSON.parse(selectedCard.description.raw)
                      )}

                      {/* Additional content for first card only */}
                      {selectedCardIndex === 1 && (
                        <div
                          className="additional-content mt-4 p-3"
                          style={{
                            backgroundColor: "#f8f9fa",
                            borderRadius: "8px",
                          }}
                        >
                          <h6 className="text-primary mb-3">
                            {additionalContent.title}
                          </h6>
                          <div
                            style={{
                              whiteSpace: "pre-line",
                              lineHeight: "1.6",
                            }}
                          >
                            {additionalContent.content}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Social Links */}
                    <div className="social-links mt-4">
                      {selectedCard.websiteLink && (
                        <a
                          href={selectedCard.websiteLink}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-outline-primary me-2"
                        >
                          <img
                            src={
                              data.contentfulPyramidsPage.websiteIcon.file.url
                            }
                            alt="website"
                            style={{
                              width: "20px",
                              height: "20px",
                              marginRight: "8px",
                            }}
                          />
                          Website
                        </a>
                      )}

                      {selectedCard.facebookLink && (
                        <a
                          href={selectedCard.facebookLink}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-outline-primary me-2"
                        >
                          <img
                            src={
                              data.contentfulPyramidsPage.facebookIcon.file.url
                            }
                            alt="facebook"
                            style={{
                              width: "20px",
                              height: "20px",
                              marginRight: "8px",
                            }}
                          />
                          Facebook
                        </a>
                      )}

                      {selectedCard.instagramLink && (
                        <a
                          href={selectedCard.instagramLink}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-outline-primary me-2"
                        >
                          <img
                            src={
                              data.contentfulPyramidsPage.instagramIcon.file.url
                            }
                            alt="instagram"
                            style={{
                              width: "20px",
                              height: "20px",
                              marginRight: "8px",
                            }}
                          />
                          Instagram
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Pyramids
