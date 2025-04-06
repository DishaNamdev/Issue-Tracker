import { z } from "zod";

export const createIssueSchema = z.object({
    title: z.string().min(1, 'Title is required').max(255),
    description: z.string().min(1, 'Description is required'),
});

//TODO: Add more validation schemas for other endpoints
export type IssueSchema = {
    id: Number,
    title: string,
    description: string,
    createAt: string, 
    status: string,
    updatedAt:string,
}
