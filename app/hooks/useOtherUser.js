import { useSession } from "next-auth/react";
import { useMemo } from "react";

const useOtherUser = (conversation) => {
  const session = useSession();

  const otherUser = useMemo(() => {
    const currentUserEmail = session?.data?.user?.email;
    const [otherUser] = conversation.users.filter(
      (user) => user.email !== currentUserEmail
    );

    return otherUser;
  }, [conversation.users, session?.data?.user?.email]);

  return otherUser;
};

export default useOtherUser;
