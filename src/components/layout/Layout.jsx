import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div
      id="layout"
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Header />
      {children}
    </div>
  );
}
