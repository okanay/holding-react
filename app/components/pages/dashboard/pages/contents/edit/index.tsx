import { Route } from "@/routes/$lang/_auth/dashboard/contents.edit.$id";

const EditContentPage = () => {
  const { id } = Route.useLoaderData();

  return <div>Edit Content Page</div>;
};

export default EditContentPage;
