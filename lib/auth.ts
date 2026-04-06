// Demo users — replace with real API calls for production
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  roleType: "admin" | "hr"; // drives which portal the user lands on
  avatar: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

const DEMO_USERS: Array<User & { password: string }> = [
  {
    id: "1",
    name: "Kamal Manohar Rao J",
    email: "admin@orionx.com",
    password: "Admin@123",
    role: "Administrator",
    roleType: "admin",
    avatar: "K",
  },
  {
    id: "2",
    name: "Abinash Mishra",
    email: "abinash@orionx.com",
    password: "Admin@123",
    role: "IT Manager",
    roleType: "admin",
    avatar: "A",
  },
  {
    id: "3",
    name: "Meena K",
    email: "meena@orionx.com",
    password: "Admin@123",
    role: "HR Manager",
    roleType: "hr",
    avatar: "MK",
  },
];

export const AUTH_COOKIE_NAME = "orionx_auth_token";
export const USER_COOKIE_NAME = "orionx_user";

/**
 * Validate credentials against the user list.
 * TODO: Replace with your real API call:
 *   const res = await fetch('/api/auth/login', { method:'POST', body: JSON.stringify(credentials) })
 */
export async function validateCredentials(
  credentials: AuthCredentials
): Promise<User | null> {
  const user = DEMO_USERS.find(
    (u) =>
      u.email.toLowerCase() === credentials.email.toLowerCase() &&
      u.password === credentials.password
  );
  if (!user) return null;
  const { password: _password, ...safeUser } = user;
  return safeUser;
}

/** Returns the home path for a user based on their roleType. */
export function getHomePath(user: User): string {
  return user.roleType === "hr" ? "/hr/dashboard" : "/dashboard";
}

export function generateToken(user: User): string {
  return btoa(
    JSON.stringify({ userId: user.id, email: user.email, roleType: user.roleType, iat: Date.now() })
  );
}

export function decodeToken(
  token: string
): { userId: string; email: string; roleType: string; iat: number } | null {
  try {
    return JSON.parse(atob(token));
  } catch {
    return null;
  }
}
