import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs/server";

import { ENTITY_TYPE } from "@prisma/client";

import { db } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { cardId: string } }
) {
  try {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const auditLog = await db.auditLog.findMany({
      where: { orgId, entityId: params.cardId, entityType: ENTITY_TYPE.CARD },
      orderBy: { createdAt: "desc" },
      take: 3,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
