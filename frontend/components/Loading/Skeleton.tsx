const LoadingSkeleton = () => {
  return (
    <div>
      <div className="flex items-center space-x-4 py-4">
        <div className="animate-pulse bg-gray-300 h-6 w-6 rounded-full"></div>
        <div className="flex-1 bg-gray-300 h-4 rounded"></div>
      </div>
      <div className="flex items-center space-x-4 py-4">
        <div className="animate-pulse bg-gray-300 h-6 w-6 rounded-full"></div>
        <div className="flex-1 bg-gray-300 h-4 rounded"></div>
      </div>
      <div className="flex items-center space-x-4 py-4">
        <div className="animate-pulse bg-gray-300 h-6 w-6 rounded-full"></div>
        <div className="flex-1 bg-gray-300 h-4 rounded"></div>
      </div>
      <div className="flex items-center space-x-4 py-4">
        <div className="animate-pulse bg-gray-300 h-6 w-6 rounded-full"></div>
        <div className="flex-1 bg-gray-300 h-4 rounded"></div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
