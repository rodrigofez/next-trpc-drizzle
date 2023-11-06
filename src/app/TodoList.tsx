"use client";

import React, { useState } from "react";
import { trpc } from "./_trpc/client";

type Props = {};

const TodoList = (props: Props) => {
  const todos = trpc.getTodos.useQuery();

  const [content, setContent] = useState("");
  const addTodo = trpc.addTodo.useMutation({
    onSettled() {
      todos.refetch();
    },
  });

  return (
    <div>
      <input
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="text-black"
      />
      <button
        onClick={async () => {
          if (content.length) {
            addTodo.mutate(content);
            setContent("");
          }
        }}
      >
        Add
      </button>
      <div>{JSON.stringify(todos.data)}</div>
    </div>
  );
};

export default TodoList;
