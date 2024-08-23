import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ReportCreateForm from "../ReportCreateForm";
import { axiosRes } from "../../../api/axiosDefaults";
import { useSuccessAlert } from "../../../contexts/SuccessAlertContext";
import { useParams } from "react-router-dom";

// Mock the necessary modules
jest.mock("../../../api/axiosDefaults", () => ({
  axiosRes: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

jest.mock("../../../contexts/SuccessAlertContext", () => ({
  useSuccessAlert: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

const setup = () => {
  return render(
    <Router>
      <ReportCreateForm />
    </Router>
  );
};

test("renders ReportCreateForm and displays post information and form elements", async () => {
    // Mock API response for post information
    axiosRes.get.mockResolvedValueOnce({
      data: {
        owner: "John Doe",
        image: "test-image-url",
        title: "Test Post Title",
        content: "Test post content.",
      },
    });
  
    // Mock useSuccessAlert hook
    useSuccessAlert.mockReturnValue({
      setAlert: jest.fn(),
    });
  
    // Mock useParams to return the ID
    useParams.mockReturnValue({ id: 1 });
  
    setup();
  
    // Wait for the post information to be displayed
    await waitFor(() => {
      expect(screen.getByText(/Title:/)).toBeInTheDocument();
      expect(screen.getByText("Test Post Title")).toBeInTheDocument();
      expect(screen.getByText(/Posted by:/)).toBeInTheDocument();
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText(/Content:/)).toBeInTheDocument();
      expect(screen.getByText("Test post content.")).toBeInTheDocument();
    });
  
    // Check for form elements
    const reasonSelect = screen.getByLabelText(/Reason for Report/);
    expect(reasonSelect).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit Report/ })).toBeInTheDocument();
  
    // Check for options in the dropdown
    expect(screen.getByText("Select a reason")).toBeInTheDocument();
    expect(screen.getByText("Spam")).toBeInTheDocument();
    expect(screen.getByText("Inappropriate Content")).toBeInTheDocument();
    expect(screen.getByText("Harassment")).toBeInTheDocument();
    expect(screen.getByText("Other")).toBeInTheDocument();
  
    // Check the post image
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'test-image-url');
  });


