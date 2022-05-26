import * as React from "react";

const SvgComponent = props => (
  <svg
    className="animate-spin -ml-1 mr-3 h-10 w-10 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}>
    <circle
      className="opacity-25"
      cx="50%"
      cy="50%"
      // r={10}
      stroke="currentColor"
      strokeWidth={4}
      style={{
        "--darkreader-inline-stroke": "currentColor"
      }}
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      style={{
        "--darkreader-inline-fill": "currentColor"
      }}
    />
  </svg>
);

export default SvgComponent;
