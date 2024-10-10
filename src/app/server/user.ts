"use server"

import { users } from "../../db/schema"; 
import { db } from "../../db"

export async function uploadScore(name: string, score: number) {
    await db.insert(users).values({name: name, quizHighscore: score})
}