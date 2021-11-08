import * as joi from "joi";
const phoneNumberJoi = joi.extend(require("joi-phone-number"));

export const addAlertSchema = joi.object({
  title: joi.string().min(3).max(600).required(),
  description: joi.string().min(3).max(600).allow(null, ""),
  phone: phoneNumberJoi
    .string()
    .allow(null, "")
    .phoneNumber({ defaultCountry: "UA", format: "international" }),
  viber: phoneNumberJoi
    .string()
    .allow(null, "")
    .phoneNumber({ defaultCountry: "UA", format: "international" }),
  //'+32 494 32 24 56'
  address: joi.string().allow(null, "").min(10).max(100),
  owner: joi.alternatives(
    joi.string().alphanum().required(),
    joi.number().required()
  ),
  file: joi.any().allow(null, ""),
  searchForOwner: joi.boolean().allow(null, ""),
});
