import { blogsDetailsController } from "../../../backend/controllers/blogController";
import EditBlogWrapper from "../../../components/my_profile_wrapper/addUpdateBlogWrapper";

export default function EditBlog({ blogDetails }) {
  return (
    <>
      <EditBlogWrapper blogDetails={blogDetails.data} />
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { blogId } = params;
  let blogDetails = "";

  const response = await blogsDetailsController(blogId);
  const jsonResponse = JSON.parse(JSON.stringify(response));

  if (jsonResponse.status) {
    blogDetails = jsonResponse;
  }

  return {
    props: {
      blogDetails,
    },
  };
}
