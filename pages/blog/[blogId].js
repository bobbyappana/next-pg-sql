import { NextSeo } from "next-seo";

import PageNotFound from "../../components/common/pageNotFound";
import DetailsWrapper from "../../components/details_wrapper/detailsWrapper";
import { blogsDetailsController } from "../../backend/controllers/blogController";

export default function Details({ blogDetails = "", seoOption = {} }) {
  if (blogDetails == "") {
    return <PageNotFound />;
  }

  return (
    <>
      <NextSeo {...seoOption} />
      <DetailsWrapper blogDetails={blogDetails.data} />
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { blogId } = params;
  let blogDetails = "";
  const seoOption = {};

  const response = await blogsDetailsController(blogId);
  const jsonResponse = JSON.parse(JSON.stringify(response));

  if (jsonResponse.status) {
    blogDetails = jsonResponse;
    seoOption.title = jsonResponse.data.title;
  }
  return {
    props: {
      blogDetails,
      seoOption,
    },
  };
}
