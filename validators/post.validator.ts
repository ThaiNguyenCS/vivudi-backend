import Joi from "joi/lib";

export const createPostSchema = Joi.object({
  // author_id: Joi.string().required(),
  content: Joi.string().required(),
  visibility: Joi.string().valid("public", "private", "friend").default("public"),
  is_shared_post: Joi.boolean().required(),
  org_post_url: Joi.string().uri().optional(),
  longitude: Joi.string().optional(),
  latitude: Joi.string().optional(),
});