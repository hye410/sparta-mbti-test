export default function Card({ title, desc }) {
  return (
    <section className="rounded-md shadow-md bg-white p-7 lg:p-5 aspect-square flex flex-col justify-center max-w-[500px] w-[65%] md:w-[30%]">
      <h2 className="text-2xl mb-[20px] font-semibold  lg:text-3xl">{title}</h2>
      <p className=" text-lg text-justify lg:text-xl">{desc}</p>
    </section>
  );
}
