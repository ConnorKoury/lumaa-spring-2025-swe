import { NextResponse } from 'next/server';
import { db } from '@/app/lib/db';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { title, description, isComplete } = await request.json();

    // Update the task with the new data
    const updatedTask = await db.task.update({
      where: { id },
      data: {
        title,
        description,
        isComplete,
      },
    });

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json(
      { message: 'Error updating task' },
      { status: 500 }
    );
  }
}

// Delete the task with the given id
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    // Delete the task with the given id
    const deletedTask = await db.task.delete({
      where: { id },
    });

    return NextResponse.json(deletedTask, { status: 200 });
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json(
      { message: 'Error deleting task' },
      { status: 500 }
    );
  }
}