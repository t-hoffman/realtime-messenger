import MainLayout from "../components/MainLayout";
import UserList from "./components/UserList";

export default async function UsersLayout({ children }) {
  return <MainLayout sidebar={<UserList />}>{children}</MainLayout>;
}
