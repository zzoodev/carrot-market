import { PrivateChat, Product } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import useMutation from "../../../libs/client/useMutation";
import useUser from "../../../libs/client/useUser";
import Layout from "../../components/layout";
import UserMessage from "../../components/message";

interface ChatForm {
  chat: string;
}
interface CreateChatResponse {
  ok: boolean;
  newChat: PrivateChat;
}

const PrivateChat: NextPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const { register, handleSubmit, reset } = useForm<ChatForm>();
  const [createMessage, { data: newChat, loading: newChatLoading }] =
    useMutation<CreateChatResponse>(
      `/api/products/${router.query.id}/chatRoom`
    );
  const { data, mutate } = useSWR(
    router.query.id ? `/api/products/${router.query.id}/chatRoom` : null
  );
  console.log(data);

  const onValid = (form: ChatForm) => {
    if (newChatLoading) return;
    reset();
    // mutate(
    //   (prev) =>
    //     prev && {
    //       ...prev,
    //       productDetail: {
    //         ...data?.productDetail,
    //         PrivateChats: [
    //           ...data?.productDetail.PrivateChats,
    //           {
    //             privateMessage: form.message,
    //             seller: {
    //               id:
    //                 data?.productDetail.userId === user?.id
    //                   ? user?.id
    //                   : data?.productDetail.userId,
    //               avatar:
    //                 data?.productDetail.userId === user?.id
    //                   ? user?.avatar
    //                   : data?.productDetail.user.avatar,
    //             },
    //             buyer: {
    //               id:
    //                 data?.productDetail.userId === user?.id
    //                   ? user?.id
    //                   : data?.productDetail.userId,
    //               avatar:
    //                 data?.productDetail.userId === user?.id
    //                   ? user?.avatar
    //                   : data?.productDetail.user.avatar,
    //             },
    //           },
    //         ],
    //       },
    //     }
    // );
    createMessage(form);
  };

  return (
    <Layout title="Private Chat" canGoBack>
      <div className="relative h-max w-full">
        <h2 className="text-2xl font-bold text-gray-900 mt-16">
          Talk to each ather
        </h2>
        <div className="py-10 pb-16 h-[80vh] overflow-y-auto  px-4 space-y-4 mt-3 border rounded-md">
          {/* {data?.productDetail?.PrivateChats?.map((chat) => (
            <UserMessage
              key={chat.id}
              message={chat.privateMessage}
              reversed={chat.sellerId === user?.id ? false : true}
              imgId={
                chat.sellerId === user?.id
                  ? chat.seller.avatar
                  : chat.buyer.avatar
              }
            ></UserMessage>
          ))} */}
        </div>
        <div className="w-full max-w-md mx-auto inset-x-0 bottom-3 -mt-10">
          <form onSubmit={handleSubmit(onValid)} className="relative">
            <input
              {...register("chat")}
              type="text"
              className="w-full border rounded-full focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-none px-3 py-1 text-sm shadow-sm"
            />
            <button className="absolute inset-y-0 my-auto right-1 h-6 aspect-square bg-orange-500 rounded-full text-center leading-[22px] text-white font-semibold -rotate-90 cursor-pointer hover:scale-105 hover:bg-orange-600">
              <span>&rarr;</span>
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default PrivateChat;