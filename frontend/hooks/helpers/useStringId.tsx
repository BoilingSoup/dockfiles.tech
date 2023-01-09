import { useRouter } from "next/router";

/** Get the string_id route param with useRouter*/
export const useStringId = () => {
  const router = useRouter();
  const stringId = router.query.string_id as string;

  return stringId;
};
