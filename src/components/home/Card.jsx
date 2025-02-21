export default function Card({ title, desc }) {
  return (
    <section className="rounded-md shadow-md bg-sky-50 p-6 aspect-square flex flex-col justify-center max-w-[500px] w-[60%] md:w-[30%]">
      <h2 style={{ fontSize: "1.5rem", marginBottom: "20px" }}>{title}</h2>
      <p style={{ textAlign: "justify" }}>{desc}</p>
    </section>
  );
}
