import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const resolved = searchParams.get("resolved")

  try {
    const incidents = await prisma.incident.findMany({
      where: resolved === "false" ? { resolved: false } : undefined,
      orderBy: {
        tsStart: "desc",
      },
      include: {
        camera: true,
      },
    })

    return NextResponse.json(incidents)
  } catch (error) {
    console.error("Error fetching incidents:", error)
    return NextResponse.json({ error: "Failed to fetch incidents" }, { status: 500 })
  }
}
