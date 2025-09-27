
import loadingLogo from "../../assets/LoadingLogo/logoipsum-359.png";

export default function Loader() {
 

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black opacity-80 z-50">
      <img
        src={loadingLogo}
        alt="Loading..."
        className="w-20 h-20 animate-spin"
      />
      
    </div>
  );
}
