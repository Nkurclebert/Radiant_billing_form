import Sidebar from "../../components/ui/Sidebar"

export default function RootLayout({ children }) {
    const loggedIn = {firstName: 'Clebert', lastName: ' Nkuranga'}

  return (
    <main className="flex h-screen w-full font-inter">
        <div className="border-r border-gray-300 pr-10 pl-10 h-screen">
            <Sidebar user={loggedIn} className=''/>
        </div>
        <div className="flex-1 flex items-center justify-center bg-gray-50">
            {children}
        </div>
    </main>
  )
}