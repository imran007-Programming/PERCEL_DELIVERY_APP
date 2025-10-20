interface Iprops{
    onClick:()=>void;
    text:string;
    icon:React.ReactNode
}

const ButtonHoverTopFlip = ({onClick,text,icon}:Iprops) => {
  return (
    <button
    onClick={onClick}
      className="
        group relative inline-flex h-12 items-center justify-center 
        overflow-hidden rounded-md
      "
    >
      {/* Front Face */}
      <div
        className="
          inline-flex h-12 items-center justify-center bg-primary
          px-6 text-black dark:text-white 
          transition-transform duration-300 
          group-hover:-translate-y-full
        "
      >
      {text}
      {icon}
      </div>

      {/* Back Face */}
      <div
        className="
          absolute inset-0 inline-flex h-12 items-center justify-center 
          bg-primary
          text-neutral-50 px-6 
          translate-y-full group-hover:translate-y-0 
          transition-transform duration-300
        "
      >
        {text}
      {icon}
      </div>
    </button>
  );
};

export default ButtonHoverTopFlip;
