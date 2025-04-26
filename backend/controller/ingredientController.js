
import Ingredient from '../model/ingredient.js';


export const ingredients = async (req,res) => {
    try {
        const ingredientData=await Ingredient.find()
        res.send(ingredientData)
    } catch (error) {
        console.log(error);
    }
}





