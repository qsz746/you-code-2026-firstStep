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
import { ProtectedRoute } from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/coordinator",
    element: (
      <ProtectedRoute>
        <CoordinatorDashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/coordinator/dashboard",
    element: (
      <ProtectedRoute>
        <CoordinatorDashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/coordinator/volunteers",
    element: (
      <ProtectedRoute>
        <CoordinatorVolunteersPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/coordinator/schedule",
    element: (
      <ProtectedRoute>
        <CoordinatorSchedulePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/coordinator/resources",
    element: (
      <ProtectedRoute>
        <CoordinatorResourcesPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/coordinator/knowledge",
    element: (
      <ProtectedRoute>
        <CoordinatorKnowledgePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/coordinator/resources/submission/:id",
    element: (
      <ProtectedRoute>
        <ScenarioSubmissionDetail />
      </ProtectedRoute>
    ),
  },
  {
    path: "/volunteer",
    element: (
      <ProtectedRoute>
        <VolunteerPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/volunteer/dashboard/:role",
    element: (
      <ProtectedRoute>
        <VolunteerDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/volunteer/training",
    element: (
      <ProtectedRoute>
        <TrainingModules />
      </ProtectedRoute>
    ),
  },
  {
    path: "/volunteer/role-instructions/:role",
    element: (
      <ProtectedRoute>
        <RoleInstructions />
      </ProtectedRoute>
    ),
  },
  {
    path: "/volunteer/faq",
    element: (
      <ProtectedRoute>
        <VolunteerFAQ />
      </ProtectedRoute>
    ),
  },
  {
    path: "/volunteer/suggest-scenario",
    element: (
      <ProtectedRoute>
        <SuggestScenario />
      </ProtectedRoute>
    ),
  },
  {
    path: "/volunteer/scenario-submitted",
    element: (
      <ProtectedRoute>
        <ScenarioSubmitted />
      </ProtectedRoute>
    ),
  },
]);