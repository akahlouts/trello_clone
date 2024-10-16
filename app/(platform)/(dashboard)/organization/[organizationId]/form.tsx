"use client";

import { createBoard } from "@/actions/create-board";
import { useAction } from "@/hooks/use-action";

import { Button } from "@/components/ui/button";

export const Form = () => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log(data, "SUCCESS!");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;

    execute({ title });
  };

  return (
    <form action={onSubmit}>
      <div className="flex flex-col space-y-2">
        <input
          id="title"
          name="title"
          required
          placeholder="Enter a board title"
          className="border-black border p-1"
        />
        {state?.errors?.title ? (
          <div className="">
            {fieldErrors?.title?.map((error: string) => (
              <p key={error} className="text-rose-500">
                {error}
              </p>
            ))}
          </div>
        ) : null}
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};
