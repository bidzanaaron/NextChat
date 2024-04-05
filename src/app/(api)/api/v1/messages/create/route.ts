import { createMessage, decrypt } from "@/lib";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";
export async function POST(request: Request) {
  const res = await request.json();

  const headersList = headers();

  const { message } = res;
  const token = headersList.get("Authorization");

  if (!token)
    return Response.json(
      { status: false, error: "No token was provided." },
      { status: 403 }
    );

  let jwtPayload = null;
  try {
    jwtPayload = await decrypt(token);
  } catch (e) {
    return Response.json(
      { status: false, error: "Invalid token." },
      { status: 401 }
    );
  }

  if (!jwtPayload)
    return Response.json(
      { status: false, error: "Payload is empty." },
      { status: 400 }
    );

  if (!message)
    return Response.json(
      { status: false, error: "No message was provided." },
      { status: 400 }
    );

  const result = await createMessage(jwtPayload.user.id, message);
  if (!result)
    return Response.json(
      { status: false, error: "Failed to create message." },
      { status: 500 }
    );

  return Response.json(
    {
      status: true,
    },
    { status: 200 }
  );
}
