import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { TJWTToken } from "../../../../types/global";

export const ALLOWED_CLIENTS = ["karcher"];

export async function POST(request: NextRequest) {
  // const token = request.headers.get("Authorization")?.split(" ")[1];

  // if (!token)
  //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    // const decoded = jwt.verify(
    //   token,
    //   process.env.NEXT_PUBLIC_JWT_SECRET!
    // ) as TJWTToken;
    // if (!ALLOWED_CLIENTS.includes(decoded.client) || !decoded.campaign)
    //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const formData = await request.formData();
    console.log(formData, "formData");
    const file = formData.get("files");
    const arrayBuffer = await response.arrayBuffer();
    return arrayBuffer;
    console.log(file, "file?");
    return NextResponse.json({ test: true });
  } catch (error) {
    console.log(error, "ERROR!!");
    return NextResponse.json({ message: error.message }, { status: 403 });
  }
}
