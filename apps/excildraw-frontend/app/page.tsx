import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24">
        {/* Hero Section */}
        <div className="text-center space-y-8">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">
            Excil Draw
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
            Create, collaborate, and share your ideas with our powerful drawing tool.
            Join thousands of creators today.
          </p>
          
          {/* Buttons Container */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link href="/signin">
              <button className="px-8 py-3 bg-white text-black font-medium rounded-lg 
                hover:bg-gray-100 transition-colors duration-200 min-w-[160px]">
                Sign In
              </button>
            </Link>
            
            <Link href="/signup">
              <button className="px-8 py-3 bg-transparent text-white font-medium 
                border-2 border-white rounded-lg hover:bg-white/10 
                transition-colors duration-200 min-w-[160px]">
                Sign Up
              </button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {[
            {
              title: "Real-time Collaboration",
              description: "Work together with your team in real-time"
            },
            {
              title: "Intuitive Interface",
              description: "Easy to use tools for all skill levels"
            },
            {
              title: "Cloud Storage",
              description: "Access your drawings from anywhere"
            }
          ].map((feature, index) => (
            <div key={index} className="p-6 rounded-lg border border-white/10 hover:border-white/20 transition-colors">
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}