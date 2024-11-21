import getUsers from "../actions/getUsers";
import MainLayout from "../components/MainLayout";
import UserList from "./components/UserList";

export default async function UsersLayout({ children }) {
  const users = await getUsers();

  return (
    <MainLayout sidebar={<UserList items={users} />}>{children}</MainLayout>
  );
}
