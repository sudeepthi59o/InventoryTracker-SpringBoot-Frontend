
function NotFoundPage() {
 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-red-600 mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-6">Page Not Found</p>
        <p className="text-lg text-gray-500 mb-6">
          The page you're looking for might have been removed or temporarily unavailable.
        </p>
        <a
          href="/products"
          className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        >
          Go to Homepage
        </a>
      </div>
    </div>
  );
}

export default NotFoundPage;
