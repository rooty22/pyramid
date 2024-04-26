import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import Modal from "react-bootstrap/Modal"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { ajax } from "jquery"

const Apply = () => {
  const [shareholders, setShareholders] = useState([0])
  const [files, setFiles] = useState([0])
  let submitApplication = e => {
    const form = e.target
    document.getElementById("spinner").classList.add("d-flex")
    e.preventDefault()
    let data = new FormData(form)
    data.append("", form["isFundsReceived"].value)
    const url = "https://softworx-mailer.herokuapp.com/pyramids/application"
    ajax({
      url,
      type: "post",
      data,
      cache: false,
      enctype: "multipart/form-data",
      processData: false, // Important!
      contentType: false,
      success: function (respone) {
        alert("Your application was sent successfully.")
        document.getElementById("spinner").classList.remove("d-flex")
      },
      error: function (e) {
        document.getElementById("spinner").classList.remove("d-flex")
        alert("Error:" + e.responseText)
      },
    })
  }
  const data = useStaticQuery(graphql`
    query {
      contentfulInvestmentCriteria {
        investmentCriteriaItems {
          id
          title
          details {
            raw
          }
        }
      }
    }
  `)

  const [modalShow, setModalShow] = React.useState(true)

  return (
    <>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(null)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h2 className="text-secondary font-weight-normal mb-3">
            Investment Criteria
          </h2>
          <div className=" story__criteria">
            {data.contentfulInvestmentCriteria.investmentCriteriaItems.map(
              item => {
                return (
                  <div key={item.id} className="story__criteria__item mt-5">
                    <h4 className="story__criteria__item__title mb-2">
                      {item.title}
                    </h4>

                    {documentToReactComponents(JSON.parse(item.details.raw))}
                  </div>
                )
              }
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-primary py-1"
            onClick={() => setModalShow(null)}
          >
            OK
          </button>
        </Modal.Footer>
      </Modal>

      <div className="apply container">
        <form onSubmit={submitApplication}>
          <section className="apply__section">
            <h2 className="">General Info</h2>
            <h6 className="">Basic Information</h6>
            <div className=" row align-items-baseline">
              <label htmlFor="companyName" className="col-12 col-sm-5">
                company name
              </label>
              <div className="col-12 col-sm-6">
                <input
                  name="companyName"
                  id="companyName"
                  className="form-control"
                  type="text"
                />
              </div>

              <label htmlFor="estYear" className="col-12 col-sm-5">
                year of establishment<span className="text-danger">*</span>
              </label>
              <div className="col-12 col-sm-6">
                <input
                  type="number"
                  name="estYear"
                  id="estYear"
                  className="form-control"
                  required
                />
              </div>
            </div>
            <h6 className="">legal</h6>
            <div className=" row align-items-baseline">
              <label htmlFor="companyType" className="col-12 col-sm-5">
                Type of company
              </label>
              <div className="col-12 col-sm-6">
                <input
                  name="companyType"
                  id="companyType"
                  className="form-control"
                  type="text"
                />
              </div>

              <label htmlFor="shareholders" className="col-12 col-sm-5">
                Shareholders
              </label>
              <div className="col-12 col-sm-6">
                {shareholders.map((sh, i) => {
                  return (
                    <div
                      key={"shareholder" + i}
                      className={`row ${i === 0 ? "align-items-center" : ""}`}
                      id={"shareholder" + i}
                    >
                      <div className="col-7 mb-3">
                        {i === 0 && <h6 className="mt-0">Name</h6>}
                        <input
                          type="text"
                          name={"shareholderName" + i}
                          id={"shareholderName" + i}
                          className="form-control mb-0"
                        />
                      </div>
                      <div className="col-4 pl-0 mb-3">
                        {i === 0 && <h6 className="mt-0">Percentage</h6>}
                        <input
                          type="number"
                          name={"shareholderPer" + i}
                          id={"shareholderPer" + i}
                          className="form-control mb-0"
                        />
                      </div>
                      {shareholders.length > 1 && (
                        <div className="col-1 px-0">
                          <button
                            type="button"
                            className="remove-btn mt-0"
                            onClick={() => {
                              document
                                .getElementById("shareholder" + i)
                                .remove()
                            }}
                          >
                            -
                          </button>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="col-12 col-sm-5"></div>
              <div className="col-12 col-sm-6">
                <button
                  type="button"
                  className="add-btn"
                  onClick={() =>
                    setShareholders([...shareholders, shareholders.length])
                  }
                >
                  +
                </button>
              </div>
            </div>
          </section>

          <section className="apply__section">
            <h2 className="">Company Info</h2>
            <h6 className="">Business Model</h6>

            <div className=" row align-items-baseline">
              <label htmlFor="companyOverview" className="col-12 col-sm-5">
                company overview<span className="text-danger">*</span>
              </label>
              <div className="col-12 col-sm-6">
                <textarea
                  name="companyOverview"
                  id="companyOverview"
                  rows="6"
                  className="form-control"
                  required
                ></textarea>
              </div>

              <label htmlFor="target" className="col-12 col-sm-5">
                target market
              </label>
              <div className="col-12 col-sm-6">
                <textarea
                  name="target"
                  id="target"
                  rows="6"
                  className="form-control"
                ></textarea>
              </div>

              <label htmlFor="usp" className="col-12 col-sm-5">
                USP of the company
              </label>
              <div className="col-12 col-sm-6">
                <input
                  type="text"
                  name="usp"
                  id="usp"
                  className="form-control"
                />
              </div>

              <label htmlFor="rgm" className="col-12 col-sm-5">
                revenue generation model
              </label>
              <div className="col-12 col-sm-6">
                <textarea
                  name="rgm"
                  id="target"
                  rows="6"
                  className="form-control"
                ></textarea>
              </div>

              <label htmlFor="compLandscape" className="col-12 col-sm-5">
                competitive landscape
              </label>
              <div className="col-12 col-sm-6">
                <textarea
                  name="compLandscape"
                  id="compLandscape"
                  rows="6"
                  className="form-control"
                ></textarea>
              </div>
            </div>

            <h6 className="">
              Team: <br />
              partners & their role in managment
            </h6>
            <div className=" row align-items-baseline">
              <label htmlFor="teamName" className="col-12 col-sm-5">
                name
              </label>
              <div className="col-12 col-sm-6">
                <input
                  type="text"
                  name="teamName"
                  id="teamName"
                  className="form-control"
                />
              </div>

              <label htmlFor="roleCompany" className="col-12 col-sm-5">
                role in company
              </label>
              <div className="col-12 col-sm-6">
                <input
                  type="text"
                  name="roleCompany"
                  id="roleCompany"
                  className="form-control"
                />
              </div>

              <label htmlFor="education" className="col-12 col-sm-5">
                education
              </label>
              <div className="col-12 col-sm-6">
                <textarea
                  name="education"
                  id="education"
                  rows="6"
                  className="form-control"
                ></textarea>
              </div>

              <label htmlFor="experience" className="col-12 col-sm-5">
                experience
              </label>
              <div className="col-12 col-sm-6">
                <textarea
                  name="experience"
                  id="experience"
                  rows="6"
                  className="form-control"
                ></textarea>
              </div>

              <label htmlFor="employeesNum" className="col-12 col-sm-5">
                number of employees
              </label>
              <div className="col-12 col-sm-6">
                <input
                  type="number"
                  name="employeesNum"
                  id="employeesNum"
                  className="form-control"
                />
              </div>

              <label htmlFor="orgStructure" className="col-12 col-sm-5">
                organization structure
              </label>
              <div className="col-12 col-sm-6">
                <textarea
                  name="orgStructure"
                  id="orgStructure"
                  rows="6"
                  className="form-control"
                ></textarea>
              </div>
            </div>
          </section>

          <section className="apply__section">
            <h2 className="">Finanicial Info</h2>

            <div className=" row align-items-baseline">
              <label htmlFor="revenues" className="col-12 col-sm-5">
                revenues<span className="text-danger">*</span>
              </label>
              <div className="col-12 col-sm-6">
                <input
                  type="text"
                  name="revenues"
                  id="revenues"
                  className="form-control"
                  required
                />
              </div>

              <label htmlFor="historicalGrouth" className="col-12 col-sm-5">
                historical growth over the past two years
              </label>
              <div className="col-12 col-sm-6">
                <textarea
                  name="historicalGrouth"
                  id="historicalGrouth"
                  rows="6"
                  className="form-control"
                ></textarea>
              </div>

              <label htmlFor="customRadioInline1" className="col-12 col-sm-5">
                Have you ever received funds from any other entity?
              </label>
              <div className="col-12 col-sm-6 mb-4 mb-sm-5">
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    id="customRadioInline1"
                    name="isFundsReceived"
                    className="custom-control-input"
                    value="Yes"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customRadioInline1"
                  >
                    Yes
                  </label>
                </div>
                <div className="custom-control custom-radio custom-control-inline ml-5">
                  <input
                    type="radio"
                    id="customRadioInline2"
                    name="isFundsReceived"
                    className="custom-control-input"
                    value="No"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customRadioInline2"
                  >
                    No
                  </label>
                </div>
              </div>

              <label htmlFor="investmentCost" className="col-12 col-sm-5">
                investment cost/ <br /> capital required
              </label>
              <div className="col-12 col-sm-6">
                <input
                  type="text"
                  name="investmentCost"
                  id="investmentCost"
                  className="form-control"
                />
              </div>

              <label htmlFor="compLandscape" className="col-12 col-sm-5">
                competitive landscape
              </label>
              <div className="col-12 col-sm-6">
                <textarea
                  name="compLandscape"
                  id="compLandscape"
                  rows="6"
                  className="form-control"
                ></textarea>
              </div>
            </div>
          </section>

          <section className="apply__section">
            <h2 className="">Contact Info</h2>
            <h6 className="">spokesperson contacts</h6>
            <div className=" row align-items-baseline">
              <label htmlFor="contactName" className="col-12 col-sm-5">
                name
              </label>
              <div className="col-12 col-sm-6">
                <input
                  type="text"
                  name="contactName"
                  id="contactName"
                  className="form-control"
                />
              </div>

              <label htmlFor="contactPhone" className="col-12 col-sm-5">
                mobile/phone number
              </label>
              <div className="col-12 col-sm-6">
                <input
                  type="text"
                  name="contactPhone"
                  id="contactPhone"
                  className="form-control"
                />
              </div>

              <label htmlFor="contactEmail" className="col-12 col-sm-5">
                Email<span className="text-danger">*</span>
              </label>
              <div className="col-12 col-sm-6">
                <input
                  type="email"
                  name="contactEmail"
                  id="contactEmail"
                  className="form-control"
                />
              </div>

              <label htmlFor="websiteLink" className="col-12 col-sm-5">
                company website link
              </label>
              <div className="col-12 col-sm-6">
                <input
                  type="text"
                  name="websiteLink"
                  id="websiteLink"
                  className="form-control"
                />
              </div>

              <label htmlFor="socialMediaLinks" className="col-12 col-sm-5">
                social media link(s)
              </label>
              <div className="col-12 col-sm-6">
                <input
                  type="text"
                  name="socialMediaLinks"
                  id="socialMediaLinks"
                  className="form-control"
                />
              </div>

              <label htmlFor="addDocs" className="col-12 col-sm-5">
                additional documents
              </label>
              <div className="col-12 col-sm-6">
                {files.map((sh, i) => {
                  return (
                    <div
                      key={"file" + i}
                      className="row mx-0"
                      id={"fileContainer" + i}
                    >
                      <div className="col-11 pl-0 ">
                        <input
                          type="file"
                          name={"file" + i}
                          id={"fileInput" + i}
                          className="mb-2"
                        />
                      </div>
                      {files.length > 1 && (
                        <div className="col-1 px-0">
                          <button
                            type="button"
                            className="remove-btn mt-0"
                            onClick={() => {
                              document
                                .getElementById("fileContainer" + i)
                                .remove()
                            }}
                          >
                            -
                          </button>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
              <div className="col-12 col-sm-5"></div>

              <div className="col-12 col-sm-6">
                <button
                  type="button"
                  className="add-btn"
                  onClick={() => setFiles([...files, files.length])}
                >
                  +
                </button>
              </div>
            </div>
          </section>

          <button type="submit" className="mb-5 mx-auto px-5">
            SEND
          </button>
        </form>
      </div>
    </>
  )
}

export default Apply
