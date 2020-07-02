import "reflect-metadata";

import { getConnection } from "typeorm";
import Build from "../../server/entity/Build";

const Search = async (request, response) => {
  const params: SearchParams =
    request.method === "POST" ? JSON.parse(request.body) : request.query;

  const qb = await getConnection()
    .createQueryBuilder()
    .select("build")
    .from(Build, "build");

  const keys = Object.keys(params);
  for (const param of keys) {
    const value = params[param];

    if (param === "ascendancy") {
      qb.where(
        "pob->'PathOfBuilding'->'Build'->>'ascendClassName' = ?",
        value.charAt(0).toUpperCase() + value.slice(1)
      );
    }
  }

  try {
    const builds = await qb.getMany();

    return response.status(200).json({
      numberOfBuilds: builds.length,
      builds,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);

    return response.status(500).end();
  }
};

export default Search;
