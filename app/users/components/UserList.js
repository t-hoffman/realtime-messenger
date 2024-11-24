import UserBox from "./UserBox";

const UserList = ({ items }) => (
  <>
    <div className="flex justify-between mb-2 px-3">
      <div className="text-2xl font-bold text-neutral-800">People</div>
    </div>
    <div className="relative w-full">
      <div
        className="absolute w-full min-h-6 z-10 top-[-1px]"
        style={{
          background:
            "linear-gradient(rgba(255, 255, 255, 1), rgba(0, 0, 0, 0))",
        }}
      />
    </div>
    <div className="h-full overflow-y-scroll">
      {items.map((item) => (
        <UserBox key={item.id} data={item} />
      ))}
    </div>
  </>
);

export default UserList;
