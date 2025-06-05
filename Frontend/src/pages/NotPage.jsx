import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
      <Link to="/" className="text-blue-500 underline">Back to Home</Link>
    </div>
  );
}
