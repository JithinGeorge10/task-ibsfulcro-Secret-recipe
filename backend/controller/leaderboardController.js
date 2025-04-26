
import LeaderBoard from '../model/leaderBoard.js'; 

export const leaderBoard = async (req,res) => {
    try {
       console.log('leaderboard');
       console.log(req.body);
       const newScore = new LeaderBoard(req.body); 
       const savedScore = await newScore.save();  
   
       res.status(201).json(savedScore); // send back the saved document
       
    } catch (error) {
        console.log(error);
    }
}

export const existingleaderBoard = async (req, res) => {
    try {
      const scores = await LeaderBoard.find().sort({ score: -1 });
  
      res.status(200).json(scores); 
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Failed to fetch leaderboard scores' });
    }
  };


