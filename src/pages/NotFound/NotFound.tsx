import image from "../../assets/404/404.png"
export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-w-[50%] ">
        <img className="w-full" src={image}/>
    </div>
  );
}