import zod from "zod"

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const blogValidatedScheme = zod.object({
    title : zod.string().trim().max(255,"maximum 255 characters allowed").min(1,"Title is required."),
    slug : zod.string().trim().max(255,"maximum 255 characters allowed").min(1,"Slug is required.").regex(slugRegex,'Slug must be lowercase, alphanumeric'),
    shortDescription : zod.string().trim().max(255,"maximum 255 characters allowed").min(1,"Short Description is required."),
    description : zod.string().trim().max(10000,"To Long - maximum 10000 characters allowed").min(1,"Description is required."),
    published : zod.string()
    .transform((val) => val === "true").default(true),
})