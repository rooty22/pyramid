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

  // Static content for card index 2 (global index 2)
  const staticContentForCard2 = {
    description:
      "In October 2015, 138 Pyramids partnered with a 10% ownership in InterModa. At that time, Intermoda was primarily a family business, established in 1971.",
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
    // منع الـ scroll في الـ body لما الـ modal تكون مفتوحة
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedCard(null)
    setSelectedCardIndex(null)
    // إرجاع الـ scroll للـ body
    document.body.style.overflow = "unset"
  }

  // Function to extract preview text from rich content
  const getPreviewText = (rawContent, maxLines = 2) => {
    try {
      const parsedContent = JSON.parse(rawContent)

      // استخدام المحتوى الثابت للكارد رقم 2 (global index 2)
      if (selectedCardIndex === 2) {
        return staticContentForCard2.description
      }

      // Extract text from rich text content
      const extractText = node => {
        if (typeof node === "string") return node
        if (node.nodeType === "text") return node.value
        if (node.content) {
          return node.content.map(extractText).join("")
        }
        return ""
      }

      const fullText = parsedContent.content.map(extractText).join(" ").trim()

      // تقسيم النص إلى كلمات وأخذ أول كلمات معينة لعمل سطرين
      const words = fullText.split(" ")
      const wordsPerLine = 8 // تقريباً 8 كلمات في السطر
      const maxWords = wordsPerLine * maxLines

      if (words.length <= maxWords) {
        return fullText
      }

      return words.slice(0, maxWords).join(" ") + "..."
    } catch (error) {
      return ""
    }
  }

  // const getModalPreviewText = (rawContent, globalCardIndex, maxLines = 2) => {
  //   // استخدام المحتوى الثابت للكارد رقم 2 (global index 2)
  //   if (globalCardIndex === 2) {
  //     return staticContentForCard2.description
  //   }

  //   try {
  //     const parsedContent = JSON.parse(rawContent)

  //     // Extract text from rich text content
  //     const extractText = node => {
  //       if (typeof node === "string") return node
  //       if (node.nodeType === "text") return node.value
  //       if (node.content) {
  //         return node.content.map(extractText).join("")
  //       }
  //       return ""
  //     }

  //     // استخراج النص الكامل من الـ More Details
  //     const fullText = parsedContent.content.map(extractText).join(" ").trim()

  //     // تقسيم النص إلى جمل
  //     const sentences = fullText
  //       .split(/[.!?]+/)
  //       .filter(sentence => sentence.trim().length > 0)

  //     // اخذ أول جملتين أو حسب المطلوب
  //     if (sentences.length <= maxLines) {
  //       return sentences.join(". ").trim() + (sentences.length > 0 ? "." : "")
  //     }

  //     return sentences.slice(0, maxLines).join(". ").trim() + "..."
  //   } catch (error) {
  //     return ""
  //   }
  // }

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
                          {/* استبدال الـ description بـ preview text */}
                          <div className="pyramids__members__item__description">
                            <p
                              style={{
                                fontSize: "14px",
                                lineHeight: "1.4",
                                margin: "0",
                                color: "#6c757d",
                              }}
                            >
                              {
                              globalCardIndex === 1
                                ? additionalContent.content.split("\n").filter(line => line.trim() !== "").slice(0, 1).join(" ") + "..."
                                : getPreviewText(catItem.description.raw, 2)}
                              {/* {getModalPreviewText(catItem.description.raw, globalCardIndex, 2)} */}
                            </p>
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
          style={{
            display: "block",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1050,
            marginTop: "50px",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            overflowY: "auto",
          }}
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
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "transparent",
              border: "none",
              cursor: "default",
              zIndex: 1,
            }}
          />

          <div
            className="modal-dialog modal-xl"
            style={{
              position: "relative",
              zIndex: 2,
              maxWidth: "90%",
              margin: "2rem auto",
              width: "100%",
              // Responsive for mobile
              ...(window.innerWidth <= 576
                ? {
                    maxWidth: "100vw",
                    margin: "0",
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                  }
                : {}),
            }}
            role="document"
          >
            <div
              className="modal-content"
              style={{
                maxHeight: "90vh",
                display: "flex",
                flexDirection: "column",
                // Responsive for mobile
                ...(window.innerWidth <= 576
                  ? {
                      maxHeight: "100vh",
                      minHeight: "100vh",
                      borderRadius: 0,
                    }
                  : {}),
              }}
            >
              <div
                className="modal-header"
                style={{
                  borderBottom: "1px solid #dee2e6",
                  padding: "1rem 1.5rem",
                  flexShrink: 0,
                }}
              >
                <h4
                  id="modal-title"
                  className="modal-title text-primary"
                  style={{
                    margin: 0,
                    fontSize: "1.5rem",
                    fontWeight: "600",
                  }}
                >
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
                    fontSize: "1.8rem",
                    cursor: "pointer",
                    padding: "0.5rem",
                    marginLeft: "auto",
                    color: "#6c757d",
                  }}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div
                className="modal-body"
                id="modal-description"
                style={{
                  padding: "1.5rem",
                  overflowY: "auto",
                  flexGrow: 1,
                  // Responsive for mobile
                  ...(window.innerWidth <= 576
                    ? {
                        padding: "1rem 0.5rem",
                        maxHeight: "calc(100vh - 60px)",
                        minHeight: "0",
                      }
                    : {}),
                }}
              >
                <div className="row">
                  <div className="col-md-4 mb-4">
                    <img
                      src={selectedCard.image.file.url}
                      alt={selectedCard.image.title}
                      className="img-fluid rounded shadow-sm"
                      style={{ width: "100%", height: "auto" }}
                    />

                    {/* Social Links - نقلتها تحت الصورة */}
                    <div className="social-links mt-3 d-flex flex-column gap-2">
                      {selectedCard.websiteLink && (
                        <a
                          href={selectedCard.websiteLink}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-outline-primary btn-sm d-flex align-items-center justify-content-center"
                          style={{ padding: "0.5rem" }}
                        >
                          <img
                            src={
                              data.contentfulPyramidsPage.websiteIcon.file.url
                            }
                            alt="website"
                            style={{
                              width: "16px",
                              height: "16px",
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
                          className="btn btn-outline-primary btn-sm d-flex align-items-center justify-content-center"
                          style={{ padding: "0.5rem" }}
                        >
                          <img
                            src={
                              data.contentfulPyramidsPage.facebookIcon.file.url
                            }
                            alt="facebook"
                            style={{
                              width: "16px",
                              height: "16px",
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
                          className="btn btn-outline-primary btn-sm d-flex align-items-center justify-content-center"
                          style={{ padding: "0.5rem" }}
                        >
                          <img
                            src={
                              data.contentfulPyramidsPage.instagramIcon.file.url
                            }
                            alt="instagram"
                            style={{
                              width: "16px",
                              height: "16px",
                              marginRight: "8px",
                            }}
                          />
                          Instagram
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="col-md-8">
                    <div className="content">
                      <h5
                        className="text-secondary mb-3"
                        style={{
                          borderBottom: "2px solid #e9ecef",
                          paddingBottom: "0.5rem",
                          fontSize: "1.2rem",
                        }}
                      >
                        More Details
                      </h5>

                      <div
                        style={{
                          lineHeight: "1.6",
                          fontSize: "1rem",
                          color: "#495057",
                        }}
                      >

                        {
                          selectedCardIndex === 1  
                          ? additionalContent.content.split("\n").filter(line => line.trim() !== "").slice(0, 1).join(" ") + "..."
                                : documentToReactComponents(
                          JSON.parse(selectedCard.description.raw)
                        )
                        }
                        {/* {documentToReactComponents(
                          JSON.parse(selectedCard.description.raw)
                        )} */}
                      </div>

                      {/* Additional content for first card only */}
                      {selectedCardIndex === 1 && (
                        <div
                          className="additional-content mt-4 p-4"
                          style={{
                            backgroundColor: "#f8f9fa",
                            borderRadius: "8px",
                            border: "1px solid #e9ecef",
                          }}
                        >
                          <h6
                            className="text-primary mb-3"
                            style={{
                              fontSize: "1.1rem",
                              fontWeight: "600",
                            }}
                          >
                            {additionalContent.title}
                          </h6>
                          <div
                            style={{
                              whiteSpace: "pre-line",
                              lineHeight: "1.6",
                              fontSize: "0.95rem",
                              color: "#495057",
                            }}
                          >
                            {additionalContent.content}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Responsive styles for modal on mobile */}
      <style>
        {`
          @media (max-width: 576px) {
            .modal-dialog {
              max-width: 100vw !important;
              margin: 0 !important;
              min-height: 100vh !important;
              display: flex !important;
              align-items: center !important;
              position: absolute !important;
              top: 0 !important;
              left: 0 !important;
              right: 0 !important;
              height: 100vh !important;
            }
            .modal-content {
              max-height: 100vh !important;
              min-height: 100vh !important;
              border-radius: 0 !important;
            }
            .modal-body {
              padding: 30px 20px 60px 20px !important;
              max-height: calc(100vh - 60px) !important;
              min-height: 0 !important;
              overflow-y: auto !important;
            }
            .modal-header {
              padding: 1rem 1rem !important;
            }
          }
          html, body {
            overscroll-behavior: contain;
          }
        `}
      </style>
    </>
  )
}

export default Pyramids
