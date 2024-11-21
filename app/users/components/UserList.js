import UserBox from "./UserBox";

const UserList = ({ items }) => (
  <>
    <div className="flex justify-between mb-4 px-3">
      <div className="text-2xl font-bold text-neutral-800">People</div>
    </div>
    {items.map((item) => (
      <UserBox key={item.id} data={item} />
    ))}
  </>
);

export default UserList;
