import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ReportPreview from "../ReportPreview";

const mockReportAdmin = {
  id: 1,
  owner: "John Doe",
  reason: "Spam",
  custom_reason: "A spam post!",
  post: {
    title: "Post Title",
    content: "Post Content.",
  },
  is_admin: true,
};

test("renders ReportPreview with correct content for admin", () => {

  const apiEndpoint = "/reports/admin";

  render(
    <Router>
      <ReportPreview report={mockReportAdmin} apiEndpoint={apiEndpoint} />
    </Router>
  );

  // Check for the presence of the report owner
  expect(screen.getByText(/submitted by:/i)).toBeInTheDocument();
  expect(screen.getByText(mockReportAdmin.owner)).toBeInTheDocument();

  // Check that the link is correct for admins
  const link = screen.getByRole("link");
  expect(link).toHaveAttribute("href", `${apiEndpoint}/${mockReportAdmin.id}`);

  //  Check for "Reason:" label and its text
  const reasonLabels = screen.getAllByText(/reason:/i);
  expect(reasonLabels.length).toBeGreaterThan(0);
  expect(screen.getByText(mockReportAdmin.reason)).toBeInTheDocument();

  // Check for the "Additional Reason:" label and its text if custom_reason exists
  if (mockReportAdmin.custom_reason) {
    const additionalReasonLabels = screen.getAllByText(/additional reason:/i);
    expect(additionalReasonLabels.length).toBeGreaterThan(0);
    expect(screen.getByText(mockReportAdmin.custom_reason)).toBeInTheDocument();
  }

  // Check for post title and content
  expect(screen.getByText(/post title:/i)).toBeInTheDocument();
  expect(screen.getByText(mockReportAdmin.post.title)).toBeInTheDocument();

  expect(screen.getByText(/post content:/i)).toBeInTheDocument();
  expect(screen.getByText(mockReportAdmin.post.content)).toBeInTheDocument();

  // Check for the "View Full Report" button
  expect(
    screen.getByRole("button", { name: /view full report/i })
  ).toBeInTheDocument();
});