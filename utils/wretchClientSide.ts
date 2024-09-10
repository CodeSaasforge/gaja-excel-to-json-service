import wretch from "wretch";
import jwt from "jsonwebtoken";
export const wretchClientSide = <T>() => {
  // const token = jwt.sign(
  //   { client: "karcher", campaign: "campaign" },
  //   process.env.NEXT_PUBLIC_JWT_SECRET!
  // );

  return (
    wretch(`/api`)
      // .headers({
      //   "Content-Type": "multipart/form-data",
      // })
      // .auth(`Bearer ${token}`)
      .errorType("json")
      .resolve((r) => r.json<T>())
  );
};
