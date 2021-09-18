import * as joi from "joi";
const phoneNumberJoi = joi.extend(require("joi-phone-number"));

export const addAlertSchema = joi.object({
  title: joi.string().alphanum().min(3).max(600).required(),
  description: joi.string().alphanum().min(3).max(600).allow(null, ""),
  phone: phoneNumberJoi
    .string()
    .allow(null, "")
    .phoneNumber({ defaultCountry: "UA", format: "international" }),
  viber: phoneNumberJoi
    .string()
    .allow(null, "")
    .phoneNumber({ defaultCountry: "UA", format: "international" }),
  //'+32 494 32 24 56'
  address: joi.string().allow(null, "").alphanum().min(10).max(100),
  // required for backend validation
  // userId: joi.string().alphanum().required(),
});
