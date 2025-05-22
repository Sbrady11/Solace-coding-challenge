import { ilike, or, sql } from "drizzle-orm";
import db from "../../../db";
import { advocates } from "../../../db/schema";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get("q");

  // TODO: paginate, sort, and better search... ilikes prolly not the best eh?
  const data = await db
    .select()
    .from(advocates)
    // Annoying because in the docs they dont have an issue here: https://orm.drizzle.team/docs/guides/conditional-filters-in-query
    .where(
      or(
        ilike(advocates.firstName, `%${filter}%`),
        ilike(advocates.lastName, `%${filter}%`),
        ilike(advocates.city, `%${filter}%`),
        ilike(advocates.degree, `%${filter}%`),
        // Get out of jail here casting as strings...
        sql`${advocates.specialties}::text ILIKE ${`%${filter}%`}`,
        sql`${advocates.yearsOfExperience}::text ILIKE '%' || ${filter} || '%'`,
        sql`${advocates.phoneNumber}::text ILIKE '%' || ${filter} || '%'`
      )
    );

  return Response.json({ data });
}
