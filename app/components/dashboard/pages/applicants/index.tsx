import { DashboardProvider } from "../../store";

export const DashboardApplicantsPage = () => {
  return (
    <DashboardProvider>
      <InnerElements />
    </DashboardProvider>
  );
};

const InnerElements = () => {
  return <div>Applicatans Page</div>;
};
