"use client";

import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function Home() {
  const tasks = useQuery(api.task.get);
  return (
    <div className="flex flex-col gap-2 p-4">
      {tasks?.map((task) => (
        <div className="border rounded p-2 flex flex-col" key={task._id}>
          <p>{task.text}</p>
          <p>Is completed: {task.isCompleted ? "✅ Yes" : "❌ No"}</p>
        </div>
      ))}
    </div>
  );

}
