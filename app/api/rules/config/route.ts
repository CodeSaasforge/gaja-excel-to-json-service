import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { TJWTToken } from "../../../../types/global";

export const ALLOWED_CLIENTS = ["karcher"];

export async function GET(request: NextRequest) {
  const token = request.headers.get("Authorization")?.split(" ")[1];

  if (!token)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const decoded = jwt.verify(
      token,
      process.env.NEXT_PUBLIC_JWT_SECRET!
    ) as TJWTToken;
    if (!ALLOWED_CLIENTS.includes(decoded.client) || !decoded.campaign)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    // console.log(decoded, "deco");
    console.log(
      process.env.NEXT_PUBLIC_JWT_SECRET,
      "process.env.NEXT_PUBLIC_JWT_SECRET"
    );
    return NextResponse.json({ test: true });
    return;
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 403 });
  }
}
