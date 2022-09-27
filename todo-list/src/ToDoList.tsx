import { useState } from "react";
import { useForm } from "react-hook-form";

interface IForm {
  email: string;
  username?: string;
  password: string;
  passwordcheck?: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  const onValid = (data: IForm) => {
    console.log(data);
  };
  console.log(errors);
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("email", {
            required: "email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver\.com$/,
              message: "Only naver.com emails allowed",
            },
          })}
          placeholder="email"
        />
        <span>{errors?.email?.message}</span>
        <input {...register("username")} placeholder="username" />
        <span>{errors?.username?.message}</span>
        <input
          {...register("password", {
            required: "password is required",
            minLength: { value: 3, message: "password is too short" },
          })}
          placeholder="password"
        />
        <span>{errors?.password?.message}</span>
        <input {...register("passwordcheck")} placeholder="password check" />
        <span>{errors?.passwordcheck?.message}</span>
        <button>submit</button>
      </form>
    </div>
  );
}
export default ToDoList;
