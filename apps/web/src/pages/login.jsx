import { useLoginMutation } from "@/lib/api/auth";
import { GRAPHQL_ENDPOINT } from "@/lib/graphql";
import { api } from "@/lib/http";
import { useSession } from "@/modules/session/useSession";
import { wait } from "@/utils/common";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { FaRegCircleCheck, FaRegCircleXmark } from "react-icons/fa6";
import { useNavigate } from "react-router";

function Login() {
  const slides = [
    {
      url: "https://img.freepik.com/premium-photo/arafed-guitar-black-white-photo-with-black-background-generative-ai_958108-28385.jpg?w=360",
    },
    {
      url: "https://c8.alamy.com/zooms/9/6c2dc9b903934eaf952cbc97fcef9a5a/kpf8aa.jpg",
    },
    {
      url: "https://thumbs.dreamstime.com/b/electric-guitar-smoke-black-electric-guitar-isolated-black-background-surrounded-smoke-to-illustrate-hot-smoking-327232204.jpg",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZqu78VB-QMPKcQHVGRuq7Xx2OpFH-S5LM9g&s",
    },
    {
      url: "https://psd.fanextra.com/wp-content/uploads/2008/10/guitar2.jpg",
    },
  ];

  const [currentIndex, setcurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setcurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setcurrentIndex(newIndex);
  };

  const { register, handleSubmit } = useForm();
  const { login } = useSession();
  const navigate = useNavigate();

  const [alert, setAlert] = useState({
    show: false,
  });

  const onSubmit = async (data) => {
    try {
      const { success } = await login(data);

      if (success) {
        setAlert({
          show: true,
          type: "success",
          message: "Logged in successfully! Redirecting you...",
        });
        await wait(2000);
        navigate("/");
      } else {
        setAlert({
          show: true,
          type: "error",
          message: "Invalid username/password entered.",
        });
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <>
      <div className=" flex flex-col  items-center justify-center h-screen  bg-gray-900">
        <div className="  bg-white rounded-xl min-w-[75%] min-h-[70%] flex flex-row px-8 py-8">
          <div className="flex-1 flex flex-col items-start justify-center  ">
            <div className="  p-4 min-h-[80%]  w-full ml-0 ">
              <h1 className="pb-8 text-center text-3xl font-bold">
                Login Page
              </h1>
              {alert.show && (
                <>
                  {alert.type === "success" && (
                    <div
                      role="alert"
                      className="alert alert-success text-white mb-4"
                    >
                      <FaRegCircleCheck />
                      <span>{alert.message}</span>
                    </div>
                  )}

                  {alert.type === "error" && (
                    <div
                      role="alert"
                      className="alert alert-error text-white mb-4"
                    >
                      <FaRegCircleXmark />
                      <span>{alert.message}</span>
                    </div>
                  )}
                </>
              )}
              <form onSubmit={handleSubmit(onSubmit)}>
                <label className="block mb-2">
                  <span className="text-gray-700">Username</span>
                  <input
                    type="text"
                    placeholder="Enter your username"
                    className="mt-1 block w-full border border-gray-300 rounded-3xl p-2 "
                    {...register("username", { required: true })}
                  />
                </label>

                <label>
                  <span>Password</span>
                  <input
                    type="password"
                    placeholder="Password"
                    className="mt-1 block w-full border border-gray-300 rounded-3xl p-2 "
                    {...register("password", { required: true })}
                  />
                </label>
                <div className="w-full flex justify-center">
                  <button className="mt-8 border text-gray-50 bg-black  rounded-2xl min-w-[40%] min-h-10   ">
                    Submit
                  </button>
                </div>
                <div className="mt-4 flex flex-col justify-center items-center">
                  <span className="mb-4">Forget Password</span>
                  <span>Sign Up</span>
                </div>
              </form>
            </div>
          </div>

          <div className="flex-1 items-center justify-center relative">
            <div className="flex flex-row justify-center py-2 h-full ml-4  border-l    ">
              <div
                style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
                className="w-[50%]  rounded-lg bg-cover duration-500 shadow-2xl shadow-slate-400"
              >
                {/* <div className=" absolute top-[50%] -translate-x-0 -translate-y-[50%] left-5 text-2xl rounded-full p-2 bg-black text-white cursor-pointer">
              <ArrowCircleLeftIcon  size={30} onClick={prevSlide}/>
              </div>
              <div className=" absolute top-[50%] -translate-x-0 -translate-y-[50%] right-5 text-2xl rounded-full p-2 bg-black text-white cursor-pointer">
              <ArrowCircleRightIcon size={30} onClick={nextSlide} />
              </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
