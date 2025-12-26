import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all foods
export async function GET() {
  const foods = await prisma.food.findMany();
  return NextResponse.json(foods);
}

// POST new food
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, description, price } = data;

    if (!name || !price) {
      return NextResponse.json({ error: "Name and price required" }, { status: 400 });
    }

    const food = await prisma.food.create({
      data: { name, description, price: parseFloat(price) },
    });

    return NextResponse.json(food, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to create food" }, { status: 500 });
  }
}
