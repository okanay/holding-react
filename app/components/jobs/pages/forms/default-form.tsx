export const DefaultApplicationForm = ({ job }: { job: Job }) => {
  return <form>{job.details.formType}</form>;
};
