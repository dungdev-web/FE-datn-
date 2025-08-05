export default function CheckoutLoading() {
  return (
    <div className="checkout-container px-4 flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-1/2">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="h-8 bg-gray-200 rounded mb-3"></div>
          <div className="space-y-3">
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/4">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-3"></div>
          <div className="h-8 bg-gray-200 rounded mb-2"></div>
          <div className="h-8 bg-gray-200 rounded"></div>
        </div>
      </div>
      <div className="w-full lg:w-1/4">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-3"></div>
          <div className="space-y-3">
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
