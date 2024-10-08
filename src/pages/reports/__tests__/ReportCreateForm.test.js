/* eslint-env jest */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router, useParams } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import ReportCreateForm from '../ReportCreateForm';
import { axiosRes } from '../../../api/axiosDefaults';
import { useSuccessAlert } from '../../../contexts/SuccessAlertContext';

// Mock the necessary modules
jest.mock('../../../api/axiosDefaults', () => ({
  axiosRes: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

jest.mock('../../../contexts/SuccessAlertContext', () => ({
  useSuccessAlert: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

const setup = () => render(
  <Router>
    <ReportCreateForm />
  </Router>,
);

test('renders ReportCreateForm and displays post information and form elements', async () => {
  // Mock API response for post information
  axiosRes.get.mockResolvedValueOnce({
    data: {
      owner: 'John Doe',
      image: 'test-image-url',
      title: 'Test Post Title',
      content: 'Test post content.',
    },
  });
  // Mock useSuccessAlert hook
  useSuccessAlert.mockReturnValue({
    setAlert: jest.fn(),
  });

  // Mock useParams to return ID
  useParams.mockReturnValue({ id: 1 });

  setup();

  // Wait for the post information to be displayed
  await waitFor(() => {
    expect(screen.getByText(/Title:/)).toBeInTheDocument();
    expect(screen.getByText('Test Post Title')).toBeInTheDocument();
    expect(screen.getByText(/Posted by:/)).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText(/Content:/)).toBeInTheDocument();
    expect(screen.getByText('Test post content.')).toBeInTheDocument();
  });

  // Check for form elements
  const reasonSelect = screen.getByLabelText(/Reason for Report/);
  expect(reasonSelect).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Submit Report/ })).toBeInTheDocument();

  // Check for options in the dropdown
  expect(screen.getByText('Select a reason')).toBeInTheDocument();
  expect(screen.getByText('Spam')).toBeInTheDocument();
  expect(screen.getByText('Inappropriate Content')).toBeInTheDocument();
  expect(screen.getByText('Harassment')).toBeInTheDocument();
  expect(screen.getByText('Other')).toBeInTheDocument();

  // Check the post image
  const image = screen.getByRole('img');
  expect(image).toHaveAttribute('src', 'test-image-url');
});

test('successful form submission triggers API call and success message', async () => {
  // Mock API responses
  axiosRes.get.mockResolvedValueOnce({
    data: {
      owner: 'John Doe',
      image: 'test-image-url',
      title: 'Test Post Title',
      content: 'Test post content.',
    },
  });

  // Mock successful API response
  axiosRes.post.mockResolvedValueOnce({
    data: { id: 1 },
  });

  // Mock useSuccessAlert hook
  const setAlert = jest.fn();
  useSuccessAlert.mockReturnValue({ setAlert });

  // Mock useParams to return ID
  useParams.mockReturnValue({ id: 1 });

  setup();

  // Fill out the form
  const reasonSelect = screen.getByLabelText(/Reason for Report/i);
  userEvent.selectOptions(reasonSelect, 'other');

  // Ensure the custom reason textarea is visible and fill out
  const customReasonTextarea = screen.getByLabelText(/Custom Reason/i);
  userEvent.type(customReasonTextarea, 'Inappropriate behavior');

  const submitButton = screen.getByRole('button', { name: /Submit Report/i });

  // Submit the form
  userEvent.click(submitButton);

  // Wait for the API call to complete and verify the submission
  await waitFor(() => {
    expect(axiosRes.post).toHaveBeenCalledWith('/reports/', {
      post: 1,
      reason: 'other',
      custom_reason: 'Inappropriate behavior',
    });

    expect(setAlert).toHaveBeenCalledWith({
      message: 'Report has been submitted!',
    });

    // Confirm that the form submission triggers only one API call
    expect(axiosRes.post).toHaveBeenCalledTimes(1);
  });
});

test('shows error messages when submission fails', async () => {
  // Mock API responses
  axiosRes.get.mockResolvedValueOnce({
    data: {
      owner: 'John Doe',
      image: 'test-image-url',
      title: 'Test Post Title',
      content: 'Test post content.',
    },
  });

  axiosRes.post.mockRejectedValueOnce({
    response: {
      data: {
        reason: ['"" is not a valid choice.'],
        custom_reason: ["This field is required if 'Other' is selected."],
        non_field_errors: ['An error occurred.'],
      },
    },
  });

  // Mock useSuccessAlert hook
  useSuccessAlert.mockReturnValue({
    setAlert: jest.fn(),
  });

  // Mock useParams to return the correct ID
  useParams.mockReturnValue({ id: 1 });

  setup();

  // Fill out the form with invalid data
  userEvent.selectOptions(screen.getByLabelText(/Reason for Report/i), '');

  const submitButton = screen.getByRole('button', { name: /Submit Report/i });
  userEvent.click(submitButton);

  // Wait for error messages to be displayed
  await waitFor(() => {
    expect(screen.getByText('"" is not a valid choice.')).toBeInTheDocument();
    expect(screen.getByText("This field is required if 'Other' is selected.")).toBeInTheDocument();
    expect(screen.getByText('An error occurred.')).toBeInTheDocument();
  });
});

test("shows custom reason field when 'Other' is selected", async () => {
  // Mock useParams to return the correct ID
  useParams.mockReturnValue({ id: 1 });

  // Mock useSuccessAlert hook
  useSuccessAlert.mockReturnValue({
    setAlert: jest.fn(),
  });

  setup();

  // Select 'Other' as the reason
  userEvent.selectOptions(screen.getByLabelText(/Reason for Report/i), 'Other');

  // Wait for the custom reason field to be visible
  await waitFor(() => {
    expect(screen.getByLabelText(/Custom Reason/i)).toBeInTheDocument();
  });
});

test("hides custom reason field when reason is not 'Other'", async () => {
  // Mock useParams to return the correct ID
  useParams.mockReturnValue({ id: 1 });

  // Mock useSuccessAlert hook
  useSuccessAlert.mockReturnValue({
    setAlert: jest.fn(),
  });

  setup();

  // Select 'Spam' as the reason
  userEvent.selectOptions(screen.getByLabelText(/Reason for Report/i), 'Spam');

  // Wait for the custom reason field to be hidden
  await waitFor(() => {
    expect(screen.queryByLabelText(/Custom Reason/i)).toBeNull();
  });
});
