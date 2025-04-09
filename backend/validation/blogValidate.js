import zod from "zod"

export const blogValidatedScheme = zod.object({
    title : zod.string().trim().max(255,"maximum 255 characters allowed").min(1,"Title is required."),
    shortDescription : zod.string().trim().max(255,"maximum 255 characters allowed").min(1,"Short Description is required."),
    description : zod.string().trim().max(10000,"To Long - maximum 10000 characters allowed").min(1,"Description is required."),
})