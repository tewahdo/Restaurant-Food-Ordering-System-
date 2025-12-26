import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const data = await req.json();
    const { name, description, price } = data;

    const updatedFood = await prisma.food.update({
      where: { id: parseInt(id) },
      data: { name, description, price: parseFloat(price) },
    });

    return NextResponse.json(updatedFood);
  } catch (err) {
    return NextResponse.json({ error: "Failed to update food" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    await prisma.food.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ message: "Food deleted" });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete food" }, { status: 500 });
  }
}
