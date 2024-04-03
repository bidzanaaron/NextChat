"use server";

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { z } from "zod";
import { encrypt } from "./lib";

const prismaClient = new PrismaClient();

const UserSchema = z.object({
  firstName: z.string().min(1, "Your first name cannot be empty."),
  lastName: z.string().min(1, "Your last name cannot be empty."),
  email: z.string().email("Please enter a valid email."),
  username: z
    .string()
    .min(3, "Your username must be at least 3 characters long.")
    .max(30, "Your username cannot be longer than 30 characters.")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Your username can only contain letters, numbers, and underscores."
    ),
  password: z
    .string()
    .min(8, "Your password must be at least 8 characters long.")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Your password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    ),
});

export async function login(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { error: "Please fill out all the fields." };
  }

  const dbUser = await prismaClient.user.findFirst({
    where: {
      OR: [{ email: username }, { username: username }],
    },
  });

  if (!dbUser) {
    return { error: "Deine E-Mail oder dein Passwort ist nicht korrekt." };
  }

  const isPasswordValid = await bcrypt.compare(
    password.toString(),
    dbUser.password
  );

  if (!isPasswordValid) {
    return { error: "Deine E-Mail oder dein Passwort ist nicht korrekt." };
  }

  const user = { id: dbUser.id, email: dbUser.email };

  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24);
  const session = await encrypt(expires, { user });

  cookies().set("session", session, { expires, httpOnly: true });

  return { error: null };
}

export async function registerUser(formData: FormData) {
  let firstName = formData.get("firstname") as string;
  let lastName = formData.get("lastname") as string;
  let email = formData.get("email") as string;
  let username = formData.get("username") as string;
  let password = formData.get("password") as string;
  let repeatPassword = formData.get("repeatPassword") as string;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !username ||
    !password ||
    !repeatPassword
  ) {
    return { success: false, error: "Please fill in all fields." };
  }

  if (password !== repeatPassword) {
    return { success: false, error: "Passwords do not match." };
  }

  const potentialUser = await prismaClient.user.findFirst({
    where: {
      OR: [{ email: email }, { username: username }],
    },
  });

  if (potentialUser) {
    return {
      success: false,
      error: "User with that email/username already exists.",
    };
  }

  const result = await UserSchema.safeParse({
    firstName,
    lastName,
    email,
    username,
    password,
  });

  if (!result.success) {
    return { success: false, error: result.error.errors[0].message };
  }

  const resultData = result.data;
  const hashedPassword = await bcrypt.hash(resultData.password, 12);

  await prismaClient.user.create({
    data: {
      ...resultData,
      password: hashedPassword,
    },
  });

  return { success: true, error: null };
}
