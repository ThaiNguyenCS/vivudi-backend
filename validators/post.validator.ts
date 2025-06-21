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

export const updatePostSchema = Joi.object({
  content: Joi.string().optional(),
  visibility: Joi.string().valid("public", "private", "friend").optional(),
  is_shared_post: Joi.boolean().optional(),
  org_post_url: Joi.string().uri().allow(null).optional(),
  longitude: Joi.string().optional(),
  latitude: Joi.string().optional()
});