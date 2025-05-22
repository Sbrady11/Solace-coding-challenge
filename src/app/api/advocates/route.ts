import { ilike, or, and } from "drizzle-orm";
import db from "../../../db";
import { advocates } from "../../../db/schema";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get("q");

  const data = await db
    .select()
    .from(advocates)
    .where(
      and(
        or(
          ilike(advocates.firstName, `%${filter}%`),
          ilike(advocates.lastName, `%${filter}%`),
          ilike(advocates.city, `%${filter}%`),
          ilike(advocates.degree, `%${filter}%`)
        )
      )
    );

  return Response.json({ data });
}
