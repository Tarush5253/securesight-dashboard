import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { id } = params

  try {
    const updated = await prisma.incident.update({
      where: { id },
      data: { resolved: true },
      include: {
        camera: true,
      },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error("Error resolving incident:", error)
    return NextResponse.json({ error: "Failed to resolve incident" }, { status: 500 })
  }
}
