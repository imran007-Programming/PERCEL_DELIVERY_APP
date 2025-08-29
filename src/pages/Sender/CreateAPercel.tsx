import { useUserInfoQuery } from "@/components/Redux/Features/Auth/auth.api";
import { PercelForm } from "./percelForm";

export default function CreateAPercel() {
  const { data, error,isFetching } = useUserInfoQuery(undefined);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading user data.</div>;
  }

  const senderId = data?.data?._id;
 

  return (
    <div className="flex items-center justify-center min-h-screen p-4 ">
      <div className="w-full max-w-3xl ">
         <h1 className="text-3xl my-2 text-primary">Create A Percel</h1><br/>
        {senderId ? (
          <PercelForm senderId={senderId} />
        ) : (
          <div>No sender ID found</div>
        )}
      </div>
    </div>
  );
}
