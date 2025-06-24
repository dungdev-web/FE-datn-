import "../css/403.css";
export default function Error404() {
  return (
    <section className="!py-10">
      <div className="container !mx-auto">
        <div className="flex justify-center">
          <div className="text-center !w-full max-w-xl">
            <div
              className="bg-center bg-no-repeat bg-cover !h-96 flex items-center justify-center"
              style={{
                backgroundImage:
                  "url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')",
              }}
            >
              <h1 className="text-8xl">403</h1>
            </div>

            <div className="!-mt-12">
              <h3 className="text-2xl !mb-2">Look like you're lost</h3>
              <p className="!mb-4">
                The page you are looking for is not available!
              </p>
              <a
                href="/"
                className="inline-block !px-6 !py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Go to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
