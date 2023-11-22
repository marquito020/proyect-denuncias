import { memo } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../redux/store";

function Header() {
  const user = useSelector((state: RootState) => state.user);

  return (
    <header className="z-10 fixed flex-col md:flex-row gap-4 shadow-sm bg-white text-gray-800 text-sm border-b border-gray-300 w-full xl:w-[calc(100%-256px)] xl:ml-64 flex items-center justify-between p-1.5">
      <form className="order-1 md:order-none">
        {/* <div className="relative">
          <RiSearchLine className="absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            className="bg-[#1E1F25] outline-none py-1 pl-10 pr-4 rounded-full"
            type="text"
            placeholder="Search"
          />
        </div> */}
      </form>
      <nav className="flex items-center gap-2 text-sm">
        <div>
          <div className="flex items-center gap-4 hover:bg-gray-200 py-2 px-4 rounded-lg transition-colors">
            {user.photo != "" ? (
              <img
                src={user.photo}
                alt={user.name}
                className="w-8 h-8 object-cover rounded-full"
              />
            ) : (
              <img
                src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
                alt={user.name}
                className="w-8 h-8 object-cover rounded-full"
              />
            )}
            <span>{user.name}</span>
            {/* <ArrowLeftOnRectangleIcon className="h-5 w-5" /> */}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default memo(Header);
