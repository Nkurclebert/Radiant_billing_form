import Sidebar from "../../components/ui/Sidebar";
import Navbar from "../../components/ui/Navbar";

export default function RootLayout({ children }) {
  

  return (
    <div className="flex h-screen overflow-hidden font-inter">
      
      {/* Sidebar — fixed */}
      <aside className="hidden md:block fixed left-0 top-0 h-screen w-64 border-r border-gray-300 bg-white z-50 pr-10 pl-5">
        <Sidebar />
      </aside>

      {/* Main content — scrolls */}
      <main className=" md:ml-64 flex-1 h-screen overflow-y-auto bg-gray-50">
        <div className="block md:hidden">
          <Navbar />
        </div>
        {children}
      </main>

    </div>
  );
}
