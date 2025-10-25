import './App.css';
import Articles from './Articles';
function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header dengan gradient dan bayangan */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-md">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">
            Riant Blog CMS
            <span className="text-sm ml-3 text-blue-200">Portfolio Demo</span>
          </h1>
        </div>
      </header>
      
      {/* Main content dengan padding yang responsive */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Articles />
      </main>
      
      {/* Simple footer */}
      <footer className="bg-gray-800 text-gray-400 py-4 text-center mt-8">
        <p className="text-sm">
          Made with ❤️ by Riant Andriansyah
        </p>
      </footer>
    </div>
  );
}

export default App;
