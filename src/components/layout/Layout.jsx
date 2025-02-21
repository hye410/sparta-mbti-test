import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div
      id="layout"
      className="w-screen min-w-xs h-screen bg-slate-200 flex flex-col"
    >
      <Header />
      <div id="container" className="flex-1 overflow-auto py-[5vh] px-[5vw]">
        {children}
      </div>
    </div>
  );
}
