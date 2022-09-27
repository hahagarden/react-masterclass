import { useState } from "react";
import { useForm } from "react-hook-form";

function ToDoList() {
  const { register, handleSubmit, formState } = useForm();
  const onValid = (data: any) => {
    console.log(data);
  };
  console.log(formState.errors);
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("email", { required: true, minLength: 3 })}
          placeholder="email"
        />
        <input {...register("username")} placeholder="username" />
        <input
          {...register("password", {
            required: "password is required",
            minLength: { value: 3, message: "password is too short" },
          })}
          placeholder="password"
        />
        <input {...register("passwordcheck")} placeholder="password check" />
        <button>submit</button>
      </form>
    </div>
  );
}
export default ToDoList;
