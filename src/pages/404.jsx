import * as React from "react"

import Layout from "../components/Layout"
import Seo from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <Seo title="404: Not found" />
    <div style={{ margin: "20vh auto" }}>
      <h1 className="text-center">404: Not Found</h1>
      <p className="text-center">
        You just hit a route that doesn&#39;t exist...{" "}
        <span role="img" aria-label="sad emoji">
          😔
        </span>
        .
      </p>
    </div>
  </Layout>
)

export default NotFoundPage
