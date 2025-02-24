import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div
      id="layout"
      className="w-screen min-w-xs h-[100dvh] bg-slate-200 flex flex-col overflow-scroll"
    >
      <Header />
      <div id="container" className="flex-1 overflow-visible py-[5vh] px-[5vw]">
        {children}
      </div>
    </div>
  );
}
