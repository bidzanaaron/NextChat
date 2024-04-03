"use server";

import { PrismaClient, User } from "@prisma/client";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const prismaClient = new PrismaClient();

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(expires: Date, payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expires)
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function logout() {
  cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;

  return await decrypt(session);
}

export async function findUserByEmail(email: string): Promise<User | null> {
  return await prismaClient.user.findUnique({ where: { email } });
}

export async function findUserBySession(session: any): Promise<User | null> {
  return await prismaClient.user.findUnique({ where: { id: session.user.id } });
}