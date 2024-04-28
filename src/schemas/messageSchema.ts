import { z } from "zod";

export const MessageSchema = z.object({
  content: z
    .string()
    .min(2, "content must be of atleast 2 character")
    .max(300, "content must be less than 300 charcater"),
});
