import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";

export async function GET() {
  try {
    const tasks = await db.task.findMany();
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json({ message: "Error retrieving tasks" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title, description } = await request.json();
    const newTask = await db.task.create({
      data: {
        title,
        description,
        isComplete: false,
      },
    });
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json({ message: "Error creating task" }, { status: 500 });
  }
}
