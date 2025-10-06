type CardProps = {
  title: string;
  text: string;
  icon?: React.ReactNode; // in case we change the emojis to something else
};

export default function Card({ title, text, icon }: CardProps) {
  return (
    <div>
      <div className='bg-[#151e22] rounded-4xl p-10 flex flex-col gap-4 text-center text-grey-secondary lg:flex-row-reverse'>
        {/* image */}
        <div>
          <div className='mb-10 text-7xl flex justify-center items-center'>
            {icon}
          </div>
        </div>
        {/* content */}
        <div>
          <h1 className='font-semibold text-2xl mb-9'>{title}</h1>
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
}
