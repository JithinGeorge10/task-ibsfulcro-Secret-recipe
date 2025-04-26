import express from 'express'
import { ingredients } from '../controller/ingredientController.js'
import { leaderBoard,existingleaderBoard } from '../controller/leaderboardController.js'



const app=express.Router()
const router=app

router.get('/ingredients',ingredients)
router.post('/leaderBoard',leaderBoard)
router.get('/existingleaderBoard',existingleaderBoard)


export default router