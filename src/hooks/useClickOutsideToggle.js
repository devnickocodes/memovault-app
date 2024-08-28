import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook to handle toggling and closing of elements when clicking outside of them.
 *
 * This hook provides functionality to track whether an element is expanded or collapsed.
 * It also includes a reference to the element and handles
 * closing the element when a click occurs outside of it.
 */
const useClickOutsideToggle = () => {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click was outside of the referenced element
      if (ref.current && !ref.current.contains(event.target)) {
        setExpanded(false);
      }
    };

    // Add event listener for detecting clicks outside the referenced element
    document.addEventListener('mouseup', handleClickOutside);
    return () => {
      // Cleanup event listener on component unmount
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, [ref]);

  return { expanded, setExpanded, ref };
};

export default useClickOutsideToggle;
