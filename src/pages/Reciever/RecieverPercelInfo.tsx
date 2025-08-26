import { useUserInfoQuery } from "@/components/Redux/Features/Auth/auth.api";
import { useGetPercelByReceiverQuery } from "@/components/Redux/Features/Percel/percel.api";
import ReceiverPerceltimeline from "./ReceiverPerceltimeline";

export default function RecieverPercelInfo() {
   const {data:userInfo}=useUserInfoQuery(undefined)
   const receiverId=userInfo?.data?._id

  const {data:getIncomeingPercel}=useGetPercelByReceiverQuery({receiverId})
  console.log(getIncomeingPercel)
  return (
    <div className="flex items-center justify-center min-h-screen p-4 ">
     <ReceiverPerceltimeline getIncomeingPercel={getIncomeingPercel}/>
    </div>
  );
}



























  