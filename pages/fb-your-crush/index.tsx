import axios, { AxiosResponse } from "axios";
import React, {
  ReactElement,
  useEffect,
  useState,
  useRef,
  Fragment,
  useCallback,
} from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import MultipleSelect from "../../domain/core/MultipleSelect";
import useFbAPI, { FriendInfo } from "../../hooks/useFbAPI";
import useMultipleSelect from "../../hooks/useMultipleSelect";

type FormValues = {
  cookie: string | undefined;
};

interface Post {
  id: string;
  message: string;
  liked?: boolean;
}

interface UserPost {
  id: string;
  name: string;

  posts: {
    data: Array<Post>;
  };
}

function FacebookCrush(): ReactElement {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  // For logging
  const logElmRef = useRef<HTMLTextAreaElement>(null);

  const {
    items: friends,
    setItems: setFriends,
    selected: getSelected,
    selectedIndexes: selected,
    select,
    deselect,
  } = useMultipleSelect<FriendInfo>();

  const {
    like,
    cookie,
    setCookie,
    token,
    fb_dtsg,
    fetchFriendList,
    fetchPosts,
  } = useFbAPI({
    onFail: () => {
      logging("Đăng nhập thất bại");
    },
  });

  const [selectMenu, setSelectMenu] = useState(0);

  //post state
  const [userPosts, setUserPosts] = useState<Array<UserPost>>([]);

  const onSubmit: SubmitHandler<FormValues> = useCallback(
    async (data) => {
      // Logout
      if (cookie) {
        reset();
        setCookie(null);
        logging("Đăng xuất thành công!");

        return;
      }

      // Login
      setCookie(data.cookie);
      logging("Đăng nhập thành công!");
    },
    [cookie]
  );

  // For logging textarea
  const logging = (text: string) => {
    logElmRef.current.value += `[${new Date().toUTCString()}] ${text}\n`;
    logElmRef.current.scrollTop = logElmRef.current.scrollHeight;
  };

  // Util tab components
  const BasicInfo = () => (
    <div>
      {fb_dtsg && (
        <div className="text-sm my-2">
          <b>FB Anti CSRF (fb_dtsg)</b>:
          <input type="text" className="w-full" defaultValue={fb_dtsg} />
        </div>
      )}
      {token && (
        <div className="text-sm my-2">
          <b>FB Access Token</b>:
          <input type="text" className="w-full" defaultValue={token} />
        </div>
      )}
    </div>
  );

  const FriendFilter = () => (
    <>
      {!token && <p>Đang load token...</p>}

      <div className="p-2 bg-teal-400 rounded-md shadow-md text-white my-2 text-sm">
        <b>Tip:</b> Bấm cách để thêm
      </div>
      <button
        className="block p-1 bg-blue-500 text-white shadow-md"
        onClick={async () => {
          try {
            const data = await fetchFriendList();

            setFriends(data);
          } catch (error) {
            alert(error);
          }
        }}
      >
        Lấy danh sách bạn bè
      </button>
      <MultipleSelect
        items={friends}
        selectIndexes={selected}
        onItemClick={(index) => {
          console.log("select", index);
          select(index);
        }}
        onItemRemove={(index) => {
          console.log("deselect", index);
          deselect(index);
        }}
      />

      <div className="flex items-center gap-2 mb-2">
        <label htmlFor="">Số bài viết</label>
        <input type="number" placeholder="Số post" defaultValue={20} />
      </div>

      <button
        className="block p-1 px-4 my-2 bg-green-500 text-white shadow-md"
        onClick={async () => {
          try {
            const ids = selected.map((index) => friends[index].id);

            const data = await fetchPosts(ids);

            // convert data from object to array
            const newData: Array<UserPost> = Object.values(data).flatMap(
              (user: UserPost) => user
            );

            setUserPosts(newData);

            console.log(newData);
          } catch (error) {
            alert(error);
          }
        }}
      >
        Quét bài viết
      </button>

      <h2>Danh sách bài viết</h2>

      {userPosts.map((userPost) => (
        <div className="p-2" key={userPost.id}>
          <h3>{userPost.name}</h3>
          <table className="table-fixed">
            <thead>
              <tr className="border border-green-500 p-2">
                <th>ID</th>
                <th>Nội dung</th>
                <th>Đã like</th>
              </tr>
            </thead>
            <tbody>
              {userPost.posts.data.map((post) => (
                <tr key={post.id}>
                  <td className="border border-green-500 p-2">{post.id}</td>
                  <td className="border border-green-500 p-2">
                    {post.message}
                  </td>
                  <td className="border border-green-500 p-2">
                    {post.liked ? "Đã like" : "Chưa like"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      <button
        className="block p-1 px-4 my-2 bg-green-500 text-white shadow-md"
        onClick={async () => {
          try {
            for (let i of userPosts) {
              for (let post of i.posts.data) {
                if (!post.liked) {
                  await like([post.id]);
                  logging(`Đã like bài viết ${post.id}`);
                }
              }
            }
          } catch (error) {
            alert(error);
          }
        }}
      >
        Like tất cả
      </button>

      {/* await fetchPosts(["100000313082004", "100000370916271"]) like([
      "100000370916271_4958569170832064", "100000370916271_4881316545223994",
      ]); */}
    </>
  );

  const AutoLike = () => (
    <>
      <h2>Chọn target</h2>

      <FriendFilter />
    </>
  );

  // Button handler
  const deleteLogHandler = () => {
    logElmRef.current.value = "";

    logging("Đã xoá log");
  };

  const menu = [
    {
      name: "Thông tin cơ bản",
      render: () => <BasicInfo />,
    },
    {
      name: "Lọc bạn bè",
      render: () => <FriendFilter />,
    },
    {
      name: "Tự động like target",
      render: () => <AutoLike />,
    },
  ];

  return (
    <div className="bg-white rounded-md shadow-xl p-2">
      <h2 className="mb-2">Facebook Toolkit</h2>

      {/* form */}
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <label htmlFor="cookieInput">Nhập cookie</label>
        <textarea
          rows={6}
          id="cookieInput"
          placeholder="Nhập cookie"
          {...register("cookie", { required: true })}
        />

        <label htmlFor=""></label>
        {/* errors will return when field validation fails  */}
        {errors.cookie && (
          <div className="bg-red-400 hover:bg-red-500 p-2">Trường bắt buộc</div>
        )}

        <button
          type="submit"
          className={`${
            cookie ? "bg-red-400 hover:bg-red-500" : "pointer-events-auto"
          }`}
        >
          {cookie ? "Đăng xuất" : "Đăng nhập"}
        </button>
      </form>

      <div className="grid grid-cols-4 my-2 gap-2">
        <ul className="shadow-xl border-2 border-lime-300 bg-white rounded-md divide-y divide-lime-400">
          {menu.map((item, index: number) => (
            <li
              key={index}
              className="p-2 hover:bg-lime-200 cursor-pointer"
              onClick={async () => setSelectMenu(index)}
            >
              {item.name}
            </li>
          ))}
        </ul>
        <div className="col-span-3 shadow-xl border-2 border-lime-300 bg-white rounded-md p-2">
          {menu[selectMenu].render()}
        </div>
      </div>

      <button
        className="block p-1 bg-lime-500 text-white shadow-md"
        onClick={() => fetchPosts(["100000313082004"])}
      >
        Lấy danh sách bài viết
      </button>

      {/* Log */}
      <div className="relative">
        <textarea
          className="ring-1 p-2 ring-lime-600 w-full my-2 h-40"
          ref={logElmRef}
          disabled
        ></textarea>
        <button
          className="bg-red-500 text-white hover:bg-red-700 absolute -top-1 -right-1"
          onClick={() => deleteLogHandler()}
        >
          Xoá log
        </button>
      </div>
    </div>
  );
}

export default FacebookCrush;
