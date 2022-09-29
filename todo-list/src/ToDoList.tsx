import { useState } from "react";
import { useForm } from "react-hook-form";

interface IForm {
  email: string;
  username?: string;
  password: string;
  passwordcheck?: string;
  extraError?: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  const onValid = (data: IForm) => {
    if (data.password !== data.passwordcheck)
      setError(
        "passwordcheck",
        { message: "Password are not the same" },
        { shouldFocus: true }
      );
    //setError("extraError", { message: "Server offline" });
  };
  console.log(errors);
  return (
    <div>
      <span>{errors?.extraError?.message}</span>
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
            validate: (myinput) =>
              myinput.includes("nico") ? "no nico in email" : true,
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
