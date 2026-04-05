import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import CoordinatorDashboard from "./components/CoordinatorDashboard";
import CoordinatorDashboardPage from "./components/CoordinatorDashboardPage";
import CoordinatorVolunteersPage from "./components/CoordinatorVolunteersPage";
import CoordinatorSchedulePage from "./components/CoordinatorSchedulePage";
import CoordinatorResourcesPage from "./components/CoordinatorResourcesPage";
import CoordinatorKnowledgePage from "./components/CoordinatorKnowledgePage";
import ScenarioSubmissionDetail from "./components/ScenarioSubmissionDetail";
import VolunteerPage from "./components/VolunteerPage";
import VolunteerDashboard from "./components/VolunteerDashboard";
import TrainingModules from "./components/TrainingModules";
import RoleInstructions from "./components/RoleInstructions";
import VolunteerFAQ from "./components/VolunteerFAQ";
import SuggestScenario from "./components/SuggestScenario";
import ScenarioSubmitted from "./components/ScenarioSubmitted";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/coordinator",
    Component: CoordinatorDashboardPage,
  },
  {
    path: "/coordinator/dashboard",
    Component: CoordinatorDashboardPage,
  },
  {
    path: "/coordinator/volunteers",
    Component: CoordinatorVolunteersPage,
  },
  {
    path: "/coordinator/schedule",
    Component: CoordinatorSchedulePage,
  },
  {
    path: "/coordinator/resources",
    Component: CoordinatorResourcesPage,
  },
  {
    path: "/coordinator/knowledge",
    Component: CoordinatorKnowledgePage,
  },
  {
    path: "/coordinator/resources/submission/:id",
    Component: ScenarioSubmissionDetail,
  },
  {
    path: "/volunteer",
    Component: VolunteerPage,
  },
  {
    path: "/volunteer/dashboard/:role",
    Component: VolunteerDashboard,
  },
  {
    path: "/volunteer/training",
    Component: TrainingModules,
  },
  {
    path: "/volunteer/role-instructions/:role",
    Component: RoleInstructions,
  },
  {
    path: "/volunteer/faq",
    Component: VolunteerFAQ,
  },
  {
    path: "/volunteer/suggest-scenario",
    Component: SuggestScenario,
  },
  {
    path: "/volunteer/scenario-submitted",
    Component: ScenarioSubmitted,
  },
]);