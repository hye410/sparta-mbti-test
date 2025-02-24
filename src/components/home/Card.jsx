export default function Card({ title, desc }) {
  return (
    <section className="rounded-md shadow-md bg-white p-7 lg:p-5 aspect-square flex flex-col justify-center min-w-[250px] w-[50%] md:w-[30%] max-w-[500px]">
      <h2 className="text-2xl mb-[20px] font-semibold  lg:text-3xl">{title}</h2>
      <p className=" text-lg text-justify lg:text-xl">{desc}</p>
    </section>
  );
}
